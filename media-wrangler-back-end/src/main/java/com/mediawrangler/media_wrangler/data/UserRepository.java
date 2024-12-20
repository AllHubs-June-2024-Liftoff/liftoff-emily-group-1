package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
