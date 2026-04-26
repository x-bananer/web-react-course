import MediaRow from '../components/MediaRow';
import { useMedia } from '../hooks/apiHooks';

const Home = () => {
	const { mediaArray } = useMedia();

	return (
		<>
			<h2 className="my-6 text-3xl">My Media</h2>
			<table className="w-full table-fixed border-collapse">
				<thead>
					<tr>
						<th className="border border-[#ccc] p-4 text-center">Thumbnail</th>
						<th className="border border-[#ccc] p-4 text-center">Title</th>
						<th className="border border-[#ccc] p-4 text-center">Description</th>
						<th className="border border-[#ccc] p-4 text-center">Created</th>
						<th className="border border-[#ccc] p-4 text-center">Size</th>
						<th className="border border-[#ccc] p-4 text-center">Type</th>
						<th className="border border-[#ccc] p-4 text-center">Owner</th>
						<th className="border border-[#ccc] p-4 text-center">Actions</th>
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
