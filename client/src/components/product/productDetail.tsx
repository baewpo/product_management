import { Component } from "react"
import ProductResponse from "~/src/models/product"

interface IProps {
	product: ProductResponse
	onClose: () => void
}

interface IStates {}

class ProductDetail extends Component<IProps, IStates> {

	public render(): JSX.Element {
		return (
			<div className="fixed inset-0 z-50 bg-black bg-opacity-75 overflow-y-auto">
				<div className="flex items-center justify-center min-h-full p-5">
					<div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden">
						<button
							onClick={this.props.onClose}
							className="absolute top-3 right-3 bg-slate-800 text-white font-semibold text-sm shadow-sm w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-800 transition-all ease duration-300 hover:shadow hover:bg-slate-700">
							<i className="fas fa-times" aria-hidden="true"></i>
						</button>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
							<div className="flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden p-4 sm:h-[300px] h-[200px]">
								<img
									src={this.props.product.image}
									alt={this.props.product.name}
									className="object-contain max-w-full max-h-full hover:scale-110 transition-all ease-in-out duration-500"
								/>
							</div>
							<div className="flex flex-col gap-4">
								<label className="text-2xl font-semibold tracking-tight text-gray-900 truncate">
									{this.props.product.name}
								</label>
								<div className="h-28 overflow-y-scroll border border-gray-300 rounded-lg p-4">
									<p className="text-sm text-gray-600">{this.props.product.description}</p>
								</div>
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">Price:</span>
										<span className="text-lg text-black font-bold bg-gray-50 border border-gray-300 px-2.5 py-1 rounded-md shadow-sm select-none">
											${this.props.product.price}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">Quantity:</span>
										<span className="text-lg text-black font-bold bg-gray-50 border border-gray-300 px-2.5 py-1 rounded-md shadow-sm select-none">
											{this.props.product.quantity}
										</span>
									</div>
								</div>
								<hr />
								{this.props.product.category && (
									<div className="flex gap-2">
										<span className="text-sm text-gray-500">Categories:</span>
										<div className="flex flex-wrap items-start w-full h-10 gap-0.5 overflow-y-auto">
											{this.props.product.category.map((category) => (
												<span
													key={category.id}
													className="text-xs font-medium rounded-full bg-slate-800 text-white px-3 py-1 select-none">
													{category.name}
												</span>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ProductDetail
