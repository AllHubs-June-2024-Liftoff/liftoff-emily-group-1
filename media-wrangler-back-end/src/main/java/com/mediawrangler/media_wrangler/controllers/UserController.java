package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.Exception.UserNotFound;
import com.mediawrangler.media_wrangler.dto.LoginRequest;
import com.mediawrangler.media_wrangler.dto.UserDTO;
import com.mediawrangler.media_wrangler.Exception.UserNotFoundException;
import com.mediawrangler.media_wrangler.models.User;
import com.mediawrangler.media_wrangler.services.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import com.mediawrangler.media_wrangler.data.UserRepository;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, Errors errors) {

        if (errors.hasErrors()) {
            Map<String, String> validationErrors = new HashMap<>();
            errors.getFieldErrors().forEach(error ->
                    validationErrors.put(error.getField(), error.getDefaultMessage())
            );
            return new ResponseEntity<>(validationErrors, HttpStatus.BAD_REQUEST);
        }

        try {
            userService.saveUser(user);
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            if (userRepository.existsByUsername(user.getUsername())) {
                return new ResponseEntity<>(Map.of("username", "Username is already taken"), HttpStatus.BAD_REQUEST);
            } else if (userRepository.existsByEmail(user.getEmail())) {
                return new ResponseEntity<>(Map.of("email", "Email is already registered"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(Map.of("error", "An unexpected error occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

        if (isAuthenticated) {
            User user = userRepository.findByUsername(loginRequest.getUsername());
            session.setAttribute("user", user.getId());
            System.out.println("User ID stored in session during login: " + user.getId());
            session.setMaxInactiveInterval(30 * 60);
            response.put("success", true);
            response.put("message", "Login successful!");
            response.put("user", user);
            return ResponseEntity.ok(response);
        }
        response.put("success", false);
        response.put("message", "Invalid username or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);

    }

    @GetMapping("/info")
    public ResponseEntity<?> loginUser( HttpSession session) {
        System.out.println(session.getAttribute("user"));
        int userId = (int) session.getAttribute("user");
        User user = userRepository.getById(userId);

        return new ResponseEntity<>("User: " + user.getEmail(), HttpStatus.OK);
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable int userId, HttpSession session) {
        Object sessionUserId = session.getAttribute("user");
        if (sessionUserId == null || (int) sessionUserId != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized access to this profile");
        }
        return userRepository.findById(userId)
                .map(user -> ResponseEntity.ok(new UserDTO(user)))
                .orElse(ResponseEntity.notFound().build());
    }
  
    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateUserProfile(@PathVariable int userId, @Valid @RequestBody UserDTO userDTO, HttpSession session) {
        Object loggedInUserId = session.getAttribute("user");
        System.out.println("Session user ID: " + session.getAttribute("user"));
        System.out.println("Request user ID: " + userId);
        System.out.println("Updating user data: " + userDTO);
        if (loggedInUserId == null || (int) loggedInUserId != userId) {
            System.out.println("Access denied. Session user ID does not match URL user ID.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized access to this profile");
        }

        try {
            User updatedUser = userService.updateUser(userId, userDTO);
            return ResponseEntity.ok(new UserDTO(updatedUser));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/profile/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId, HttpSession session) {
        Object sessionUserId = session.getAttribute("user");

        if (sessionUserId == null || (int) sessionUserId != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized access to delete this profile");
        }

        if (!userRepository.existsById(userId)) {
            throw new UserNotFound(userId);
        }

        userRepository.deleteById(userId);
        return ResponseEntity.ok("User with id " + userId + " has been deleted");
    }
  
    @GetMapping("/session-status")
    public ResponseEntity<?> checkSession(HttpSession session) {
        Object userId = session.getAttribute("user");
        System.out.println("Session check: user ID = " + userId);
        if (userId != null) {
            return ResponseEntity.ok(Map.of("sessionValid", true, "userId", userId));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("sessionValid", false, "message", "Session invalid or expired"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }

}