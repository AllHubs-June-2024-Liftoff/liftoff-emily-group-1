import { useState } from 'react'

import './App.css'
import MovieDetailCard from './components/MovieDetailCard'

function App() {
  
    //Testing the map() function
    const movies = [
      {id: 1, 
          title: "It's a Wonderful Life",
          poster: "https://image.tmdb.org/t/p/original/qRitcyVpWdL7bSV7akDcKTR2YxL.jpg", 
          releaseDate: "Dec 20, 1946", 
          director: "Frank Capra",
          overview: "An angel is sent from Heaven to help a desperately frustrated businessman by showing him what life would have been like if he had never existed.",
          genre: ["Drama", "Family", "Fantasy", "Romance"]
      },
      {id: 2, 
          title: "Elf", 
          poster: "https://th.bing.com/th/id/R.4a6b29fcf1ab7cf3691f3bf7fcd2643e?rik=LWBs8HixZr5cUw&riu=http%3a%2f%2fwww.nerdspan.com%2fwp-content%2fuploads%2f2013%2f12%2felf-movie-poster.jpg&ehk=wNRWgnn0Hmn8ACJ8cWPtVRUO0bHZuqR4Bbqf9qaDPbs%3d&risl=&pid=ImgRaw&r=0", 
          releaseDate: "Nov 7, 2003", 
          director: "Jon Favreau", 
          overview: "Raised as an oversized elf, Buddy travels from the North Pole to New York City to meet his biological father, Walter Hobbs, who doesn't know he exists and is in desperate need of some Christmas spirit.",
          genre: ["Comedy", "Adventure", "Family", "Fantasy", "Romance" ]
      },
      {id: 3, 
          title: "National Lampoon's Christmas Vacation",
          poster: "https://th.bing.com/th/id/R.125ac48e9aa9e14ae04cef81ec106f33?rik=TtGyrHK5QucY7A&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f57488e28746fb940f103c64e%2f574f321fb09f95f3b30449b5%2f5bd0f04124a69482aaa57017%2f1545267192036%2fChristmas%2bVacation%2bPoster.jpg%3fformat%3d1500w&ehk=SAHawDiZJirI61qbNe1xvB%2f3Zoccx2tDprTPyAdwbrY%3d&risl=&pid=ImgRaw&r=0", 
          releaseDate: "Jul 29, 1983", 
          director: "Jeremiah S. Chechik", 
          overview: "The Griswold family's plans for a big family Christmas predictably turn into a big disaster. It's Christmas time and the Griswolds are preparing for a family seasonal celebration, but things never run smoothly for Clark, his wife Ellen and their two kids.",
          genre: ["Comedy"]
      }
  ]

  return (
    <>
      <h1>Movie Detail Page</h1>
      {/* {movies.map((movie) => (
          <MovieDetailCard 
            key={ movie.id }
            title={ movie.title }
            poster={ movie.poster }
            releaseDate={ movie.releaseDate }
            director={ movie.director }
            overview={ movie.overview }
            genre={ movie.genre }
            
          />
        ))} */}
      <br />
      <MovieDetailCard {...movies[0]} />
      <br />
      <br />
      <p>
        We probably need to discuss how we want the cast and other specific details (themes, releases, etc) to be displayed
        You can see on letterboxd that they have a whole other navigation to further movie detail exploration. This seems like
        another component that we would need to create and insert here.... Along with a where streaming component and user interactions
        component
       </p>
    </>
  )
}

export default App
