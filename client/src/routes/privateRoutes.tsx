import React, { Component } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext, AuthContextType } from "contexts/authContext"

interface IProps {
	component: React.ElementType
}

class PrivateRoute extends Component<IProps> {
	static contextType = AuthContext

	render() {
		const { isLoggedIn} = this.context as AuthContextType
		const { component: Component, ...restProps } = this.props

		if (isLoggedIn && window.location.pathname === "/login") {
			return <Navigate to="/" replace />
		}

		if (!isLoggedIn && window.location.pathname !== "/login") {
			return <Navigate to="/login" replace />
		}

		return <Component {...restProps} />
	}
}

export default PrivateRoute
