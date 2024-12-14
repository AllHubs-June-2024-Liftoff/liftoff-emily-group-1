package com.mediawrangler.media_wrangler.data;

import models.Rating;
import org.springframework.data.repository.CrudRepository;

public interface RatingRepository extends CrudRepository <Rating, Integer> {
}
