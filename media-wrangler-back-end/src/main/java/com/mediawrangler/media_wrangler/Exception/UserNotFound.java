package com.mediawrangler.media_wrangler.Exception;

public class UserNotFound extends RuntimeException {
    public UserNotFound(int id) {
        super("Could not find user with id " + id);
    }
}
