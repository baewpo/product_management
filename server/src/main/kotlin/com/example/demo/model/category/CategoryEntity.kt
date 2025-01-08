package com.example.demo.model.category

import com.example.demo.model.productcategory.ProductCategoryEntity
import com.fasterxml.jackson.annotation.JsonIgnore

import jakarta.persistence.*
import lombok.EqualsAndHashCode
import org.apache.commons.lang3.builder.ToStringExclude

@Entity
@Table(name = "category")
data class CategoryEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0,
    @Column(name = "name")
    var name: String = "",

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category", cascade = [CascadeType.ALL])
    @EqualsAndHashCode.Exclude
    @ToStringExclude
    @JsonIgnore
    var product: MutableList<ProductCategoryEntity> = ArrayList()
)