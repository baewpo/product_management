package com.example.demo.controller

import com.example.demo.converter.ProductConverter
import com.example.demo.model.product.ProductEntity
import com.example.demo.model.product.ProductQuery
import com.example.demo.model.product.ProductRequest
import com.example.demo.model.product.ProductResponse
import com.example.demo.service.ProductService
import org.springframework.data.domain.Page
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@CrossOrigin(origins = arrayOf())
class ProductController constructor(
    var productService: ProductService,
    var productConverter: ProductConverter
)
{
    @GetMapping("/products")
    fun getProductsPaginated(productQuery: ProductQuery
    ): ResponseEntity<Page<ProductEntity>> {
        val products: Page<ProductEntity> = productService.getAllProducts(productQuery)
        return ResponseEntity<Page<ProductEntity>>(products, HttpStatus.OK)
    }

    @GetMapping("/products/{id}")
    fun getProductById(@PathVariable id: Int): ResponseEntity<ProductResponse> {
        val product = productService.getProductById(id)
        val productResponse = productConverter.entityToResponse(product)
        return ResponseEntity.ok().body(productResponse)
    }

    @PostMapping("/products")
    fun addProduct(@RequestBody request: ProductRequest): ResponseEntity<ProductResponse> {
        val productResponse = productService.addProduct(request)
        return ResponseEntity(productResponse, HttpStatus.CREATED)
    }

    @DeleteMapping("/products/{id}")
    fun deleteProduct(@PathVariable id: Int): ResponseEntity<String> {
        productService.deleteProduct(id)
        return ResponseEntity.ok().body("Product with id: $id has been deleted successfully")
    }

    @PatchMapping("/products/{id}")
    fun updateProduct(@PathVariable id: Int, @RequestBody request: ProductRequest): ResponseEntity<ProductResponse> {
        val productResponse = productService.updateProduct(id, request)
        return ResponseEntity(productResponse, HttpStatus.CREATED)

    }

}

