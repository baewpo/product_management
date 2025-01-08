package com.example.demo.model.product

data class ProductQuery(
    var name: String?,
    var priceMin: Int?,
    var priceMax: Int?,
    var stock: Boolean = false,
    var categories: List<Int>?,
    var page : Int = 0,
    var size : Int = 9
)