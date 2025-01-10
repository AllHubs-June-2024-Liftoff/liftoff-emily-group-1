package com.mediawrangler.media_wrangler.dto;

public class ProviderDTO {

    private String logoPath;
    private String providerName;
    private String providerLink;

    public ProviderDTO(String providerName, String logoPath, String providerLink) {
        this.logoPath = logoPath;
        this.providerName = providerName;
        this.providerLink = providerLink;
    }

    public ProviderDTO(String providerName, String logoPath) {
        this.providerName = providerName;
        this.logoPath = logoPath;
    }

    public ProviderDTO() {
    }

    public String getLogoPath() {
        return logoPath;
    }

    public void setLogoPath(String logoPath) {
        this.logoPath = logoPath;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getProviderLink() {
        return providerLink;
    }

    public void setProviderLink(String providerLink) {
        this.providerLink = providerLink;
    }
}
