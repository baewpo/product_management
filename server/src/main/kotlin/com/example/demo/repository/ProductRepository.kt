package com.example.demo.repository

import com.example.demo.model.product.ProductEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : JpaRepository<ProductEntity, Int>, JpaSpecificationExecutor<ProductEntity> {
//    fun findAllByNameContainingIgnoreCase(name: String, pageable: Pageable): Page<ProductEntity>
}