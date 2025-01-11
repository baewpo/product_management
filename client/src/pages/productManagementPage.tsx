import React from "react"
import ProductTable from "../components/product/productTable"

class ProductManagementPage extends React.Component<{}, {}> {

	public render(): JSX.Element {
		return (
			<div className="h-full mx-auto p-6 bg-gray-100">
				<ProductTable />
			</div>
		)
	}
}

export default ProductManagementPage
