package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.models.Movie;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

@Service
public class StreamingServiceFetcher {

    private static final String API_READ_ACCESS_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGY4N2NjNmIxZTZhMzQyMThjNjdjYWM1NGMwYzE0ZiIsIm5iZiI6MTczNDE5MTM5MS43NzcsInN1YiI6IjY3NWRhOTFmZjFiZjk2ZGMyNDc4MTA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4trA-9bv10lqcfQyhPxFTeKRWMyyPjIhgM_3Vri9Y6Y";


    private static Movie fetchingWatchProviders(int movieId) {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://api.themoviedb.org/3/movie/movie_id/watch/providers")
                .get()
                .addHeader("accept", "application/json")
                .build();

        Response response = client.newCall(request).execute();
    }
}
