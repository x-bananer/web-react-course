import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFile, useMedia } from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const Upload = () => {
	const [file, setFile] = useState(null);
	const navigate = useNavigate();
	const { postFile } = useFile();
	const { postMedia } = useMedia();

	const initValues = {
		title: '',
		description: '',
	};

	const handleFileChange = (evt) => {
		if (evt.target.files) {
			console.log(evt.target.files[0]);
			setFile(evt.target.files[0]);
		}
	};

	const doUpload = async (formInputs) => {
		try {
			const token = localStorage.getItem('token');
			const fileResult = await postFile(file, token);
			await postMedia(fileResult, formInputs, token);
			navigate('/');
		} catch (e) {
			console.log(e.message);
		}
	};

	const { inputs, handleInputChange, handleSubmit } = useForm(doUpload, initValues);

	return (
		<>
			<h1 className="my-6 text-3xl">Upload</h1>
			<form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
				<div className="flex w-4/5 flex-col">
					<label htmlFor="title">
						Title
					</label>
					<input
						className="my-2.5 rounded-[5px] border border-[#ccc] p-[10px]"
						name="title"
						type="text"
						id="title"
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex w-4/5 flex-col">
					<label htmlFor="description">
						Description
					</label>
					<textarea
						className="my-2.5 rounded-[5px] border border-[#ccc] p-[10px]"
						name="description"
						rows={5}
						id="description"
						onChange={handleInputChange}
					></textarea>
				</div>
				<div className="flex w-4/5 flex-col">
					<label htmlFor="file">
						File
					</label>
					<input
						className="my-2.5 rounded-[5px] border border-[#ccc] p-[10px]"
						name="file"
						type="file"
						id="file"
						accept="image/*, video/*"
						onChange={handleFileChange}
					/>
				</div>
				<img
					className="my-[10px] h-[200px] w-[200px] rounded-[5px] object-cover"
					src={
						file
							? URL.createObjectURL(file)
							: 'https://placehold.co/200?text=Choose+image'
					}
					alt="preview"
					width="200"
				/>
				<button
					className="my-2.5 rounded-[5px] border-none bg-[#363636] p-[10px] text-white"
					type="submit"
					disabled={file && inputs.title.length > 3 ? false : true}
				>
					Upload
				</button>
			</form>
		</>
	);
};

export default Upload;
