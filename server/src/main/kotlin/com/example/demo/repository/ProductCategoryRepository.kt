package com.example.demo.repository

import com.example.demo.model.product.ProductEntity
import com.example.demo.model.productcategory.ProductCategoryEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductCategoryRepository : JpaRepository<ProductCategoryEntity, Int> {

    @Modifying
    @Query("DELETE FROM ProductCategoryEntity pc WHERE pc.product.id = :id")
    fun deleteByProductId(id: Int)
}