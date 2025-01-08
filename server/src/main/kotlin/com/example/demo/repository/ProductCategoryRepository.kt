package com.example.demo.repository

import com.example.demo.model.product.ProductEntity
import com.example.demo.model.productcategory.ProductCategoryEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductCategoryRepository  : JpaRepository<ProductCategoryEntity, Int> {
    fun findByProduct(product: ProductEntity): List<ProductCategoryEntity>

}