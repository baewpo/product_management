package com.example.demo.model.user

import jakarta.persistence.*

@Entity
@Table(name = "user", schema = "product")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0,

    @Column(name = "username")
    var username: String = "",

    @Column(name = "password")
    var password: String = "",

    @Column(name = "role")
    var role: String = "user",
) {
    fun toResponse(): UserResponse {
        return UserResponse(id = this.id, username = this.username, role = this.role)
    }
}