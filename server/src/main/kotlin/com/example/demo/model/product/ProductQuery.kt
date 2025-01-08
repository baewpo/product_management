package com.example.demo.model.product

data class ProductQuery(
    var name: String?,
    var priceMin: Int?,
    var priceMax: Int?,
    var stock: Boolean = false,
    var categories: List<Int>?,
    var pageNumber: Int = 1,
    var pageSize: Int = 9
)