package com.example.demo.converter

import com.example.demo.model.category.CategoryEntity
import com.example.demo.model.category.CategoryResponse
import org.springframework.stereotype.Component

@Component
class CategoryConverter {
    fun entityToResponse(categoryEntity: CategoryEntity): CategoryResponse {
        return CategoryResponse(
            id = categoryEntity.id,
            name = categoryEntity.name
        )
    }

}