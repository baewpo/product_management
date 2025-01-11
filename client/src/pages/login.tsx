import React, { Component } from "react"
import { showToast } from "../components/general/toast"
import UserRequest from "../models/user/userRequest"
import axios from "axios"
import { AuthContext, AuthContextType } from "contexts/authContext"

interface IProps {

}

interface IStates {
	user: UserRequest
	errorMessage: string
}

class Login extends Component<IProps, IStates> {
	static contextType = AuthContext

	constructor(props: IProps) {
		super(props)
		this.state = {
			user: new UserRequest(),
			errorMessage: "",
		}
	}

	private login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { login } = this.context as AuthContextType
		try {
			const response = await axios.post("/api/login", {
				username: this.state.user.username,
				password: this.state.user.password,
			})
			if (response.data) {
				login(response.data)
				showToast("success", "Login Success!")
			}
		} catch (error) {
			console.error(error)
			showToast("error", error.response?.data?.message || "Login failed")
		}
	}

	private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		this.setState((prevState) => ({
			user: {
				...prevState.user,
				[name]: value,
			},
		}))
	}

	public render(): JSX.Element {
		return (
			<div className="h-full flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
				<div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-lg">
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<div className="font-medium text-2xl uppercase text-gray-800 text-center mb-10">
							Login To Your Account
						</div>
						<form className="space-y-6" onSubmit={this.login}>
							<div className="relative z-0">
								<input
									id="username"
									name="username"
									value={this.state.user.username}
									onChange={this.handleInputChange}
									type="text"
									required
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
								/>
								<label className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
									Username
								</label>
							</div>
							<div className="relative z-0">
								<input
									id="password"
									name="password"
									type="password"
									required
									value={this.state.user.password}
									onChange={this.handleInputChange}
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
								/>
								<label className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
									Password
								</label>
								<div className="flex items-center mb-10 mt-6">
									<div className="flex ml-auto">
										<a
											href="#"
											className="inline-flex text-sm text-blue-500 hover:text-blue-700 transition-all ease duration-500">
											Forgot Your Password?
										</a>
									</div>
								</div>
							</div>
							<div>
								<button
									type="submit"
									className="w-full py-2.5 flex items-center justify-center gap-2 rounded-full bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all duration-300 hover:shadow
					hover:bg-slate-700">
									Sign in
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Login
