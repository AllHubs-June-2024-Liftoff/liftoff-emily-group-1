import React, { useState } from 'react';
import './PosterCard.css';


function PosterCard() {

  //NOTE: The Movie Database (TMDb), the base URL for images might look like https://image.tmdb.org/t/p/w500. So, you would construct the full URL by concatenation... I didn't want image so large, so I altered the base URL

  //TODO: uncomment out the baseImageURL and fullPosterURL when using API...And switch { poster } back to { fullPosterURL }
  //   const baseImageUrl = "https://image.tmdb.org/t/p/w300";
  //   const fullPosterUrl = `${baseImageUrl}${poster}`;

  //TODO: Add more styling to poster card -- increase size and adjust highlighting
  //TODO: Add a more stylish Tiptool for hovering over poster to get movie title --> found some in mui library
 
  
    //Testing the map() function -- will use demo data until search filters or user movie lists are available
    const movies = [
        {id: 1, 
            title: "It's a Wonderful Life",
            poster: "https://image.tmdb.org/t/p/original/qRitcyVpWdL7bSV7akDcKTR2YxL.jpg"   
        },
        {id: 2, 
            title: "Elf", 
            poster: "https://th.bing.com/th/id/R.4a6b29fcf1ab7cf3691f3bf7fcd2643e?rik=LWBs8HixZr5cUw&riu=http%3a%2f%2fwww.nerdspan.com%2fwp-content%2fuploads%2f2013%2f12%2felf-movie-poster.jpg&ehk=wNRWgnn0Hmn8ACJ8cWPtVRUO0bHZuqR4Bbqf9qaDPbs%3d&risl=&pid=ImgRaw&r=0" 
        },
        {id: 3, 
            title: "National Lampoon's Christmas Vacation",
            poster: "https://th.bing.com/th/id/R.125ac48e9aa9e14ae04cef81ec106f33?rik=TtGyrHK5QucY7A&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f57488e28746fb940f103c64e%2f574f321fb09f95f3b30449b5%2f5bd0f04124a69482aaa57017%2f1545267192036%2fChristmas%2bVacation%2bPoster.jpg%3fformat%3d1500w&ehk=SAHawDiZJirI61qbNe1xvB%2f3Zoccx2tDprTPyAdwbrY%3d&risl=&pid=ImgRaw&r=0"
        }
    ]

    //This should track which movie id is being hovered over. isHovered state variable was allowing all movies to highlight at once
    const [hoveredId, setHoveredId] = useState(null);

    function handleMouseOver(id) {
      setHoveredId(id); 
    }

    function handleMouseOut() {
      setHoveredId(null); 
    }

    //TODO: add navigation here to redirect user to the movie detail page
    function handleClick() {
      console.log("Poster Clicked");
    }

    return(
        <div>
        <div id="movie-search">
            {movies.map((movie) => (
            <div key={movie.id}>
                <img
                onClick={ handleClick }
                onMouseOver= {() => handleMouseOver(movie.id)}
                onMouseOut={ handleMouseOut } 
                title={ movie.title }
                src={ movie.poster } 
                alt={ movie.title } 
                style={{
                    border: hoveredId === movie.id ? '2px solid rgb(99, 180, 176)' : 'none', 
                  }}
                />        
            </div>
            ))}
            </div>
        </div>
     
    );
}
export default PosterCard;

/*
NOTE: The width and height can be adjusted. We probably want a smaller poster size for the poster grid that will display the movie-cards and possibly to attach to the movie-review-form
We probably want an image a bit larger for the movie-detail-card when we are targeting in on one specific movie 


NOTE: We may not want to display the movie title in the poster grid (or horizontal display) because the titles will not allow for a good flow with the various lengths. 

NOTE: We just need to decide if we want the results to list horizontal or vertically. For the homepage, if we are viewing the trending movies I think horizontally would be best, but for the search results a vertical display might be nice. No preference either way

-----
NOTE: Make sure not to add () after clickHandler inside the {} because it would then be calling the function instead of acting as a function
*/
