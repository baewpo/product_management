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
				<label className="font-bold text-xl text-slate-800 flex items-center ">
					Products
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
						to="/?pageNumber=1"
						className="rounded font-medium px-4 py-2 text-slate-800 shadow-sm hover:text-white hover:bg-slate-700 border border-slate-700 hover:shadow hover:border-slate-800 transition-all ease-in-out duration-500 bg-white">
						<i className="fas fa-house mr-[5px]" aria-hidden="true" />
						Home
					</NavLink>
					{isLoggedIn && (
						<NavLink
							to="/manage-product"
							onClick={this.handleAddProductClick}
							className="rounded font-medium px-4 py-2 text-slate-800 shadow-sm hover:text-white hover:bg-slate-700 border border-slate-700 hover:shadow hover:border-slate-800 transition-all ease-in-out duration-500 bg-white">
							<i className="fas fa-cog mr-2" aria-hidden="true" />
							Manage Product
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
					} px-4 py-2 whitespace-nowrap flex items-center justify-center rounded font-meduim shadow-sm hover:shadow transition-all ease-in-out duration-500 px-2 gap-2`}>
					<i className="fas fa-right-to-bracket" aria-hidden="true"></i>
					{isLoggedIn ? "Log Out" : "Login"}
				</NavLink>
			</div>
		)
	}
}

export default Navbar
