import PropTypes from 'prop-types';

const MediaRow = (props) => {
	const { item, selectedItem, setSelectedItem } = props;
	const isSelected = selectedItem?.media_id === item.media_id;

	return (
		<tr className={isSelected ? 'media-row media-row--selected' : 'media-row'}>
			<td>
				<img className="media-thumb" src={item.thumbnail} alt={item.title} />
			</td>
			<td>{item.title}</td>
			<td>{item.description || 'No description'}</td>
			<td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
			<td>{item.filesize}</td>
			<td>{item.media_type}</td>
			<td>
				<button type="button" onClick={() => setSelectedItem(item)}>
					View
				</button>
			</td>
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
	selectedItem: PropTypes.shape({
		media_id: PropTypes.number.isRequired,
	}),
	setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
