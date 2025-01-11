package com.example.demo.model.product

data class ProductRequest(
    var name: String,
    var price: Double,
    var description : String,
    var quantity: Int,
    var image : String,
    var categories: List<Int>
)