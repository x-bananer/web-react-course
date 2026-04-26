import PropTypes from 'prop-types';
import Likes from './Likes';

const SingleView = (props) => {
	const { item, onBack } = props;
	const isVideo = item.media_type.startsWith('video');

	return (
		<section className="mt-6 flex flex-col gap-4">
			<button
				className="self-start cursor-pointer rounded-[5px] border-none bg-[#363636] px-4 py-2 text-white"
				type="button"
				onClick={onBack}
			>
				Go back
			</button>
			<div className="flex flex-col gap-4">
				<h2 className="my-4 text-3xl">{item.title}</h2>
				<p>{item.description || 'No description'}</p>
				{isVideo ? (
					<video className="max-h-[70vh] w-full object-contain" controls src={item.filename}>
						<track kind="captions" />
					</video>
				) : (
					<img className="max-h-[70vh] w-full object-contain" src={item.filename} alt={item.title} />
				)}
				<Likes item={item} />
				<p>Created: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
				<p>Owner: {item.username}</p>
				<p>Type: {item.media_type}</p>
				<p>Size: {item.filesize}</p>
			</div>
		</section>
	);
};

SingleView.propTypes = {
	item: PropTypes.shape({
		media_id: PropTypes.number.isRequired,
		user_id: PropTypes.number.isRequired,
		filename: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		filesize: PropTypes.number.isRequired,
		media_type: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		created_at: PropTypes.string.isRequired,
		username: PropTypes.string,
	}).isRequired,
	onBack: PropTypes.func.isRequired,
};

export default SingleView;
