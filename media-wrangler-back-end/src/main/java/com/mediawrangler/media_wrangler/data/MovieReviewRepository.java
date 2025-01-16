package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.MovieReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieReviewRepository extends JpaRepository<MovieReview, Long> {

}
