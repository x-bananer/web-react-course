import PropTypes from 'prop-types';

const SingleView = (props) => {
	const {item, setSelectedItem} = props;
	const isVideo = item.media_type.startsWith('video');

	return (
		<dialog className="single-view" open={Boolean(item)}>
			<div className="single-view__content">
				<button
					className="single-view__close"
					type="button"
					onClick={() => setSelectedItem(null)}
				>
					Close
				</button>
				<h3>{item.title}</h3>
				<p>{item.description || 'No description'}</p>
				{isVideo ? (
					<video controls src={item.filename}>
						<track kind="captions" />
					</video>
				) : (
					<img src={item.filename} alt={item.title} />
				)}
				<p>Created: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
				<p>Type: {item.media_type}</p>
				<p>Size: {item.filesize}</p>
			</div>
		</dialog>
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
		description: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired,
	}).isRequired,
	setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;
