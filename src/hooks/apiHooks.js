import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
	const [mediaArray, setMediaArray] = useState([]);

	useEffect(() => {
		const getMedia = async () => {
			try {
				const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
				setMediaArray(json);
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
			fetchOptions
		);
		return mediaResult;
	};

	const deleteMedia = async (mediaId, token) => {
		const fetchOptions = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		return fetchData(import.meta.env.VITE_MEDIA_API + '/media/' + mediaId, fetchOptions);
	};

	const modifyMedia = async (mediaId, mediaItem, token) => {
		const fetchOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(mediaItem),
		};

		return fetchData(import.meta.env.VITE_MEDIA_API + '/media/' + mediaId, fetchOptions);
	};

	return {mediaArray, postMedia, deleteMedia, modifyMedia};
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
			fetchOptions
		);
		return loginResult;
	};

	return {postLogin};
};

const useUser = () => {
	const [user, setUser] = useState(null);

	const getUserByToken = async (token) => {
		const fetchOptions = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const userData = await fetchData(
			import.meta.env.VITE_AUTH_API + '/users/token',
			fetchOptions
		);
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

	return {user, getUserByToken, postUser};
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
			fetchOptions
		);
		return fileResult;
	};

	return {postFile};
};

const useLike = () => {
	const getLikeCountByMediaId = async (mediaId) => {
		return fetchData(import.meta.env.VITE_MEDIA_API + '/likes/count/' + mediaId);
	};

	const getLikeByUser = async (mediaId, token) => {
		const fetchOptions = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		return fetchData(
			import.meta.env.VITE_MEDIA_API + '/likes/bymedia/user/' + mediaId,
			fetchOptions
		);
	};

	const postLike = async (mediaId, token) => {
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({media_id: mediaId}),
		};

		return fetchData(import.meta.env.VITE_MEDIA_API + '/likes', fetchOptions);
	};

	const deleteLike = async (likeId, token) => {
		const fetchOptions = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		return fetchData(import.meta.env.VITE_MEDIA_API + '/likes/' + likeId, fetchOptions);
	};

	return {getLikeCountByMediaId, getLikeByUser, postLike, deleteLike};
};

export {useMedia, useAuthentication, useUser, useFile, useLike};
