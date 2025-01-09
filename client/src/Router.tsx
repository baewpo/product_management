import { Component } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/common/layout"
import ProductPage from "./pages/productPage"
import Login from "./pages/login"
import PageNotFound from "./pages/not-found/PageNotFound"
import AddProduct from "./pages/addProduct"
import PrivateRoute from "routes/privateRoutes"

class Router extends Component {
	render() {
		return (
			<div className="app min-h-screen">
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<ProductPage />} />
						<Route path="login" element={<PrivateRoute component={Login} />} />
						<Route path="/manage-product" element={<PrivateRoute component={AddProduct} />} />
					</Route>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>
		)
	}
}

export default Router
