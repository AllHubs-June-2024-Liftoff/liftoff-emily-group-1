import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const StreamingProviders = ({ movieId }) => {
    const [providers, setProviders] = useState({ buy: [], rent: [], streaming: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/movies/streaming/${movieId}`);
                console.log("API Response:", response.data);
                setProviders(response.data || { buy: [], rent: [], streaming: [] });
            } catch (err) {
                console.error('Error fetching streaming providers:', err.message);
                setError('Failed to load streaming providers.');
            }
        };
        fetchProviders();
    }, [movieId]);

    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ p: 2, bgcolor: "#rgba(5, 70, 105, 0.93)", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Streaming Providers
            </Typography>
            {Object.values(providers).every((list) => list.length === 0) ? (
                <Typography>No streaming providers available.</Typography>
            ) : (
                <>
                    {["buy", "rent", "streaming"].map((category) =>
                        providers[category]?.length > 0 ? (
                            <Box key={category} sx={{ mt: 2 }}>
                                <Typography variant="h6">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </Typography>
                                <List>
                                    {providers[category].map((provider, index) => (
                                        <ListItem key={index}>
                                            <img
                                                src={provider.logoPath} 
                                                alt={provider.providerName} 
                                                style={{ width: "50px", marginRight: "10px" }} 
                                            />
                                            <Typography>{provider.providerName}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        ) : null
                    )}
                </>
            )}
        </Box>
    );
};

export default StreamingProviders;