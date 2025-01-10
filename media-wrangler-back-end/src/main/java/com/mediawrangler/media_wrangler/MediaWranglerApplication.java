package com.mediawrangler.media_wrangler;

import com.mediawrangler.media_wrangler.models.Movie;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import static com.mediawrangler.media_wrangler.services.MovieDataFetcher.fetchWatchProviders;

@SpringBootApplication
public class MediaWranglerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MediaWranglerApplication.class, args);
	}

		int movieId = 121;
		Movie movie = fetchWatchProviders(movieId);
}
