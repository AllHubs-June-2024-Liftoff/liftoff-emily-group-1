package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.dto.MovieStreamingProviderDTO;
import com.mediawrangler.media_wrangler.dto.ProviderDTO;
import com.mediawrangler.media_wrangler.models.Movie;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class MovieProcessingService {

    private String providerBaseURL = "https://image.tmdb.org/t/p/";

    public MovieStreamingProviderDTO processMovieData(String rawJson) {
        if (rawJson == null || rawJson.isEmpty()) {
            System.out.println("No data to process");
            return null;
        }

        try {
            MovieStreamingProviderDTO movieStreamingProvider = new MovieStreamingProviderDTO();

            JSONObject jsonResponse = new JSONObject(rawJson);

            JSONObject usProviders = jsonResponse.getJSONObject("results").getJSONObject("US");

            JSONArray buyArray = usProviders.optJSONArray("buy");
            if (buyArray != null) {
                for (int i = 0; i < buyArray.length(); i++) {
                    JSONObject provider = buyArray.getJSONObject(i);
                    ProviderDTO providerDTO = new ProviderDTO(provider.getString("provider_name"), providerBaseURL + provider.getString("logo_path"));
                    movieStreamingProvider.addBuyProvider(providerDTO);
                }
            }

            JSONArray flatrateArray = usProviders.optJSONArray("flatrate");
            if (flatrateArray != null) {
                for (int i = 0; i < flatrateArray.length(); i++) {
                    JSONObject provider = flatrateArray.getJSONObject(i);
                    ProviderDTO providerDTO = new ProviderDTO(provider.getString("provider_name"), providerBaseURL + provider.getString("logo_path"));
                    movieStreamingProvider.addStreamingProvider(providerDTO);
                }
            }

            JSONArray rentArray = usProviders.optJSONArray("rent");
            if (rentArray != null) {
                for (int i = 0; i < rentArray.length(); i++) {
                    JSONObject provider = rentArray.getJSONObject(i);
                    ProviderDTO providerDTO = new ProviderDTO(provider.getString("provider_name"), providerBaseURL + provider.getString("logo_path"));
                    movieStreamingProvider.addRentProvider(providerDTO);
                }
            }

            return movieStreamingProvider;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
