import axios from "axios"
import CategoryResponse from "models/product/categoryResponse"
import ProductFormTypeEnum from "models/product/productFormTypeEnum"
import { Component } from "react"
import ProductRequest from "../../models/product/productRequest"
import { showToast } from "components/general/toast"

interface IProps {
	onClose: () => void
	productRequest: ProductRequest
	type: ProductFormTypeEnum
	onSubmit: () => void
	categoryOptions: Array<CategoryResponse>
}

interface IStates {
	productRequest: ProductRequest
}

class ProductForm extends Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props)
		this.state = {
			productRequest: new ProductRequest(),
		}
	}

	componentDidMount() {
		if (this.props.productRequest) {
			this.setState({
				productRequest: this.props.productRequest,
			})
		}
	}

	componentDidUpdate(prevProps: IProps) {
		if (prevProps.productRequest !== this.props.productRequest) {
			if (this.props.productRequest) {
				this.setState({
					productRequest: this.props.productRequest,
				})
			}
		}
	}

	private async addProduct(): Promise<void> {
		try {
			const response = await axios.post("/api/products", this.state.productRequest)
			if (response.data) {
				showToast("success", "Add new product success!")
				this.props.onSubmit()
			}
		} catch (error) {
			console.error(error)
			showToast("error", error)
		}
	}

	private async updateProduct(): Promise<void> {
		try {
			const response = await axios.patch(`/api/products/${this.state.productRequest.id}`, this.state.productRequest)
			if (response.data) {
				showToast("success", "Update product success!")
				this.props.onSubmit()
			}
		} catch (error) {
			console.error(error)
			showToast("error", error.response?.data?.message)
		}
	}

	public render(): JSX.Element {
		return (
			<div className="fixed inset-0 z-50 bg-black bg-opacity-75 overflow-y-auto">
				<div className="flex items-center justify-center min-h-full p-5">
					<div className="bg-white rounded-lg overflow-hidden shadow-2xl w-full sm:max-w-4xl p-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="flex flex-col justify-between items-center bg-gray-100 rounded-lg p-4 relative gap-4">
								<div className="sm:h-[450px] h-[200px] w-full">
									{this.state.productRequest.image ? (
										<img
											src={this.state.productRequest.image}
											className="w-full h-full object-cover"
											alt="Product"
										/>
									) : (
										<i className="fas fa-upload text-8xl text-gray-500 flex items-center justify-center h-full"></i>
									)}
								</div>
								<div className="w-full">
									<input
										type="text"
										value={this.state.productRequest.image}
										onChange={(e) =>
											this.setState({
												productRequest: {
													...this.state.productRequest,
													image: e.target.value,
												},
											})
										}
										required
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 transition duration-300 ease focus:outline-none focus:ring-black focus:border-black shadow-sm focus:shadow"
										placeholder="Enter image URL..."
									/>
								</div>
							</div>

							<div className="flex flex-col gap-2.5">
								<label className="block text-sm font-medium text-gray-900">Product Name</label>
								<input
									type="text"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 transition duration-300 ease focus:outline-none focus:ring-black focus:border-black shadow-sm focus:shadow"
									value={this.state.productRequest.name}
									maxLength={50}
									required
									placeholder="Enter product name..."
									onChange={(e) =>
										this.setState({
											productRequest: {
												...this.state.productRequest,
												name: e.target.value,
											},
										})
									}
								/>
								<div className="flex flex-col sm:flex-row sm:items-center gap-4">
									<div className="flex flex-col sm:w-1/2 gap-2.5">
										<label className="block text-sm font-medium text-gray-900">Price ($)</label>
										<input
											type="number"
											min="0"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 transition duration-300 ease focus:outline-none focus:ring-black focus:border-black shadow-sm focus:shadow"
											value={this.state.productRequest.price}
											required
											onChange={(e) =>
												this.setState({
													productRequest: {
														...this.state.productRequest,
														price: e.target.value,
													},
												})
											}
											placeholder="0"
										/>
									</div>
									<div className="flex flex-col sm:w-1/2 gap-2.5">
										<label className="block text-sm font-medium text-gray-900">Quantity</label>
										<input
											type="number"
											min="0"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 transition duration-300 ease focus:outline-none focus:ring-black focus:border-black shadow-sm focus:shadow"
											value={this.state.productRequest.quantity}
											required
											onChange={(e) =>
												this.setState({
													productRequest: {
														...this.state.productRequest,
														quantity: e.target.value,
													},
												})
											}
											placeholder="0"
										/>
									</div>
								</div>
								<label className="block text-sm font-medium text-gray-900">Description</label>
								<textarea
									type="text"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 transition duration-300 ease focus:outline-none focus:ring-black focus:border-black shadow-sm focus:shadow resize-none h-32"
									value={this.state.productRequest.description}
									maxLength={400}
									required
									onChange={(e) =>
										this.setState({
											productRequest: {
												...this.state.productRequest,
												description: e.target.value,
											},
										})
									}
									placeholder="Enter description..."
								/>
								<label className="block text-sm font-medium text-gray-900">Categories</label>
								<div className="grid grid-cols-2 gap-2">
									{this.props.categoryOptions.map((option) => (
										<label key={option.id} className="flex items-center truncate">
											<input
												type="checkbox"
												name="categories"
												value={option.id}
												checked={this.state.productRequest.categories?.includes(option.id)}
												onChange={() => {
													const categories = this.state.productRequest.categories || []
													const updatedCategories = categories.includes(option.id)
														? categories.filter((id) => id !== option.id)
														: [...categories, option.id]
													this.setState({
														productRequest: {
															...this.state.productRequest,
															categories: updatedCategories.length ? updatedCategories : undefined,
														},
													})
												}}
												className="h-4 w-4 transition-all ease-in-out duration-300 shadow-sm hover:shadow"
											/>
											<span className="ml-2 text-sm font-normal text-gray-900">{option.name}</span>
										</label>
									))}
								</div>
								<div className="flex justify-end mt-2 gap-2">
									<button
										className="bg-slate-800 rounded-full px-4 py-2 border border-transparent text-center text-sm text-white transition-all ease-in-out duration-500 shadow-sm hover:shadow hover:bg-slate-700"
										onClick={() =>
											this.props.type === ProductFormTypeEnum.ADD ? this.addProduct() : this.updateProduct()
										}>
										{this.props.type} Product
									</button>
									<button
										type="button"
										onClick={this.props.onClose}
										className="rounded-full px-4 py-2 text-slate-800 shadow-sm hover:text-white hover:bg-slate-700 border border-slate-700 hover:shadow hover:border-slate-800 transition-all ease-in-out duration-500 text-sm bg-white">
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ProductForm
