import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import Movies from './components/Movies/Movies'
import Search from './components/Search/Search'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'



import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import Profile from './components/Profile/Profile'
import { PrivateRoutes } from './Services/PrivateRoutes'
import VerificationSent from './components/VerifyEmail/VerificationSent'
import CreateReviewPage from './components/ReviewForm/CreateReviewPage'
import JournalDisplayReview from './components/Journal/JournalDisplayReview'
import { AuthProvider } from './Services/AuthContext';
import { ListProvider } from './Services/ListContext.jsx'
import MovieDetailsPage from './components/MovieDetails/MovieDetailsPage'
import UserJournalPage from './components/Journal/UserJournalPage'
import ComingSoon from './components/UpcomingMovies/UpcomingReleases.jsx'
import QuestionDetail from './components/Discussions/Answers.jsx'
import Discussions from './components/Discussions/Discussions.jsx'
import DiscoverPage from './components/Discover/DiscoverPage.jsx'
import AboutUs from './components/PurpleTONE/PurpleTONE.jsx'
import AwardReviewForm from './components/ReviewForm/AwardReviewForm.jsx'
import EditReviewFormPage from './components/ReviewForm/EditReviewFormPage.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
    <ListProvider>
      <Navbar />
      <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/check-email" element={<VerificationSent />} />
          <Route path="/reviews/create" element={<CreateReviewPage />} />
          <Route path="/reviews/view/:id" element={<JournalDisplayReview />} />
          <Route path="/reviews/user/:userId" element={<UserJournalPage />}/>   
          <Route path="/questions" element={<Discussions />} />
          <Route path="/answers/:questionId" element={<QuestionDetail />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/reviews/edit/:id" element={<EditReviewFormPage />} />

        </Routes>
      </div>
    </ListProvider>
    </AuthProvider>
  )
}

export default App


