package com.mediawrangler.media_wrangler.models;

public class CastMember {
    int id;
    String name;
    String character;

    public CastMember(int id, String name, String character) {
        this.id = id;
        this.name = name;
        this.character = character;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }

    @Override
    public String toString() {
        return "CastMember{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", character='" + character + '\'' +
                '}';
    }
}
