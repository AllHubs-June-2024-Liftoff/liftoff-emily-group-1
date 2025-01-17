package com.mediawrangler.media_wrangler.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Disable CSRF and configure CORS
        http.csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Set up CORS from custom configuration
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/users/register", "/users/login", "/", "/movies", "/reviews/create", "/api/movies/search").permitAll()  // Allow GET requests to API
                        .requestMatchers("/api/users/register", "/api/users/login").permitAll() // Allow register/login
                        .anyRequest().authenticated()  // Secure other requests
                );
        return http.build();
    }

    // configure CORS settings
    private CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:5173");
        corsConfig.addAllowedMethod("*");
        corsConfig.addAllowedHeader("*");
        corsConfig.setAllowCredentials(true);

        return request -> corsConfig;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // manual mapping if needed
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173") // Your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


