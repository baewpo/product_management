import axios from "axios"
import { showToast } from "components/general/toast"
import ProductFormTypeEnum from "models/product/productFormTypeEnum"
import ProductParam from "models/product/productParam"
import ProductRequest from "models/product/productRequest"
import ProductResponse from "models/product/productResponse"
import qs from "qs"
import ProductForm from "./productForm"
import React from "react"
import Pagination from "components/general/pagination"
import GeneralConfirmModal from "components/general/confirmModal"
import Loading from "components/general/loading"
import CategoryResponse from "models/product/categoryResponse"

interface IProps {}

interface IStates {
	products: Array<ProductResponse>
	params: ProductParam
	showLoading: boolean
	showProductForm: boolean
	currentPage: number
	totalPages: number
	formType: ProductFormTypeEnum
	productRequest: ProductRequest
	showDeleteModal: boolean
	categoryOptions: Array<CategoryResponse>
}

class ProductTable extends React.Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props)
		this.state = {
			products: new Array<ProductResponse>(),
			params: new ProductParam(),
			productRequest: new ProductRequest(),
			showLoading: false,
			showProductForm: false,
			currentPage: 1,
			totalPages: 1,
			formType: ProductFormTypeEnum.ADD,
			categoryOptions: new Array<CategoryResponse>(),
			showDeleteModal: false,
		}
	}

	componentDidMount() {
		this.updateQueryParams({ ...this.state.params, pageNumber: 1 })
		this.getProducts()
		this.getCategory()
	}

	private handlePageChange = (page: number) => {
		this.setState({ currentPage: page }, () => {
			this.updateQueryParams({ ...this.state.params, pageNumber: page })
			this.getProducts()
		})
	}

	private updateQueryParams(newParams: ProductParam = {}): void {
		const queryParams = new URLSearchParams(window.location.search)

		Object.keys(newParams).forEach((key) => {
			const value = newParams[key as keyof ProductParam]

			if (value || value === 0) {
				queryParams.set(key, String(value))
			} else {
				queryParams.delete(key)
			}
		})

		window.history.pushState(null, "", `?${queryParams.toString()}`)
	}

	private async getProducts(): Promise<void> {
		try {
			this.setState({ showLoading: true })
			const response = await axios.get("/api/products", {
				params: {
					...this.state.params,
					pageNumber: this.state.currentPage,
					pageSize: 9,
				},
				paramsSerializer: (params) => {
					return qs.stringify(params, { arrayFormat: "comma" })
				},
			})
			this.setState({
				products: response.data.content,
				totalPages: response.data.totalPages || 1,
			})
		} catch (error) {
			console.error(error)
			showToast("error", error || "Error fetching products")
		} finally {
			this.setState({ showLoading: false })
		}
	}

	private async getCategory(): Promise<void> {
		try {
			const response = await axios.get("/api/categories")
			this.setState({ categoryOptions: response.data })
		} catch (error) {
			console.error(error)
		}
	}

	private async deleteProduct(): Promise<void> {
		try {
			await axios.delete(`/api/products/${this.state.productRequest.id}`)
			showToast("success", "Delete product success!")
		} catch (error) {
			console.log(error)
			showToast("error", error.response?.data?.message)
		}
	}

	private mapResponseToRequest = (product: ProductResponse): ProductRequest => ({
		...product,
		categories: product.category.map((cat) => cat.id),
	})

	public render(): JSX.Element {
		return (
			<>
				<Loading showLoading={this.state.showLoading} />
				<div className="flex justify-end items-center py-4 gap-2">
					<button
						className="flex items-center gap-1 rounded-full px-4 py-2 text-slate-800 shadow-sm hover:text-white hover:bg-slate-700 border border-slate-700 hover:shadow hover:border-slate-800 transition-all ease-in-out duration-500 text-sm bg-white truncate"
						onClick={() => this.getProducts()}>
						<i className="fas fa-refresh" aria-hidden="true" /> Refresh
					</button>
					<button
						className="flex items-center gap-1 rounded-full px-4 py-2 text-slate-800 shadow-sm hover:text-white hover:bg-slate-700 border border-slate-700 hover:shadow hover:border-slate-800 transition-all ease-in-out duration-500 text-sm bg-white truncate"
						onClick={() =>
							this.setState({
								productRequest: new ProductRequest(),
								showProductForm: true,
								formType: ProductFormTypeEnum.ADD,
							})
						}>
						<i className="fas fa-plus" aria-hidden="true" /> Add Product
					</button>
				</div>
				<div className="bg-white h-[calc(100vh-240px)] overflow-y-hidden overflow-x-auto table-fixed rounded border border-slate-800">
					<table className="h-full border-collapse w-full">
						<thead className="text-white bg-slate-700 uppercase relative">
							<tr className="flex pr-[20px] rounded-t">
								<th className="block py-[5px] truncate w-[10%] border-tl-[5px] border-r">ID</th>
								<th className="block py-[5px] truncate w-[15%] border-x">IMAGE</th>
								<th className="block py-[5px] truncate w-[20%] border-x ">NAME</th>
								<th className="block py-[5px] truncate w-[25%] border-x ">DESCRIPTION</th>
								<th className="block py-[5px] truncate w-[10%] border-x">QUANTITY</th>
								<th className="block py-[5px] truncate w-[10%] border-x">PRICE</th>
								<th className="block py-[5px] truncate w-[10%] border-x">ACTION</th>
							</tr>
						</thead>
						<tbody className="block overflow-y-scroll h-full">
							{this.state.products.map((product) => (
								<tr key={product.id} className="flex odd:bg-slate-50 even:bg-slate-100 hover:bg-slate-200">
									<td className="block h-[90px] px-[12px] py-[15px] truncate whitespace-nowrap w-[10%] text-center">
										{product.id}
									</td>
									<td className="block h-[90px] px-[12px] py-[15px] truncate w-[15%]">
										<img src={product.image} alt={product.name} className="w-full h-full object-contain" />
									</td>
									<td className="block h-[90px] px-[12px] py-[15px] w-[20%] line-clamp-3">{product.name}</td>
									<td className="h-[90px] px-[12px] py-[15px] w-[25%] line-clamp-3">{product.description}</td>
									<td className="block h-[90px] px-[12px] py-[15px] truncate w-[10%] text-center">
										{product.quantity}
									</td>
									<td className="block h-[90px] px-[12px] py-[15px] truncate w-[10%] text-center">
										${product.price}
									</td>
									<td className="h-[90px] px-[12px] py-[15px] truncate w-[10%] text-center">
										<i
											className="fas fa-edit text-slate-700 cursor-pointer hover:text-slate-500 transition-all ease duration-300 shadow-sm hover:shadow mr-2"
											aria-hidden="true"
											onClick={() =>
												this.setState({
													productRequest: this.mapResponseToRequest(product),
													showProductForm: true,
													formType: ProductFormTypeEnum.UPDATE,
												})
											}></i>
										<i
											className="fas fa-trash-alt text-slate-700 cursor-pointer hover:text-slate-500 transition-all ease duration-300 shadow-sm hover:shadow"
											aria-hidden="true"
											onClick={() =>
												this.setState({
													showDeleteModal: true,
													productRequest: { ...this.state.productRequest, id: product.id },
												})
											}></i>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{this.state.showProductForm && (
					<ProductForm
						onSubmit={() =>
							this.setState(
								{
									showProductForm: false,
									currentPage: this.state.formType === ProductFormTypeEnum.ADD ? 1 : this.state.currentPage,
								},
								() => this.getProducts()
							)
						}
						onClose={() => this.setState({ showProductForm: false })}
						productRequest={this.state.productRequest}
						type={this.state.formType}
						categoryOptions={this.state.categoryOptions}
					/>
				)}
				<GeneralConfirmModal
					show={this.state.showDeleteModal}
					onClose={() => this.setState({ showDeleteModal: false })}
					text="Are you sure to delete this product ?"
					onConfirm={() => {
						this.setState({ showDeleteModal: false }, async () => {
							await this.deleteProduct()
							this.getProducts()
						})
					}}
				/>
				<div className="flex justify-end">
					<Pagination
						currentPage={this.state.currentPage}
						totalPages={this.state.totalPages}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</>
		)
	}
}

export default ProductTable
