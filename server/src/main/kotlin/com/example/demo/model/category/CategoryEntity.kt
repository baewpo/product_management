package com.example.demo.model.category

import com.example.demo.model.productcategory.ProductCategoryEntity
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name = "category", schema = "product")
data class CategoryEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0,

    @Column(name = "name")
    var name: String = "",

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category", cascade = [CascadeType.ALL])
    @JsonIgnore
    var product: List<ProductCategoryEntity> = listOf()
) {
    fun toResponse(): CategoryResponse {
        return CategoryResponse(id = this.id, name = this.name)
    }
}