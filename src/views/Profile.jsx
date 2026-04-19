import { useEffect } from 'react';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
	const { user, getUserByToken } = useUser();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (!token) {
			return;
		}

		const loadUser = async () => {
			try {
				await getUserByToken(token);
			} catch (error) {
				console.error(error);
			}
		};

		loadUser();
	}, []);

	if (!user) {
		return <div>Profile</div>;
	}

	return (
		<section>
			<h1>Profile</h1>
			<p>Username: {user.username}</p>
			<p>Email: {user.email}</p>
			<p>User ID: {user.user_id}</p>
		</section>
	);
};

export default Profile;
