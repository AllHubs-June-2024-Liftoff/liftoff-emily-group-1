package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieReviewService {

    @Autowired
    private final MovieReviewRepository movieReviewRepository;



    public MovieReviewService(MovieReviewRepository movieReviewRepository, UserRepository userRepository) {
        this.movieReviewRepository = movieReviewRepository;

    }


    public MovieReview saveReview(MovieReview movieReview) {
        return movieReviewRepository.save(movieReview);
    }


    public Optional<MovieReview> findReviewById(Long id){
        return movieReviewRepository.findById(id);
    }

}



