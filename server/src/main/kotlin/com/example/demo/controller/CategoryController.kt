package com.example.demo.controller

import com.example.demo.model.category.CategoryEntity
import com.example.demo.model.category.CategoryResponse
import com.example.demo.repository.CategoryRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CategoryController constructor(
    val categoryRepository: CategoryRepository,
) {

    @GetMapping("/api/categories")
    fun getAllCategories(): List<CategoryResponse> {
        return categoryRepository.findAll().map(CategoryEntity::toResponse)
    }

}