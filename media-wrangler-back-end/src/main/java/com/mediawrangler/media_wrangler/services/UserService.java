package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.Exception.UserNotFoundException;
import com.mediawrangler.media_wrangler.dto.UserDTO;


import com.mediawrangler.media_wrangler.models.User;
import com.mediawrangler.media_wrangler.data.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {
        user.setBio("");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }

    public User updateUser(int userId, UserDTO userDTO) throws UserNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (userDTO.getFirstname() != null) user.setFirstname(userDTO.getFirstname());
        if (userDTO.getLastname() != null) user.setLastname(userDTO.getLastname());
        if (userDTO.getEmail() != null) user.setEmail(userDTO.getEmail());
        if (userDTO.getUsername() != null) user.setUsername(userDTO.getUsername());
        if (userDTO.getBio() != null) user.setBio(userDTO.getBio());

        return userRepository.save(user);
    }
}

