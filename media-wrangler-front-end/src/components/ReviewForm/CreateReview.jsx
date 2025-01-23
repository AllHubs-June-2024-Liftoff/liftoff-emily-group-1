import React from "react";
import AwardReviewForm from './AwardReviewForm';
import { useLocation } from "react-router-dom";


export default function CreateReview() {

    //Use location is apart of the react-router-dom, it is going to allow us to pass the state of the movie object (the location object) to the review form
    const location = useLocation();

    console.log("Location state:", location.state);

    //we are going to destructure the props from the movie object
    const { movieDetails } = location.state || {};


    return (
        <>
            {/* Pass the movie details to your forms */}
            { movieDetails && (
                <AwardReviewForm 
                    movieId={ movieDetails.id } 
                    title={ movieDetails.title } 
                    posterPath={ movieDetails.posterPath }
                    releaseDate={ movieDetails.releaseDate }
                    
                />
            )}
        </>


        
    );
}

//TODO: check if the release date in demo data is correct. Could cause testing issues if I am send the wrong data type back to Spring Boot

    // const movies = [
    //     {id: 1, 
    //         title: "It's a Wonderful Life",
    //         poster: "https://image.tmdb.org/t/p/original/qRitcyVpWdL7bSV7akDcKTR2YxL.jpg", 
    //         releaseDate: "1946-12 -20", 
    //         director: "Frank Capra",
    //         overview: "An angel is sent from Heaven to help a desperately frustrated businessman by showing him what life would have been like if he had never existed.",
    //         genre: ["Drama", "Family", "Fantasy", "Romance"]
    //     },
    //     {id: 2, 
    //         title: "Elf", 
    //         poster: "https://th.bing.com/th/id/R.4a6b29fcf1ab7cf3691f3bf7fcd2643e?rik=LWBs8HixZr5cUw&riu=http%3a%2f%2fwww.nerdspan.com%2fwp-content%2fuploads%2f2013%2f12%2felf-movie-poster.jpg&ehk=wNRWgnn0Hmn8ACJ8cWPtVRUO0bHZuqR4Bbqf9qaDPbs%3d&risl=&pid=ImgRaw&r=0", 
    //         releaseDate: "Nov 7, 2003", 
    //         director: "Jon Favreau", 
    //         overview: "Raised as an oversized elf, Buddy travels from the North Pole to New York City to meet his biological father, Walter Hobbs, who doesn't know he exists and is in desperate need of some Christmas spirit.",
    //         genre: ["Comedy", "Adventure", "Family", "Fantasy", "Romance" ]
    //     },
    //     {id: 3, 
    //         title: "National Lampoon's Christmas Vacation",
    //         poster: "https://th.bing.com/th/id/R.125ac48e9aa9e14ae04cef81ec106f33?rik=TtGyrHK5QucY7A&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f57488e28746fb940f103c64e%2f574f321fb09f95f3b30449b5%2f5bd0f04124a69482aaa57017%2f1545267192036%2fChristmas%2bVacation%2bPoster.jpg%3fformat%3d1500w&ehk=SAHawDiZJirI61qbNe1xvB%2f3Zoccx2tDprTPyAdwbrY%3d&risl=&pid=ImgRaw&r=0", 
    //         releaseDate: "Jul 29, 1983", 
    //         director: "Jeremiah S. Chechik", 
    //         overview: "The Griswold family's plans for a big family Christmas predictably turn into a big disaster. It's Christmas time and the Griswolds are preparing for a family seasonal celebration, but things never run smoothly for Clark, his wife Ellen and their two kids.",
    //         genre: ["Comedy"]
    //     }
    // ]
    // 
    // {/* Test out the Form that contains Movie Awards */}
                {/* <AwardReviewForm 
                    key={ movies[0].id }
                    movieId={ movies[0].id}
                    title={ movies[0].title }
                    poster={ movies[0].poster }
                    releaseDate={ movies[0].releaseDate }
                    director={ movies[0].director }
                    overview={ movies[0].overview }
                    genre={ movies[0].genre }
                /> */}
        