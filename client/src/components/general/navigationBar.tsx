import { Component } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../contexts/authContext"

interface IStates {
	isMenuOpen: boolean
}
class Navbar extends Component<IProps, IStates> {
	static contextType = AuthContext

	constructor(props: IProps) {
		super(props)
		this.state = {
			isMenuOpen: false,
		}
	}

	private toggleMenu = () => {
		this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }))
	}

	private handleResize = () => {
		if (window.innerWidth >= 768) {
			this.setState({ isMenuOpen: false })
		}
	}

	componentDidMount() {
		window.addEventListener("resize", this.handleResize)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize)
	}

	public render() {
		const { isLoggedIn, logout } = this.context
		return (
			<div className="h-[65px] w-full flex items-center px-[20px] z-50 bg-white drop-shadow-md relative">
				<label className="font-bold text-xl text-[#333] flex items-center hover:text-white transition hover:delay-75 ">
					Internship
				</label>
				<button onClick={this.toggleMenu} className="md:hidden text-black ml-auto p-2">
					<i className="fas fa-bars" aria-hidden="true"></i>
				</button>
				<div
					className={`text-white ml-auto flex gap-2 ${
						this.state.isMenuOpen
							? "flex-col absolute bg-white top-[65px] left-0 w-full py-4 px-5"
							: "hidden md:flex-row md:static md:w-auto md:py-0 md:flex"
					}`}>
					<NavLink
						to="/"
						className="border border-black text-black hover:bg-black hover:border-transparent hover:text-white py-1.5 px-4 rounded transition-all ease-in-out duration-300">
						<i className="fas fa-house mr-[5px]" aria-hidden="true"></i>
						Home
					</NavLink>
					{isLoggedIn && (
						<NavLink
							to="/manage-product"
							onClick={this.handleAddProductClick}
							className="border border-black text-black hover:bg-black hover:border-transparent hover:text-white py-1.5 px-4 rounded transition-all ease-in-out duration-300">
							<i className="fas fa-cog" aria-hidden="true"></i>
							<span className="ml-2">Manage Product</span>
						</NavLink>
					)}
				</div>
				<NavLink
					to={isLoggedIn ? "/login" : "/manage-product"}
					onClick={isLoggedIn ? logout : () => {}}
					className={`ml-2 ${
						isLoggedIn
							? "border border-[#b22323] bg-[#b22323] text-white hover:bg-white hover:border-[#b22323] hover:text-[#b22323]"
							: "border border-blue-700 bg-blue-700 text-white hover:bg-white hover:border-blue-700 hover:text-blue-700"
					} h-[38px] w-[100px] whitespace-nowrap flex items-center justify-center rounded transition-all ease-in-out duration-300 px-2 gap-2`}>
					<i className="fas fa-right-to-bracket" aria-hidden="true"></i>
					{isLoggedIn ? "Log Out" : "Login"}
				</NavLink>
			</div>
		)
	}
}

export default Navbar
