import useForm from '../hooks/formHooks';
import { useUserContext } from '../hooks/contextHooks';

const LoginForm = () => {
	const initValues = {
		username: '',
		password: '',
	};

	const { handleLogin } = useUserContext();

	const doLogin = async (formInputs) => {
		try {
			await handleLogin(formInputs);
		} catch (error) {
			alert(error.message);
		}
	};

	const { handleInputChange, handleSubmit } = useForm(doLogin, initValues);

	return (
		<>
			<h1 className="my-6 text-3xl">Login</h1>
			<form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
				<div className="flex w-4/5 flex-col">
					<label htmlFor="loginuser">
						Username
					</label>
					<input
						className="my-2.5 rounded-[5px] border border-[#ccc] p-[10px]"
						name="username"
						type="text"
						id="loginuser"
						onChange={handleInputChange}
						autoComplete="username"
					/>
				</div>
				<div className="flex w-4/5 flex-col">
					<label htmlFor="loginpassword">
						Password
					</label>
					<input
						className="my-2.5 rounded-[5px] border border-[#ccc] p-[10px]"
						name="password"
						type="password"
						id="loginpassword"
						onChange={handleInputChange}
						autoComplete="current-password"
					/>
				</div>
				<button
					className="my-2.5 rounded-[5px] border-none bg-[#363636] p-[10px] text-white"
					type="submit"
				>
					Login
				</button>
			</form>
		</>
	);
};

export default LoginForm;
