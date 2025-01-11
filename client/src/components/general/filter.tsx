import { Component } from "react"
import ProductParam from "models/product/productParam"
import axios from "axios"
import CategoryResponse from "models/product/categoryResponse"

interface IProps {
	onSearch: (filter: ProductParam) => void
}

interface IStates {
	productParam: ProductParam
	categoryOptions: Array<CategoryResponse>
}

const stockOptions = [
	{ label: "Show All", value: 0 },
	{ label: "In Stock", value: 1 },
]

class Filter extends Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props)
		this.state = {
			productParam: new ProductParam(),
			categoryOptions: new Array<CategoryResponse>(),
		}
	}

	componentDidMount(): void {
		this.getCategory()
	}

	private async getCategory(): Promise<void> {
		try {
			const response = await axios.get("/api/categories")
			this.setState({ categoryOptions: response.data })
		} catch (error) {
			console.error(error)
		}
	}

	public render(): JSX.Element {
		return (
			<div className="bg-white rounded-xl border dark:border-slate-700 p-6">
				<div className="w-full relative mt-4">
					<div className="relative">
						<input
							type="search"
							className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:ring-black focus:border-black shadow-sm focus:shadow"
							placeholder="Search product name..."
							value={this.state.productParam.name || ""}
							onChange={(e) => {
								const updatedName = e.target.value
								this.setState(
									{
										productParam: { ...this.state.productParam, name: updatedName },
									},
									() => {
										if (!updatedName) {
											this.props.onSearch(this.state.productParam)
										}
									}
								)
							}}
						/>
						<button
							className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all ease-in-out duration-300 shadow-sm hover:shadow hover:bg-slate-700 "
							type="button"
							onClick={() => this.props.onSearch(this.state.productParam)}>
							Search
						</button>
					</div>
				</div>
				<hr className="my-6" />
				<label className="slate-800 text-3xl font-semibold flex w-full gap-2 items-center mb-5">
					<i className="fa fa-filter slate-800" aria-hidden="true"></i>Filter
				</label>
				<div>
					<div className="flex items-center gap-2 my-2 justify-between">
						<label className="slate-800 font-medium text-xl">Price</label>
						<button
							type="button"
							onClick={() =>
								this.setState(
									{
										productParam: {
											...this.state.productParam,
											priceMax: undefined,
											priceMin: undefined,
										},
									},
									() => this.props.onSearch(this.state.productParam)
								)
							}
							className="text-gray-400 hover:text-gray-600 text-xs transition-all ease duration-300">
							<i className="fas fa-times-circle mr-1 text-xs " aria-hidden="true"></i>Clear
						</button>
					</div>
					<div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
						<div className="flex flex-col sm:w-1/2">
							<label className="block mb-2 text-sm font-medium text-slate-800">From</label>
							<input
								type="number"
								className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg block w-full p-2 transition duration-300 ease focus:outline-none focus:ring-black focus:border-black shadow-sm focus:shadow"
								value={this.state.productParam.priceMin || ""}
								onChange={(e) =>
									this.setState({
										productParam: {
											...this.state.productParam,
											priceMin: Number(e.target.value,)
										},
									})
								}
								min={0}
								placeholder="min"
							/>
						</div>
						<div className="flex flex-col sm:w-1/2">
							<label className="block mb-2 text-sm font-medium text-slate-800">To</label>
							<input
								type="number"
								className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg block w-full p-2 transition duration-300 ease focus:outline-none focus:ring-black focus:border-black shadow-sm focus:shadow"
								value={this.state.productParam.priceMax || ""}
								onChange={(e) =>
									this.setState({
										productParam: {
											...this.state.productParam,
											priceMax: Number(e.target.value)
										},
									})
								}
								min={0}
								placeholder="max"
							/>
						</div>
					</div>
					<button
						className="w-full py-2.5 flex items-center justify-center gap-2 rounded-full bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all duration-300 hover:shadow
					hover:bg-slate-700"
						onClick={() => this.props.onSearch(this.state.productParam)}>
						<i className="fas fa-search" aria-hidden="true"></i>
						Search
					</button>
				</div>
				<hr className="my-6" />
				<div className="filter-content">
					<label className="slate-800 text-xl font-semibold mt-6">Stock</label>
					{stockOptions.map((option, index) => (
						<div className="block mt-4" key={index}>
							<input
								type="radio"
								name="stock"
								checked={this.state.productParam.stock === !!index}
								onChange={() =>
									this.setState(
										{
											productParam: { ...this.state.productParam, stock: !!index },
										},
										() => {
											this.props.onSearch(this.state.productParam)
										}
									)
								}
							/>
							<label className="ml-2">{option.label}</label>
						</div>
					))}
					<hr className="my-6" />
					<label className="slate-800 text-xl font-semibold mt-6">Categories</label>
					{this.state.categoryOptions.map((option) => (
						<div className="block mt-4" key={`${option.id}-${option}`}>
							<input
								className="transition-all ease-in-out duration-300 shadow-sm hover:shadow"
								type="checkbox"
								checked={this.state.productParam.categories?.includes(option.id)}
								onChange={() => {
									const categories = this.state.productParam.categories || []
									const updatedCategories = categories.includes(option.id)
										? categories.filter((id) => id !== option.id)
										: [...categories, option.id]
									this.setState(
										{
											productParam: {
												...this.state.productParam,
												categories: updatedCategories.length ? updatedCategories : undefined,
											},
										},
										() => this.props.onSearch(this.state.productParam)
									)
								}}
							/>
							<label className="ml-2">{option.name}</label>
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default Filter
