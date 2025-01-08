package com.example.demo.model.productcategory

import com.example.demo.model.category.CategoryEntity

data class ProductCategoryResponse(
    var id: Int = 0,
    var name: String = "",
    var price: Double = 0.0,
    var description: String = "",
    var image: String = "",
    var category: List<CategoryEntity>
)