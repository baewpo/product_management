package com.example.demo.model.productcategory

import com.example.demo.model.category.CategoryEntity
import com.example.demo.model.product.ProductEntity
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name = "product_category")
data class ProductCategoryEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0,
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", foreignKey = ForeignKey(name = "fk_product_id"))
    var product: ProductEntity = ProductEntity(),
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", foreignKey = ForeignKey(name = "fk_category_id"))
    var category: CategoryEntity = CategoryEntity(),
)
