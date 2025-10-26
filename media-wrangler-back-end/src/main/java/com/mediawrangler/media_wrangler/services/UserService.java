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
              <body style="margin:0; padding:0; background-color: #f9f4e8; font-family: Georgia, 'Times New Roman', serif; color: #3b2f2f;">
                <div style="max-width:600px; margin:30px auto; padding:20px; border:3px solid #8b5a2b; border-radius:8px; background-color:#fffaf0;  background-size: cover;">
                  
                  <h2 style="text-align:center; color:#8b4513; font-size:28px; margin-bottom:10px; text-transform:uppercase; letter-spacing: 2px; font-weight:bold;">
                    🤠 Welcome to Media Wrangler!
                  </h2>
                  
                  <p style="font-size:16px; line-height:1.6;">
                    Howdy <strong>%s</strong>,
                  </p>
                  
                  <p style="font-size:16px; line-height:1.6;">
                    We're mighty pleased to have you join our campfire of movie lovers! Before you saddle up and ride into your dashboard, we just need to confirm that this here email belongs to you.
                  </p>
                  
                  <div style="text-align:center; margin:25px 0;">
                    <a href="%s" rel="nofollow"
                      style="padding:12px 25px; font-size:18px; background-color:#8b4513; color:#fff8dc; text-decoration:none; border-radius:6px; border:2px solid #5e3410; display:inline-block; font-weight:bold; text-transform:uppercase;">
                      Verify Email
                    </a>
                  </div>
                  
                  <p style="font-size:15px; line-height:1.6;">
                    If you didn’t hitch your wagon to Media Wrangler, no worries — you can ignore this email and ride off into the sunset.
                  </p>
                  
                  <p style="font-size:15px; line-height:1.6;">
                    Happy Trails,<br>
                    <strong>The Media Wrangler Crew</strong>
                  </p>
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

