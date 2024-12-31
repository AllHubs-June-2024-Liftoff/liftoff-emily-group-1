package com.mediawrangler.media_wrangler.services;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailTestService {

    private final JavaMailSender mailSender;

    public EmailTestService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendTestEmail() {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setTo("cardera1842@gmail.com");
            helper.setSubject("Test Email");
            helper.setText("This is a test email.", false);
            helper.setFrom("mediawrangler.contact@gmail.com");
            mailSender.send(mimeMessage);
            System.out.println("Test email sent successfully.");
        } catch (Exception e) {
            System.err.println("Failed to send test email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
