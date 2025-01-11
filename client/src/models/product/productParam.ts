class ProductParam {
    public name?: string
    public priceMin?: number
    public priceMax?: number
    public stock?: boolean = false
    public categories?: Array<number>
    public pageNumber?: number
    public pageSize?: number
}

export default ProductParam