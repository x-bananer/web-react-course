import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLike } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/contextHooks';

const Likes = ({ item }) => {
	const { user } = useUserContext();
	const { getLikeCountByMediaId, getLikeByUser, postLike, deleteLike } = useLike();
	const [likeCount, setLikeCount] = useState(0);
	const [userLike, setUserLike] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const loadLikes = async () => {
			try {
				const countResult = await getLikeCountByMediaId(item.media_id);
				setLikeCount(countResult.count ?? 0);

				if (!user) {
					setUserLike(null);
					return;
				}

				const token = localStorage.getItem('token');
				const like = await getLikeByUser(item.media_id, token);
				setUserLike(like ?? null);
			} catch (error) {
				if (error.message !== 'Like not found') {
					console.error(error);
				}
				setUserLike(null);
			}
		};

		loadLikes();
	}, [item.media_id, user]);

	const handleLikeClick = async () => {
		if (!user || isSubmitting) {
			return;
		}

		const token = localStorage.getItem('token');
		if (!token) {
			return;
		}

		setIsSubmitting(true);

		try {
			if (userLike) {
				await deleteLike(userLike.like_id, token);
				setUserLike(null);
				setLikeCount((prev) => Math.max(prev - 1, 0));
			} else {
				await postLike(item.media_id, token);
				const like = await getLikeByUser(item.media_id, token);
				setUserLike(like);
				setLikeCount((prev) => prev + 1);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			{user && (
				<>
					<button
						className="bg-[#363636] p-2 text-white"
						type="button"
						onClick={handleLikeClick}
						disabled={isSubmitting}
					>
						{userLike ? 'Liked' : 'Like'}
					</button>{' '}
				</>
			)}
			<span>
				{likeCount} {likeCount === 1 ? 'like' : 'likes'}
			</span>
		</div>
	);
};

Likes.propTypes = {
	item: PropTypes.shape({
		media_id: PropTypes.number.isRequired,
	}).isRequired,
};

export default Likes;
