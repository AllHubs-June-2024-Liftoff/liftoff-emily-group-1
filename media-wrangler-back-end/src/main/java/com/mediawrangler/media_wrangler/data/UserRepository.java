package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.time.LocalDateTime;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    User findByUsername(String username);

    @Modifying
    @Query(""" 
            update User u set u.emailVerified = true, u.verificationToken = null where u.verificationToken = :token and (u.tokenExpirationDate is null or u.tokenExpirationDate >= :now)
            """)
    int verifyByToken(@Param("token") String token, @Param("now") LocalDateTime now);


}

