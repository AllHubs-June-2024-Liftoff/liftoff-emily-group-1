package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.MovieReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieReviewRepository extends JpaRepository<MovieReview, Long> {
    List<MovieReview> findByUserId(int userId);
}
