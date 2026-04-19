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

	const postMedia = async (file, inputs, token) => {
		const mediaObject = {
			filename: file.data.filename,
			filesize: file.data.filesize,
			media_type: file.data.media_type,
			title: inputs.title,
			description: inputs.description,
		};
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(mediaObject),
		};
		const mediaResult = await fetchData(
			import.meta.env.VITE_MEDIA_API + '/media',
			fetchOptions,
		);
		return mediaResult;
	};

	return { mediaArray, postMedia };
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

const useFile = () => {
	const postFile = async (file, token) => {
		const formData = new FormData();
		formData.append('file', file);

		const fetchOptions = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		};

		const fileResult = await fetchData(
			import.meta.env.VITE_UPLOAD_SERVER + '/upload',
			fetchOptions,
		);
		return fileResult;
	};

	return { postFile };
};

export { useMedia, useAuthentication, useUser, useFile };
