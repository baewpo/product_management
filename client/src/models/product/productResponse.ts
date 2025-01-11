import CategoryResponse from "./categoryResponse"

class ProductResponse {
	public id = Number()
	public name = String()
	public price = Number()
	public description = String()
	public quantity = Number()
	public image = String()
	public category: Array<CategoryResponse> = new Array<CategoryResponse>()
}

export default ProductResponse
