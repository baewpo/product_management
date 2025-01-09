package com.example.demo.controller

import com.example.demo.model.product.ProductEntity
import com.example.demo.model.product.ProductQuery
import com.example.demo.model.product.ProductRequest
import com.example.demo.model.product.ProductResponse
import com.example.demo.model.productcategory.ProductCategoryEntity
import com.example.demo.repository.CategoryRepository
import com.example.demo.repository.ProductCategoryRepository
import com.example.demo.repository.ProductRepository
import com.example.demo.specification.ProductSpec
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException


@RestController
class ProductController constructor(
    val productRepository: ProductRepository,
    val categoryRepository: CategoryRepository,
    val productSpecification: ProductSpec,
    val productCategoryRepository: ProductCategoryRepository
) {

    @GetMapping("/products")
    fun getProducts(productQuery: ProductQuery): ResponseEntity<Map<String, Any>> {
        val products = productRepository.findAll(
            productSpecification.generateFromQuery(productQuery),
            PageRequest.of(productQuery.pageNumber - 1, productQuery.pageSize, Sort.by(Sort.Direction.DESC, "id"))
        )
        val response = mapOf(
            "totalElements" to products.totalElements,
            "totalPages" to products.totalPages,
            "pageNumber" to (products.number + 1),
            "pageSize" to products.size,
            "content" to products.content.map { it.toResponse() }
        )

        return ResponseEntity.ok(response)
    }

    @GetMapping("/products/{id}")
    fun getProductById(@PathVariable id: Int): ProductResponse {
        val product: ProductEntity = productRepository.findById(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with id: $id") }
        return product.toResponse()
    }

    @PostMapping("/products")
    fun addProduct(@RequestBody request: ProductRequest): ProductResponse {
        val productCategories = request.categories.map { categoryId ->
            val category = categoryRepository.findById(categoryId)
                .orElseThrow {
                    ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Category not found with id: $categoryId"
                    )
                }
            ProductCategoryEntity(category = category)
        }
        val newProduct = ProductEntity(
            name = request.name,
            price = request.price,
            description = request.description,
            quantity = request.quantity,
            image = request.image,
            productCategories = productCategories
        )
        return productRepository.save(newProduct).toResponse()
    }

    @DeleteMapping("/products/{id}")
    fun deleteProduct(@PathVariable id: Int): ResponseEntity<String> {
        productRepository.findById(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with id: $id") }
        productRepository.deleteById(id)
        return ResponseEntity.ok().body("Product with id: $id has been deleted successfully")
    }


    @PatchMapping("/products/{id}")
    fun updateProduct(@PathVariable id: Int, @RequestBody request: ProductRequest): ProductResponse {
        val productToUpdate = productRepository.findById(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with id: $id") }
        productToUpdate.run {
            name = request.name
            price = request.price
            description = request.description
            quantity = request.quantity
            image = request.image
        }
        productCategoryRepository.deleteAllByProductId(id)
        val newCategories = request.categories.map { categoryId ->
            val category = categoryRepository.findById(categoryId)
                .orElseThrow {
                    ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Category not found with id: $categoryId"
                    )
                }
            ProductCategoryEntity(product = productToUpdate, category = category)
        }

        productCategoryRepository.saveAll(newCategories)
        return productRepository.save(productToUpdate).toResponse()
    }

}

