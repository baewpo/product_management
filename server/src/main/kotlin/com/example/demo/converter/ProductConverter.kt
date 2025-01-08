package com.example.demo.converter

import com.example.demo.model.product.ProductEntity
import com.example.demo.model.product.ProductResponse
import org.springframework.stereotype.Component

@Component
class ProductConverter {
    fun entityToResponse(productEntity: ProductEntity): ProductResponse {
        return ProductResponse(
            id = productEntity.id,
            name = productEntity.name,
            image =  productEntity.image,
            description = productEntity.description,
            price = productEntity.price,
            quantity = productEntity.quantity,
            category = buildList {
                for (c in productEntity.categories)
                    add(c.category)
            }
        )
    }
}