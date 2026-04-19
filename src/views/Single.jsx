import { useLocation, useNavigate } from 'react-router';

const Single = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const item = state.item;

	const isVideo = item.media_type.startsWith('video');

	return (
		<section className="single-page">
			<button className="single-page__back" type="button" onClick={() => navigate(-1)}>
				Go back
			</button>
			<h2>{item.title}</h2>
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
		</section>
	);
};

export default Single;
