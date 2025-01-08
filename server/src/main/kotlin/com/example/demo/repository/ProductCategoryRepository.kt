package com.example.demo.repository

import com.example.demo.model.productcategory.ProductCategoryEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductCategoryRepository : JpaRepository<ProductCategoryEntity, Int> {

    fun deleteAllByProductId(productId: Int)

}