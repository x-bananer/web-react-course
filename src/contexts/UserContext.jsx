import { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuthentication, useUser } from '../hooks/apiHooks';

const UserContext = createContext(null);

const UserProvider = (props) => {
	const { children } = props;
	const [user, setUser] = useState(null);
	const { postLogin } = useAuthentication();
	const { getUserByToken } = useUser();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogin = async (credentials) => {
		try {
			const loginResult = await postLogin(credentials);
			localStorage.setItem('token', loginResult.token);
			const userResult = await getUserByToken(loginResult.token);
			setUser(userResult.user ?? userResult);
			navigate('/');
		} catch (e) {
			console.log(e.message);
			throw e;
		}
	};

	const handleLogout = () => {
		try {
			localStorage.removeItem('token');
			setUser(null);
			navigate('/');
		} catch (e) {
			console.log(e.message);
		}
	};

	const handleAutoLogin = async () => {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const userResult = await getUserByToken(token);
				setUser(userResult.user ?? userResult);
				navigate(location.pathname);
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<UserContext.Provider
			value={{ user, setUser, handleLogin, handleLogout, handleAutoLogin }}
		>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
