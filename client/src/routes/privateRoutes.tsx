import React, { Component } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "contexts/authContext"

interface IProps {
	component: React.ReactElement
}

class PrivateRoute extends Component<IProps> {
	static contextType = AuthContext

	render() {
		const { isLoggedIn} = this.context

		if (isLoggedIn && window.location.pathname === "/login") {
			return <Navigate to="/" replace />
		}

		if (!isLoggedIn && window.location.pathname !== "/login") {
			return <Navigate to="/login" replace />
		}

		return <this.props.component {...this.props} />
	}
}

export default PrivateRoute
