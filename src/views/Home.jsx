import { useEffect, useState } from 'react';
import MediaRow from '../components/MediaRow';
import { fetchData } from '../utils/fetchData';

const Home = () => {
	const [mediaArray, setMediaArray] = useState([]);

	useEffect(() => {
		const getMedia = async () => {
			try {
				const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
				const mediaWithUser = await Promise.all(
					json.map(async (item) => {
						const result = await fetchData(
							import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
						);

						return { ...item, username: result.username };
					}),
				);
				setMediaArray(mediaWithUser);
			} catch (error) {
				console.error(error);
			}
		};

		getMedia();
	}, []);

	console.log(mediaArray);

	return (
		<>
			<h2>My Media</h2>
			<table className="media-table">
				<thead>
					<tr>
						<th>Thumbnail</th>
						<th>Title</th>
						<th>Description</th>
						<th>Created</th>
						<th>Size</th>
						<th>Type</th>
						<th>Owner</th>
						<th>View</th>
					</tr>
				</thead>
				<tbody>
					{mediaArray.map((item) => (
						<MediaRow key={item.media_id} item={item} />
					))}
				</tbody>
			</table>
		</>
	);
};

export default Home;
