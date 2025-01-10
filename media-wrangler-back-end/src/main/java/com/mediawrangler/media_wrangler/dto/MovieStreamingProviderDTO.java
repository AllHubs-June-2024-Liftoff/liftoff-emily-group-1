package com.mediawrangler.media_wrangler.dto;

import org.json.JSONPropertyName;

import java.util.ArrayList;

//TODO: add JSON
public class MovieStreamingProviderDTO {

    ArrayList<ProviderDTO> buy = new ArrayList<>();
    ArrayList<ProviderDTO> rent = new ArrayList<>();
    ArrayList<ProviderDTO> streaming = new ArrayList<>();

    public void addBuyProvider(ProviderDTO provider) {
        buy.add(provider);
    }

    public void addRentProvider(ProviderDTO provider) {
        rent.add(provider);
    }

    public void addStreamingProvider(ProviderDTO provider) {
        streaming.add(provider);
    }

    public ArrayList<ProviderDTO> getBuy() {
        return buy;
    }

    public void setBuy(ArrayList<ProviderDTO> buy) {
        this.buy = buy;
    }

    public ArrayList<ProviderDTO> getRent() {
        return rent;
    }

    public void setRent(ArrayList<ProviderDTO> rent) {
        this.rent = rent;
    }

    public ArrayList<ProviderDTO> getStreaming() {
        return streaming;
    }

    public void setStreaming(ArrayList<ProviderDTO> streaming) {
        this.streaming = streaming;
    }
}
