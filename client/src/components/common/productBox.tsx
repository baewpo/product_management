import { Button } from "@material-tailwind/react"
import React from "react"
import ProductDetail from "./productDetail"
import ProductResponse from "~/src/models/product"

interface IProps {
	product: ProductResponse
}

interface IStates {
	showDetail: boolean
}

class ProductBox extends React.Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props)
		this.state = { showDetail: false }
	}

	public render(): JSX.Element {
		return (
			<div className="col-span-12 md:col-span-6 lg:col-span-4">
				<div className="bg-white shadow border rounded-xl p-4 pb-0 flex flex-col">
					<div className="bg-gray-100 rounded flex justify-center items-center min-h-[265px] relative p-12 w-full">
						{this.props.product.quantity === 0 && (
							<h6 className="bg-grey-dark text-white absolute top-4 left-0 rounded-r-md px-6 py-2 mb-0 font-medium">
								Out of stock
							</h6>
						)}
						<img
							src={this.props.product.image}
							alt={this.props.product.name}
							className="max-w-full max-h-full xl:h-44 object-center"
						/>
					</div>
					<div className="py-6 px-1 flex flex-col">
						<div>
							<h6 className="text-[17px] font-medium line-clamp-1 break-words">
								{this.props.product.name}
							</h6>
							<div className="flex mt-1">
								<p className="text-sm line-clamp-3 break-words w-full">
									{this.props.product.description}
								</p>
								<p className="text-3xl font-bold p-2 rounded-xl">
									${this.props.product.price}
								</p>
							</div>
						</div>
						<hr className="my-6" />
						<div className="flex flex-col items-center">
							<Button
								onClick={() => this.setState({ showDetail: true })}
								variant="outlined"
								className="rounded-full text-[16px] py-2 hover:text-grey-dark">
								Click to see details
							</Button>
						</div>
					</div>
				</div>
				{this.state.showDetail && (
						<ProductDetail
							product={this.props.product}
							onClose={() => this.setState({ showDetail: false })}
						/>
				)}
			</div>
		)
	}
}

export default ProductBox
