package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.models.Movie;
import org.json.JSONArray;
import org.json.JSONObject;

public class MovieProcessingService {

    public static Movie processMovieData(int movieId, String rawJson) {
        if (rawJson == null || rawJson.isEmpty()) {
            System.out.println("No data to process");
            return null;
        }

        try {
            JSONObject jsonResponse = new JSONObject(rawJson);

            JSONObject usProviders = jsonResponse.getJSONObject("results").getJSONObject("US");

            Movie movie = new Movie(movieId, "Sample movie");

            JSONArray buyArray = usProviders.optJSONArray("buy");
            if (buyArray != null) {
                for (int i = 0; i < buyArray.length(); i++) {
                    JSONObject provider = buyArray.getJSONObject(i);
                    movie.addBuyProvider(provider.getString("provider_name"));
                }
            }

            JSONArray flatrateArray = usProviders.optJSONArray("flatrate");
            if (flatrateArray != null) {
                for (int i = 0; i < flatrateArray.length(); i++) {
                    JSONObject provier = flatrateArray.getJSONObject(i);
                    movie.addFlatrateProvider(provier.getString("provider_name"));
                }
            }

            JSONArray rentArray = usProviders.optJSONArray("rent");
            if (rentArray != null) {
                for (int i = 0; i < rentArray.length(); i++) {
                    JSONObject provider = rentArray.getJSONObject(i);
                    movie.addRentProvider(provider.getString("provider_name"));
                }
            }

            return movie;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
