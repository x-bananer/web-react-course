import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<ul>
				<li>
					<Link to="/">
						Home
					</Link>

				</li>
				<li>
					<Link to="/about">
						About
					</Link>
				</li>
				<li>
					<Link to="/login">
						Login
					</Link>
				</li>
			</ul>
			<Routes>
				<Route path="/" element={<App />} />
			</Routes>
			<Routes>
				<Route path="/about" element={'About'} />
			</Routes>
			<Routes>
				<Route path="/login" element={'Login'} />
			</Routes>

		</BrowserRouter>
	</StrictMode>
)
