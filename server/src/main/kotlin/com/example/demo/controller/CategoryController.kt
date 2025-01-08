package com.example.demo.controller

import com.example.demo.converter.CategoryConverter
import com.example.demo.model.category.CategoryResponse
import com.example.demo.model.product.CategoryRequest
import com.example.demo.service.CategoryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class CategoryController constructor(
    val categoryService: CategoryService,
    val categoryConverter: CategoryConverter
) {

    @GetMapping("/categories")
    fun getAllCategories(): ResponseEntity<List<CategoryResponse>> {
        val categories = categoryService.getAllCategory()
        return ResponseEntity.ok(categories)
    }

    @GetMapping("/categories/{id}")
    fun getCategoryById(@PathVariable id: Int): ResponseEntity<CategoryResponse> {
        val category = categoryService.getCategoryById(id)
        val categoryResponse = categoryConverter.entityToResponse(category)
        return ResponseEntity.ok().body(categoryResponse)
    }

    @PostMapping("/categories")
    fun addCategory(@RequestBody request: CategoryRequest): ResponseEntity<CategoryResponse> {
        val categoryResponse = categoryService.addCategory(request)
        return ResponseEntity(categoryResponse, HttpStatus.CREATED)

    }
}