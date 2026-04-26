import useForm from '../hooks/formHooks';
import { useUser } from '../hooks/apiHooks';

const RegisterForm = () => {
	const initValues = {
		username: '',
		password: '',
		email: '',
	};

	const { postUser } = useUser();

	const doRegister = async (formInputs) => {
		try {
			const registerResult = await postUser(formInputs);
			console.log(registerResult);
		} catch (error) {
			console.error(error);
		}
	};

	const { handleInputChange, handleSubmit } = useForm(doRegister, initValues);

	return (
		<>
			<h1 className="my-6 text-3xl">Register</h1>
			<form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
				<div className="flex w-4/5 flex-col">
					<label htmlFor="registeremail">
						Email
					</label>
					<input
						className="my-2.5 rounded-[5px] border border-[#ccc] p-[10px]"
						name="email"
						type="email"
						id="registeremail"
						onChange={handleInputChange}
						autoComplete="email"
					/>
				</div>
				<div className="flex w-4/5 flex-col">
					<label htmlFor="registeruser">
						Username
					</label>
					<input
						className="my-2.5 rounded-[5px] border border-[#ccc] p-[10px]"
						name="username"
						type="text"
						id="registeruser"
						onChange={handleInputChange}
						autoComplete="username"
					/>
				</div>
				<div className="flex w-4/5 flex-col">
					<label htmlFor="registerpassword">
						Password
					</label>
					<input
						className="my-2.5 rounded-[5px] border border-[#ccc] p-[10px]"
						name="password"
						type="password"
						id="registerpassword"
						onChange={handleInputChange}
						autoComplete="new-password"
					/>
				</div>
				<button
					className="my-2.5 rounded-[5px] border-none bg-[#363636] p-[10px] text-white"
					type="submit"
				>
					Register
				</button>
			</form>
		</>
	);
};

export default RegisterForm;
