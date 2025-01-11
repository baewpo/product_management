package com.example.demo.repository

import com.example.demo.model.user.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : JpaRepository<UserEntity, Int> {

    fun findByUsername(username: String): Optional<UserEntity>
}