package com.example.demo.service

import com.example.demo.converter.ProductConverter
import com.example.demo.model.category.CategoryEntity
import com.example.demo.model.product.ProductEntity
import com.example.demo.model.product.ProductQuery
import com.example.demo.model.product.ProductRequest
import com.example.demo.model.product.ProductResponse
import com.example.demo.model.productcategory.ProductCategoryEntity
import com.example.demo.repository.ProductCategoryRepository
import com.example.demo.repository.ProductRepository
import com.example.demo.specification.ProductSpec
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class ProductService constructor(
    val productRepository: ProductRepository,
    val productSpecifications : ProductSpec,
    val productConverter: ProductConverter,
    val productCategoryRepository: ProductCategoryRepository, )

{
    fun getAllProducts(productQuery: ProductQuery): Page<ProductEntity> {
        val pageable: Pageable = PageRequest.of(productQuery.page, productQuery.size, Sort.by(Sort.Direction.DESC, "id"))
        return productRepository.findAll(productSpecifications.productFilter(productQuery), pageable)
    }

    fun getProductById(id: Int): ProductEntity {
        return productRepository.findById(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with id: $id") }
    }

    fun addProduct(product: ProductRequest): ProductResponse {
        val newProduct = ProductEntity(
            name = product.name,
            price = product.price,
            description = product.description,
            quantity = product.quantity,
            image = product.image
        )
        val newProductEntity = productRepository.save(newProduct)
        product.categories?.forEach { categoryId ->
            val category = CategoryEntity(id = categoryId)
            val productCategory = ProductCategoryEntity(product = newProductEntity, category = category)
            productCategoryRepository.save(productCategory)
        }
        return productConverter.entityToResponse(newProductEntity)
    }

    fun deleteProduct(id : Int) {
        if (productRepository.existsById(id))
            productRepository.deleteById(id)
    }

    fun updateProduct(id : Int, product: ProductRequest): ProductResponse {
        val updateProduct = getProductById(id)
        updateProduct.apply {
            name = product.name
            price = product.price
            description = product.description
            quantity = product.quantity
            image = product.image
        }
        val updateProductEntity = productRepository.save(updateProduct)
        val oldProductEntity = productCategoryRepository.findByProduct(updateProductEntity)
        productCategoryRepository.deleteAll(oldProductEntity)
        product.categories?.forEach { categoryId ->
            val category = CategoryEntity(id = categoryId)
            val productCategory = ProductCategoryEntity(product = updateProductEntity, category = category)
            productCategoryRepository.save(productCategory)
        }
        return productConverter.entityToResponse(updateProductEntity)
    }

}