import { Fragment, ReactElement } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./navigationBar"

function Layout(): ReactElement {
	return (
		<Fragment>
			<Navbar />
			<div id="container" className="overflow-y-auto h-[calc(100vh-60px)]">
				<Outlet></Outlet>
			</div>
		</Fragment>
	)
}

export default Layout
