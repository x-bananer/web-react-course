import { useEffect } from 'react';
import { Link, Outlet } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';

export const Layout = () => {
	const { user, handleAutoLogin } = useUserContext();

	useEffect(() => {
		handleAutoLogin();
	}, []);

	return (
		<div>
			<nav>
				<ul className="m-0 flex justify-end overflow-hidden bg-[#333333] p-0 *:list-none">
					<li>
						<Link className="block p-4 text-center text-white no-underline hover:bg-[#111111]" to="/">
							Home
						</Link>
					</li>
					{user ? (
						<>
							<li>
								<Link className="block p-4 text-center text-white no-underline hover:bg-[#111111]" to="/profile">
									Profile
								</Link>
							</li>
							<li>
								<Link className="block p-4 text-center text-white no-underline hover:bg-[#111111]" to="/upload">
									Upload
								</Link>
							</li>
							<li>
								<Link className="block p-4 text-center text-white no-underline hover:bg-[#111111]" to="/logout">
									Logout
								</Link>
							</li>
						</>
					) : (
						<li>
							<Link className="block p-4 text-center text-white no-underline hover:bg-[#111111]" to="/login">
								Login
							</Link>
						</li>
					)}
				</ul>
			</nav>
			<main>
				<Outlet />
			</main>
		</div>
	);
};
