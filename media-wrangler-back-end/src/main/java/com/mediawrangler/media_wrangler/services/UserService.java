package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.Exception.UserNotFoundException;
import com.mediawrangler.media_wrangler.dto.UserDTO;


import com.mediawrangler.media_wrangler.models.User;
import com.mediawrangler.media_wrangler.data.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.UUID;

import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {

        String token = UUID.randomUUID().toString();
        LocalDateTime expirationDate = LocalDateTime.now().plusHours(24);

        user.setVerificationToken(token);
        user.setTokenExpirationDate(expirationDate);

        user.setBio("");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        sendVerificationEmail(user);
        return userRepository.save(user);
    }

    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }



    public String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setTokenExpirationDate(LocalDateTime.now().plusHours(24));
        userRepository.save(user);
        return token;
    }


    public void sendVerificationEmail(User user) {

        String verificationUrl = "http://localhost:5173/verify?token=" + user.getVerificationToken();

        String subject = "Verify Your Email Address";
        String htmlContent = """
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #ADD9F4;">
                        <h2 style="text-align: center; color: #9E5231;">Welcome to Media Wrangler!</h2>
                        <p>Hi <strong>%s</strong>,</p>
                        <p>Thank you for registering with us. Please click the link below to verify your email address:</p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="%s" rel="nofollow" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: black; background-color: #9E5231; text-decoration: none; border-radius: 5px;">Verify Email</a>
                        </div>
                        <p>If you did not sign up for Media Wrangler, you can safely ignore this email.</p>
                        <p>Best regards,<br>Media Wrangler Team</p>
                    </div>
                </body>
            </html>
            """.formatted(user.getFirstname(), verificationUrl);

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setTo(user.getEmail());
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            helper.setFrom("mediawrangler.contact@gmail.com");
            helper.setReplyTo("no-reply@mediawrangler.com");

            mailSender.send(mimeMessage);
            System.out.println("Verification email sent successfully to: " + user.getEmail());
        } catch (Exception e) {
            System.err.println("Failed to send email to: " + user.getEmail() + " -> " + e.getMessage());
        }
    }

    @Transactional
    public boolean verifyEmailToken(String token) {
        int updated = userRepository.verifyByToken(token, LocalDateTime.now());
        if (updated == 1) {
            return true;
        }
        return false;
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

