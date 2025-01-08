package com.example.demo

import java.util.Locale
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.LocaleResolver
import org.springframework.web.servlet.i18n.SessionLocaleResolver

@SpringBootApplication
@EnableAutoConfiguration
class DemoApplication {
	@Bean
	fun localeResolver(): LocaleResolver {
		val sessionLocaleResolver: SessionLocaleResolver = SessionLocaleResolver()
		sessionLocaleResolver.setDefaultLocale(Locale.US)
		return sessionLocaleResolver
	}
}

fun main(args: Array<String>) {
	runApplication<DemoApplication>(*args)
}
