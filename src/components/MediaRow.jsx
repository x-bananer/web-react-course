import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { useUserContext } from '../hooks/contextHooks';

const actionClass = 'cursor-pointer border-none bg-[#363636] p-2 text-white no-underline';

const MediaRow = (props) => {
	const { item } = props;
	const { user } = useUserContext();
	const isOwner = user?.user_id === item.user_id;
	const levelName = typeof user?.level_name === 'string' ? user.level_name.toLowerCase() : '';
	const role = typeof user?.role === 'string' ? user.role.toLowerCase() : '';
	const isAdmin = levelName === 'admin' || role === 'admin' || Boolean(user?.is_admin);
	const showOwnerActions = Boolean(user) && (isOwner || isAdmin);

	return (
		<tr>
			<td className="border border-[#ccc] p-4 text-center">
				<img
					className="h-[200px] w-[260px] object-cover"
					src={item.thumbnail}
					alt={item.title}
				/>
			</td>
			<td className="border border-[#ccc] p-4 text-center break-words">{item.title}</td>
			<td className="border border-[#ccc] p-4 text-center break-words">{item.description || 'No description'}</td>
			<td className="border border-[#ccc] p-4 text-center">{new Date(item.created_at).toLocaleString('fi-FI')}</td>
			<td className="border border-[#ccc] p-4 text-center">{item.filesize}</td>
			<td className="border border-[#ccc] p-4 text-center break-words">{item.media_type}</td>
			<td className="border border-[#ccc] p-4 text-center break-words">{item.username}</td>
			<td className="border border-[#ccc] p-4 text-center">
				<Link className={actionClass} to="/single" state={{ item }}>
					Show
				</Link>{' '}
				{showOwnerActions && (
					<>
						<button
							className={actionClass}
							type="button"
							onClick={() => console.log('modify', item)}
						>
							Modify
						</button>{' '}
						<button
							className={actionClass}
							type="button"
							onClick={() => console.log('delete', item)}
						>
							Delete
						</button>
					</>
				)}
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
		username: PropTypes.string,
		level_name: PropTypes.string,
	}).isRequired,
};

export default MediaRow;
