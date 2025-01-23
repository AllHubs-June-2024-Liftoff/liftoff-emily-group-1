package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
