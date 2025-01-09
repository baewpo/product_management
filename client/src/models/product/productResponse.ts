import CategoryResponse from "./categoryResponse"

class ProductResponse {
	public name: string = String()
	public price: number = Number()
	public description: string = String()
	public quantity: number = Number()
	public image: string = String()
	public category: Array<CategoryResponse> = new Array<CategoryResponse>()
}

export default ProductResponse
