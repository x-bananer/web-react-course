import PropTypes from 'prop-types';

const MediaRow = (props) => {
	const {item} = props;

	return (
		<tr>
			<td>
				<img className="media-thumb" src={item.thumbnail} alt={item.title} />
			</td>
			<td>{item.title}</td>
			<td>{item.description || 'No description'}</td>
			<td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
			<td>{item.filesize}</td>
			<td>{item.media_type}</td>
		</tr>
	);
};

MediaRow.propTypes = {
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
};

export default MediaRow;
