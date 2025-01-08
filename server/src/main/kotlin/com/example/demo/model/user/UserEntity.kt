package com.example.demo.model.user

import jakarta.persistence.*

@Entity
@Table(name = "user")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var Id: Int = 0,
    @Column(name = "username")
    var username: String = "",
    @Column(name = "password")
    var password: String = "",
    @Column(name = "role")
    var role: String = "user",
)