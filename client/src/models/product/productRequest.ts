class ProductRequest  {
    public name: string = String()
    public price: number
    public description: string = String()
    public quantity: number
    public image: string = String()
    public categories: Array<Number> = Array<Number>()
}
export default ProductRequest