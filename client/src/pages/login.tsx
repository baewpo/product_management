import React, { Component } from "react"
import { showToast } from "../components/general/toast"
import UserRequest from "../models/user/userRequest"
import axios from "axios"
import { AuthContext } from "contexts/authContext"

interface IStates {
	user: UserRequest
	errorMessage: string
}

class Login extends Component<{}, IStates> {
	static contextType = AuthContext

	constructor(props) {
		super(props)
		this.state = {
			user: new UserRequest(),
			errorMessage: "",
		}
	}

	private login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await axios.post("/api/login", {
				username: this.state.user.username,
				password: this.state.user.password,
			})
			if (response.data) {
				this.context.login(response.data)
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
			<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
				<div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-lg">
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<div class="font-medium text-2xl uppercase text-gray-800 text-center mb-10">
							Login To Your Account
						</div>
						<form className="space-y-6" onSubmit={this.login}>
							<div class="relative z-0">
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
							<div class="relative z-0">
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
								<div class="flex items-center mb-10 mt-6">
									<div class="flex ml-auto">
										<a
											href="#"
											class="inline-flex text-sm text-blue-500 hover:text-blue-700">
											Forgot Your Password?
										</a>
									</div>
								</div>
							</div>
							<div>
								<button
									type="submit"
									className="flex w-full my-20 justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
