package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.models.CastMember;
import com.mediawrangler.media_wrangler.models.CrewMember;
import com.mediawrangler.media_wrangler.models.Movie;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;

@Service
public class MovieDataFetcher {

    private static final String API_READ_ACCESS_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGY4N2NjNmIxZTZhMzQyMThjNjdjYWM1NGMwYzE0ZiIsIm5iZiI6MTczNDE5MTM5MS43NzcsInN1YiI6IjY3NWRhOTFmZjFiZjk2ZGMyNDc4MTA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4trA-9bv10lqcfQyhPxFTeKRWMyyPjIhgM_3Vri9Y6Y";

    // overloaded method to fetch movie data by movie title (String)
    public static Movie fetchMovieData(String movieTitle) {
        OkHttpClient client = new OkHttpClient();

        // search for the movie ID using the movie title
        int movieId = searchMovieIdByTitle(client, movieTitle);
        if (movieId == -1) {
            System.out.println("Movie not found.");
            return null;
        }

        // fetch movie details using movieId
        return fetchMovieDetails(client, movieId);
    }

    // Overloaded method to fetch movie data by movie ID (int)
    public static Movie fetchMovieData(int movieId) {
        OkHttpClient client = new OkHttpClient();

        // fetch movie details using movieId
        return fetchMovieDetails(client, movieId);
    }

    // returns array of movie objects from search
    public static ArrayList<Movie> movieSearch(String searchString) {
        OkHttpClient client = new OkHttpClient();
        ArrayList<Movie> movieArrayList = new ArrayList<>();

        for (int i = 1; i < 6; i++) {
            String apiUrl = "https://api.themoviedb.org/3/search/movie?" + "query=" + searchString + "&include_adult=false&language=en-US&page=" + i;

            Request request = new Request.Builder()
                    .url(apiUrl)
                    .header("Authorization", "Bearer " + API_READ_ACCESS_KEY)
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    System.out.println("Request failed with status: " + response.code());
                    return null;
                }

                // parse response and transform into array
                String responseBody = response.body().string();
                JSONObject jsonResponse = new JSONObject(responseBody);
                JSONArray results = jsonResponse.getJSONArray("results");

                // extract details for each movie
                for (int j = 0; j < results.length(); j++) {
                    JSONObject movieJson = results.getJSONObject(j);

                    // Extract the required fields for the Movie object
                    int id = movieJson.getInt("id");
                    String title = movieJson.getString("title");
                    String releaseDate = movieJson.optString("release_date", "");
                    double rating = movieJson.optDouble("vote_average", 0.0);
                    String overview = movieJson.optString("overview", "");
                    String posterPath = movieJson.optString("poster_path", null);

                    //cast and crew data not currently needed for search
                    ArrayList<CastMember> cast = null;
                    ArrayList<CrewMember> crew = null;
                    ArrayList<String> genres = null;


                    Movie movie = new Movie(id, title, releaseDate, rating, overview, posterPath, cast, crew, genres);

                    movieArrayList.add(movie);
                }

            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }


        return movieArrayList;
    }

    // returns array of movies where searched person was involved
    public static ArrayList<Movie> personSearch(String searchString) {
        OkHttpClient client = new OkHttpClient();
        ArrayList<Movie> movieArrayList = new ArrayList<>();
        int personId = 0;

        // fetches person id
        String idFetchUrl = "https://api.themoviedb.org/3/search/person?query=" + searchString + "&include_adult=false&language=en-US&page=1";
        Request idRequest = new Request.Builder()
                .url(idFetchUrl)
                .header("Authorization", "Bearer " + API_READ_ACCESS_KEY)
                .build();

        try (Response response = client.newCall(idRequest).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("Search request failed with status: " + response.code());
            }

            // parse search results
            String responseBody = response.body().string();
            JSONObject jsonResponse = new JSONObject(responseBody);

            // check if the result contains movies
            JSONArray results = jsonResponse.getJSONArray("results");
            if (results.length() > 0) {
                // Return the ID of the first movie found
                personId = results.getJSONObject(0).getInt("id");
            } else {
                System.out.println("No cast found with that name.");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }



        for (int i = 1; i < 6; i++) {
            String movieFetchUrl = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page="
                    + i
                    + "&sort_by=popularity.desc&with_people="
                    + personId;

            Request movieRequest = new Request.Builder()
                    .url(movieFetchUrl)
                    .header("Authorization", "Bearer " + API_READ_ACCESS_KEY)
                    .build();

            try (Response response = client.newCall(movieRequest).execute()) {
                if (!response.isSuccessful()) {
                    System.out.println("Request failed with status: " + response.code());
                    return null;
                }

                // parse response and transform into array
                String responseBody = response.body().string();
                JSONObject jsonResponse = new JSONObject(responseBody);
                JSONArray results = jsonResponse.getJSONArray("results");

                // extract details for each movie
                for (int j = 0; j < results.length(); j++) {
                    JSONObject movieJson = results.getJSONObject(j);

                    // Extract the required fields for the Movie object
                    int id = movieJson.getInt("id");
                    String title = movieJson.getString("title");
                    String releaseDate = movieJson.getString("release_date");
                    double rating = movieJson.getDouble("vote_average");
                    String overview = movieJson.getString("overview");
                    String posterPath = movieJson.optString("poster_path", null);

                    //cast, crew, and genre data not currently needed for search
                    ArrayList<CastMember> cast = null;
                    ArrayList<CrewMember> crew = null;
                    ArrayList<String> genres = null;


                    Movie movie = new Movie(id, title, releaseDate, rating, overview, posterPath, cast, crew, genres);

                    movieArrayList.add(movie);
                }

            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        return movieArrayList;
    }

    // searches for a movie ID by title
    private static int searchMovieIdByTitle(OkHttpClient client, String title) {
        String apiUrl = "https://api.themoviedb.org/3/search/movie?" + "query=" + title + "&language=en-US";

        Request request = new Request.Builder()
                .url(apiUrl)
                .header("Authorization", "Bearer " + API_READ_ACCESS_KEY)
                .build();

        // sends http request to server and receieves response
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("Search request failed with status: " + response.code());
                return -1;
            }

            // parse search results
            String responseBody = response.body().string();
            JSONObject jsonResponse = new JSONObject(responseBody);

            // check if the result contains movies
            JSONArray results = jsonResponse.getJSONArray("results");
            if (results.length() > 0) {
                // Return the ID of the first movie found
                return results.getJSONObject(0).getInt("id");
            } else {
                System.out.println("No movies found with that title.");
                return -1;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    // fetches movie details by ID
    private static Movie fetchMovieDetails(OkHttpClient client, int movieId) {
        String apiUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?&language=en-US" + "&append_to_response=credits%2C%20genres" ;

        Request request = new Request.Builder()
                .url(apiUrl)
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization","Bearer " + API_READ_ACCESS_KEY)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("Request failed with status: " + response.code());
                return null;
            }

            // parse the movie details response
            String responseBody = response.body().string();
            JSONObject jsonResponse = new JSONObject(responseBody);
            JSONArray castArray = jsonResponse.getJSONObject("credits").getJSONArray("cast");
            JSONArray crewArray = jsonResponse.getJSONObject("credits").getJSONArray("crew");
            JSONArray genreArray = jsonResponse.getJSONArray("genres");

            // cast and crew and genre arrays
            ArrayList<CastMember> castMembers = new ArrayList<>();
            ArrayList<CrewMember> crewMembers = new ArrayList<>();
            ArrayList<String> genres = new ArrayList<>();

            // Extract movie data
            String title = jsonResponse.getString("title");
            String releaseDate = jsonResponse.getString("release_date");
            double rating = jsonResponse.getDouble("vote_average");
            String overview = jsonResponse.getString("overview");
            String posterPath = jsonResponse.getString("poster_path");

            // iterate through cast
            for (int i = 0; i < castArray.length(); i++) {
                JSONObject castMemberObject = castArray.getJSONObject(i);
                int id = castMemberObject.getInt("id");
                String name = castMemberObject.getString("name");
                String character = castMemberObject.getString("character");

                // Add the cast member to the list
                castMembers.add(new CastMember(id, name, character));
            }

            for (int i = 0; i < crewArray.length(); i++) {
                JSONObject crewMemberObject = crewArray.getJSONObject(i);
                int id = crewMemberObject.getInt("id");
                String name = crewMemberObject.getString("name");
                String department = crewMemberObject.getString("department");
                String job = crewMemberObject.getString("job");

                // Add the crew member to the list
                crewMembers.add(new CrewMember(id, name, department, job));
            }

            for (int i = 0; i < genreArray.length(); i++) {
                JSONObject genreObject = genreArray.getJSONObject(i);
                String name = genreObject.getString("name");

                // Add the genre to the list
                genres.add(name);
            }

            // return Movie object with data
            return new Movie(movieId, title, releaseDate, rating, overview, posterPath, castMembers, crewMembers, genres);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static ArrayList<Movie> fetchDiscoverList(String genres, String afterYear, String beforeYear) {
        OkHttpClient client = new OkHttpClient();
        ArrayList<Movie> movieArrayList = new ArrayList<>();

        String beforeYearQuery = "";
        String afterYearQuery = "";

        if (!Objects.equals(afterYear, "")) {
            afterYearQuery = "&primary_release_date.gte=" + afterYear + "-12-31";
        }

        if (!Objects.equals(beforeYear, "")) {
            beforeYearQuery = "&primary_release_date.lte=" + beforeYear + "-01-01";
        }

        for (int i = 1; i < 6; i++) {
            String apiUrl = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=" + i
                    + "&sort_by=popularity.desc&with_genres=" + genres + beforeYearQuery + afterYearQuery;

            Request request = new Request.Builder()
                    .url(apiUrl)
                    .header("Authorization", "Bearer " + API_READ_ACCESS_KEY)
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    System.out.println("Request failed with status: " + response.code());
                    return null;
                }

                // parse response and transform into array
                String responseBody = response.body().string();
                JSONObject jsonResponse = new JSONObject(responseBody);
                JSONArray results = jsonResponse.getJSONArray("results");

                // extract details for each movie
                for (int j = 0; j < results.length(); j++) {
                    JSONObject movieJson = results.getJSONObject(j);

                    // Extract the required fields for the Movie object
                    int id = movieJson.getInt("id");
                    String title = movieJson.getString("title");
                    String releaseDate = movieJson.getString("release_date");
                    double rating = movieJson.getDouble("vote_average");
                    String overview = movieJson.getString("overview");
                    String posterPath = movieJson.optString("poster_path", null);

                    //cast and crew data not currently needed for search
                    ArrayList<CastMember> cast = null;
                    ArrayList<CrewMember> crew = null;
                    ArrayList<String> genreList = null;


                    Movie movie = new Movie(id, title, releaseDate, rating, overview, posterPath, cast, crew, genreList);

                    movieArrayList.add(movie);
                }

            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }


        return movieArrayList;
    }

    public String fetchWatchProviders(int movieId) {
        String url = "https://api.themoviedb.org/3/movie/" + movieId + "/watch/providers";
        System.out.println("URL: " + url);

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer " + API_READ_ACCESS_KEY)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("Provider Request failed with status: " + response.code());
                return null;
            }

            return response.body().string();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public ArrayList<Movie>  fetchPopularMovies() {
        OkHttpClient client = new OkHttpClient();
        ArrayList<Movie> popularMovieArrayList = new ArrayList<>();
        System.out.println("Fetching popular movies...");

        Request request = new Request.Builder()
                .url("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1")
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer " + API_READ_ACCESS_KEY)
                .build();

        try (Response response = client.newCall(request).execute()) {
            System.out.println(response.body());
            if (!response.isSuccessful()) {
                System.out.println("Provider Request failed with status: " + response.code());
                return null;
            }

            String responseBody = response.body().string();
            System.out.println("TMDb Response: " + responseBody);

            JSONObject jsonResponse = new JSONObject(responseBody);
            JSONArray results = jsonResponse.getJSONArray("results");

            // extract details for each movie
            for (int j = 0; j < results.length(); j++) {
                JSONObject movieJson = results.getJSONObject(j);

                // Extract the required fields for the Movie object
                int id = movieJson.getInt("id");
                String title = movieJson.getString("title");
                String releaseDate = movieJson.getString("release_date");
                double rating = movieJson.getDouble("vote_average");
                String overview = movieJson.getString("overview");
                String posterPath = movieJson.optString("poster_path", null);

                //cast and crew data not currently needed for search
                ArrayList<CastMember> cast = null;
                ArrayList<CrewMember> crew = null;
                ArrayList<String> genres = null;


                Movie movie = new Movie(id, title, releaseDate, rating, overview, posterPath, cast, crew, genres);

                popularMovieArrayList.add(movie);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        System.out.println("I'm here");
        return popularMovieArrayList;
    }
}