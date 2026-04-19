import { useUserContext } from '../hooks/contextHooks';

const Profile = () => {
	const { user } = useUserContext();

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
