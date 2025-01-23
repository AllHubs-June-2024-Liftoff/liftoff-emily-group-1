package com.mediawrangler.media_wrangler.dto;

import com.mediawrangler.media_wrangler.models.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDTO {
    private int id;

    @NotBlank(message = "First name is required")
    private String firstname;

    @NotBlank(message = "Last name is required")
    private String lastname;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Username is required")
    private String username;

    @Size(max=500)
    String bio;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.username = user.getUsername();
        this.bio = user.getBio();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public @NotBlank(message = "First name is required") String getFirstname() {
        return firstname;
    }

    public void setFirstname(@NotBlank(message = "First name is required") String firstname) {
        this.firstname = firstname;
    }

    public @NotBlank(message = "Last name is required") String getLastname() {
        return lastname;
    }

    public void setLastname(@NotBlank(message = "Last name is required") String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public @Size(max = 500) String getBio() {
        return bio;
    }

    public void setBio(@Size(max = 500) String bio) {
        this.bio = bio;
    }
}
