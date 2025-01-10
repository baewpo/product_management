package com.example.demo.model.product

import com.example.demo.model.productcategory.ProductCategoryEntity
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "product", schema = "product")
data class ProductEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @Column(name = "name", nullable = false, length = 50)
    var name: String = "",

    @Column(name = "price", nullable = false)
    var price: Double = 0.0,

    @Column(name = "description", nullable = false, length = 400)
    var description: String = "",

    @Column(name = "quantity", nullable = false)
    var quantity: Int = 0,

    @Column(name = "image", nullable = false, length = 300)
    var image: String = "",

    @Column(name = "created_at", nullable = false, columnDefinition = "timestamptz default now()")
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz default now()")
    val updatedAt: LocalDateTime = LocalDateTime.now(),

    @JsonIgnore
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    var productCategories: List<ProductCategoryEntity> = listOf()
) {
    fun toResponse(): ProductResponse {
        return ProductResponse(
            id = this.id,
            name = this.name,
            price = this.price,
            description = this.description,
            quantity = this.quantity,
            image = this.image,
            category = this.productCategories.map { it.category.toResponse() },
            createdAt = this.createdAt,
            updatedAt = this.updatedAt
        )
    }
}
