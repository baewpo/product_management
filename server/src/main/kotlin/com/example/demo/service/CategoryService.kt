package com.example.demo.service

import com.example.demo.converter.CategoryConverter
import com.example.demo.model.category.CategoryEntity
import com.example.demo.model.category.CategoryResponse
import com.example.demo.model.product.CategoryRequest
import com.example.demo.repository.CategoryRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class CategoryService constructor(
    val categoryRepository: CategoryRepository,
    val categoryConverter: CategoryConverter
) {
    fun getAllCategory(): List<CategoryResponse> {
        val categories = categoryRepository.findAll()
        return categories.map {
            CategoryResponse(id = it.id, name = it.name)
        }
    }

    fun getCategoryById(id: Int): CategoryEntity {
        return categoryRepository.findById(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found with id: $id") }
    }

    fun addCategory(category: CategoryRequest): CategoryResponse {
        val newCategoryEntity = CategoryEntity(
            name = category.name
        )
        val savedCategoryEntity = categoryRepository.save(newCategoryEntity)
        return categoryConverter.entityToResponse(savedCategoryEntity)
    }

}
