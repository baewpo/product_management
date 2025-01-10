import UserResponse from "models/user/userResponse"
import { createContext, Component, ReactNode } from "react"

interface AuthContextType {
	isLoggedIn: boolean
	login: (token: UserResponse) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
})

interface IProps {
	children: ReactNode
}

interface IStates {
	isLoggedIn: boolean
}

export class AuthProvider extends Component<IProps, IStates> {
	state = {
		isLoggedIn: !!localStorage.getItem("token"),
	}

	private login = (token: UserResponse) => {
		localStorage.setItem("token", JSON.stringify(token))
		this.setState({ isLoggedIn: true })
	}

	private logout = () => {
		localStorage.removeItem("token")
		this.setState({ isLoggedIn: false })
	}

	render() {
		return (
			<AuthContext.Provider value={{ ...this.state, login: this.login, logout: this.logout }}>
				{this.props.children}
			</AuthContext.Provider>
		)
	}
}

export { AuthContext }
