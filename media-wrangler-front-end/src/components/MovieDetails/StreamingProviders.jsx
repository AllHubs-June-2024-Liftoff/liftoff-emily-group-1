import axios from "axios";
import React, { useEffect, useState } from "react";

const StreamingProviders = ({ movieId }) => {
    const [providers, setProviders] = useState({ buy: [], rent: [], streaming: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get(`/api/movies/streaming/${movieId}`);
                if (response.headers['content-type'] === 'application/json') {
                    setProviders(response.data || {});
                }
            } catch (err) {
                console.error('Error fetching streaming providers:', err.message);
                setError('Failed to load streaming providers.');
            }
        };
        fetchProviders();
    }, [movieId]);

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Streaming Providers</h1>
            {Object.keys(providers).length === 0 ? (
                <p>No streaming providers available.</p>
            ) : (
                <>
                    {providers.buy?.length > 0 && (
                        <div>
                            <h2>Buy</h2>
                            <ul>
                                {providers.buy.map((provider, index) => (
                                    <li key={index}>{provider.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {providers.rent?.length > 0 && (
                        <div>
                            <h2>Rent</h2>
                            <ul>
                                {providers.rent.map((provider, index) => (
                                    <li key={index}>{provider.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {providers.streaming?.length > 0 && (
                        <div>
                            <h2>Streaming</h2>
                            <ul>
                                {providers.streaming.map((provider, index) => (
                                    <li key={index}>{provider.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StreamingProviders;
