import { useEffect, useState } from 'react';
import MediaRow from '../components/MediaRow';
import { fetchData } from '../utils/fetchData';

const Home = () => {
	const [mediaArray, setMediaArray] = useState([]);

	useEffect(() => {
		const getMedia = async () => {
			try {
				const json = await fetchData(`${import.meta.env.BASE_URL}test.json`);
				setMediaArray(json);
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
