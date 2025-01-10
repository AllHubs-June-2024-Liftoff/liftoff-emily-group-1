package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.dto.MovieStreamingProviderDTO;
import com.mediawrangler.media_wrangler.models.Movie;
import com.mediawrangler.media_wrangler.services.MovieDataFetcher;
import com.mediawrangler.media_wrangler.services.MovieProcessingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private final MovieDataFetcher movieDataFetcher;
    private final MovieProcessingService movieProcessingService;

    public MovieController(MovieDataFetcher movieDataFetcher, MovieProcessingService movieProcessingService) {
        this.movieDataFetcher = movieDataFetcher;
        this.movieProcessingService = movieProcessingService;
    }

    @GetMapping("/search")
    public Movie getMovieByTitle(@RequestParam String title) {
        System.out.println("Received request to fetch movie: " + title);
        return movieDataFetcher.fetchMovieData(title);
    }

   @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable int id) {
        System.out.println("Received request to fetch movie: " + id);
        return movieDataFetcher.fetchMovieData(id);
    }

    @GetMapping("/streaming/{movieId}")
    public MovieStreamingProviderDTO getWatchProviders(@PathVariable int movieId) {
        System.out.println("HERE!!!");
        String jsonData = movieDataFetcher.fetchWatchProviders(movieId);
        return movieProcessingService.processMovieData(jsonData);
    }
}
