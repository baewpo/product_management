import { Component } from "react"
import axios from "axios"
import Filter from "../components/general/filter"
import ProductParam from "models/product/productParam"
import ProductResponse from "models/product/productResponse"
import { showToast } from "components/general/toast"
import Loading from "components/general/loading"
import Pagination from "components/general/pagination"
import qs from "qs"
import ProductCard from "components/product/productCard"

interface IProps {

}
interface IStates {
	products: Array<ProductResponse>
	totalPages: number
	currentPage: number
	showLoading: boolean
	params: ProductParam
}

class ProductPage extends Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props)
		this.state = {
			products: new Array<ProductResponse>(),
			totalPages: 1,
			currentPage: 1,
			showLoading: false,
			params: new ProductParam(),
		}
	}

	componentDidMount() {
		this.updateQueryParams({ ...this.state.params, pageNumber: 1 })
		this.getProducts()
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
			console.error(error.response.message)
			showToast("error", error.response.message || "Error fetching products")
		} finally {
			this.setState({ showLoading: false })
		}
	}

	public handleSearch(params: ProductParam): void {
		this.setState({ params: params, currentPage: 1 }, () => {
			this.getProducts()
			this.updateQueryParams({ ...this.state.params, pageNumber: 1 })
		})
	}

	public render(): JSX.Element {
		return (
			<div className="min-h-screen flex flex-col justify-between bg-gray-100 pb-24 px-4 sm:px-6 lg:px-8 overflow-y-auto">
				<Loading showLoading={this.state.showLoading} />
				<div className="container relative px-4 mx-auto mt-4 flex-grow">
					<div className="flex flex-col md:flex-row gap-6">
						<div className="w-full md:w-1/3 xl:w-1/4">
							<Filter onSearch={(params) => this.handleSearch(params)} />
						</div>
						<div className="w-full md:w-2/3 xl:w-3/4">
							<div className="grid grid-cols-12 gap-4 min-h-[500px]">
								{this.state.products.length === 0 ? (
									<div className="col-span-12 h-full flex justify-center items-center">
										<p>No Products Available</p>
									</div>
								) : (
									this.state.products.map((product) => <ProductCard key={product.id} product={product} />)
								)}
							</div>
							<div className="flex justify-center pt-4">
								<Pagination
									currentPage={this.state.currentPage}
									totalPages={this.state.totalPages}
									onPageChange={this.handlePageChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ProductPage
