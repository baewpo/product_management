class ProductRequest  {
    public name = String()
    public price!: number
    public description = String()
    public quantity!: number
    public image = String()
    public categories: Array<number> = Array<number>()
	id: any
}
export default ProductRequest