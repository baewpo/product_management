import { Fragment, ReactElement } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../general/navigationBar"

function Layout(): ReactElement {
	return (
		<Fragment>
			<Navbar />
			<div id="container" className="overflow-y-auto h-screen">
				<Outlet></Outlet>
			</div>
		</Fragment>
	)
}

export default Layout
