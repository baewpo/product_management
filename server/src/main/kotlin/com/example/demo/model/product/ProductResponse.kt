package com.example.demo.model.product

import com.example.demo.model.category.CategoryEntity

data class ProductResponse(
    var id: Int = 0,
    var name: String? = "",
    var price: Double? = 0.0,
    var description: String? = "",
    var quantity: Int? = 0,
    var image: String? = "",
    var category: List<CategoryEntity?>
)