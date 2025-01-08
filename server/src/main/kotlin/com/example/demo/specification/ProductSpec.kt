package com.example.demo.specification
import com.example.demo.model.category.CategoryEntity
import com.example.demo.model.product.ProductEntity
import com.example.demo.model.product.ProductQuery
import com.example.demo.model.productcategory.ProductCategoryEntity
import jakarta.persistence.criteria.Predicate
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Component

@Component
class ProductSpec {
    fun productFilter(product: ProductQuery): Specification<ProductEntity> {
        return Specification { root, query, cb ->
            val name = product.name
            val priceMin = product.priceMin
            val priceMax = product.priceMax
            val stock = product.stock
            val categories = product.categories
            val conditions = arrayListOf<Predicate>()
            if (!name.isNullOrBlank()) {
                conditions.add(cb.like(cb.lower(root.get("name")), name.toLowerCase() + "%"))
            }
            if (priceMin != null && priceMax != null) {
                conditions.add(cb.between(root.get("price"), priceMin, priceMax))
            } else if (priceMin != null) {
                conditions.add(cb.greaterThanOrEqualTo(root.get("price"), priceMin))
            } else if (priceMax != null) {
                conditions.add(cb.lessThanOrEqualTo(root.get("price"), priceMax))
            }
            if (stock) {
                conditions.add(cb.greaterThan(root.get("quantity"), 0))
            }
            if (categories != null && categories.isNotEmpty()) {
                    conditions.add(root.get<ProductCategoryEntity>("categories")
                        .get<CategoryEntity>("category")
                        .get<Int>("id")
                        .`in`(categories))
            }
            query.distinct(true);
            cb.and(*conditions.toTypedArray())
        }
    }
}
