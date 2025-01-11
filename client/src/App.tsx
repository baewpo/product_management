import "@fortawesome/fontawesome-free/css/all.min.css"
import React, { ReactElement } from "react"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { AuthProvider } from "./contexts/authContext"
import Router from "./Router"

function App(): ReactElement {
	return (
		<AuthProvider>
			<React.StrictMode>
				<BrowserRouter>
					<Router />
					<ToastContainer />
				</BrowserRouter>
			</React.StrictMode>
		</AuthProvider>
	)
}

export default App
