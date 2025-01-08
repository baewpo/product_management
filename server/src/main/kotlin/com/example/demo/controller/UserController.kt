package com.example.demo.controller

import com.example.demo.model.user.UserRequest
import com.example.demo.model.user.UserResponse
import com.example.demo.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.security.MessageDigest


@RestController
class UserController(val userRepository: UserRepository) {

    @PostMapping("/login")
    fun login(@RequestBody request: UserRequest): UserResponse {
        val user = userRepository.findByUsername(request.username)
            .orElseThrow { ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials") }

        val md = MessageDigest.getInstance("SHA-256")
        val bytes = md.digest(request.password.toByteArray())
        val encodedPassword = bytes.joinToString("") { "%02x".format(it) }

        return if (encodedPassword == user.password) {
            user.toResponse()
        } else {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials")
        }
    }

}
