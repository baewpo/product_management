import React from "react"
import ProductDetail from "./productDetail"
import ProductResponse from "models/product/productResponse"

interface IProps {
	product: ProductResponse
}

interface IStates {
	showDetail: boolean
}

class ProductCard extends React.Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props)
		this.state = { showDetail: false }
	}

	public render(): JSX.Element {
		return (
			<div className="col-span-12 md:col-span-6 lg:col-span-4">
				<div className="bg-white shadow border rounded-xl p-4 pb-0 flex flex-col">
					<div className="bg-gray-100 rounded-t-xl flex justify-center items-center h-64 relative overflow-hidden shadow w-full">
						{!this.props.product.quantity && (
							<h6 className="bg-grey-dark text-white absolute top-4 left-0 rounded-r-md px-6 py-2 mb-0 font-medium z-10">
								Out of stock
							</h6>
						)}
						<img
							src={this.props.product.image}
							alt={this.props.product.name}
							className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-110 hover:opacity-80 hover:rotate-2"
						/>
					</div>
					<div className="py-6 px-1 flex flex-col">
						<div>
							<h6 className="text-[17px] font-medium line-clamp-1 break-words">{this.props.product.name}</h6>
							<div className="flex mt-1">
								<p className="text-sm line-clamp-3 break-words w-full lg:min-h-[72px]">
									{this.props.product.description}
								</p>
								<p className="text-3xl font-bold p-2 rounded-xl ">${this.props.product.price}</p>
							</div>
						</div>
						<hr className="my-6" />
						<div className="flex flex-col items-center">
							<button
								onClick={() => this.setState({ showDetail: true })}
								className="rounded-full font-medium px-4 py-2 text-slate-800 shadow-sm hover:text-white hover:bg-slate-700 border border-slate-700 hover:shadow hover:border-slate-800 transition-all ease-in-out duration-500 bg-white">
								Click to see details
							</button>
						</div>
					</div>
				</div>
				{this.state.showDetail && (
					<ProductDetail product={this.props.product} onClose={() => this.setState({ showDetail: false })} />
				)}
			</div>
		)
	}
}

export default ProductCard
