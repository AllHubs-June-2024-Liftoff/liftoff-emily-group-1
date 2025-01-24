import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import Movies from './components/Movies/Movies'
import Search from './components/Search/Search'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import CreateReview from './components/ReviewForm/CreateReview'
import DisplayReview from './components/ReviewDisplay/DisplayReview'
import JournalDisplayReview from './components/ReviewDisplay/JournalDisplayReview'
import { AuthProvider } from './Services/AuthContext';
import { ListProvider } from './Services/ListContext.jsx'
import MovieDetailsPage from './components/MovieDetails/MovieDetailsPage'
import UserJournalPage from './components/Journal/UserJournalPage'
import DiscoverPage from './components/Discover/UpcomingReleases.jsx'
import QuestionDetail from './components/Discussions/Answers.jsx'
import Discussions from './components/Discussions/Discussions.jsx'

function App() {
  return (
    <AuthProvider>
    <ListProvider>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reviews/create" element={<CreateReview />} />
          <Route path="/reviews/view" element={<DisplayReview />} />
          <Route path="/reviews/view/:id" element={<JournalDisplayReview />} />
          <Route path="/reviews/user/:userId" element={<UserJournalPage />}/>   
          <Route path="/questions" element={<Discussions />} />
          <Route path="/answers/:questionId" element={<QuestionDetail />} />
        </Routes>
      </div>
    </ListProvider>
    </AuthProvider>
  )
}

export default App


