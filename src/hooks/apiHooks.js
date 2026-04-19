import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';

const useMedia = () => {
	const [mediaArray, setMediaArray] = useState([]);

	useEffect(() => {
		const getMedia = async () => {
			try {
				const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
				const mediaWithUser = await Promise.all(
					json.map(async (item) => {
						const result = await fetchData(
							import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
						);

						return { ...item, username: result.username };
					}),
				);

				setMediaArray(mediaWithUser);
			} catch (error) {
				console.error(error);
			}
		};

		getMedia();
	}, []);

	return { mediaArray };
};

const useAuthentication = () => {
	const postLogin = async (inputs) => {
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(inputs),
		};
		const loginResult = await fetchData(
			import.meta.env.VITE_AUTH_API + '/auth/login',
			fetchOptions,
		);
		return loginResult;
	};

	return { postLogin };
};

const useUser = () => {
	const [user, setUser] = useState(null);

	const getUserByToken = async (token) => {
		const fetchOptions = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const userData = await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', fetchOptions);
		setUser(userData);
		return userData;
	};

	const postUser = async (inputs) => {
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(inputs),
		};
		const userResult = await fetchData(import.meta.env.VITE_AUTH_API + '/users', fetchOptions);
		return userResult;
	};

	return { user, getUserByToken, postUser };
};

export { useMedia, useAuthentication, useUser };
