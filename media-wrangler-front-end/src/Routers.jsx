import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home';
import Movies from './components/Movies/Movies'
import Search from './components/Search/Search'
import Login from './components/Login/Login'
import LoginSuccess from './components/Login/LoginSuccess'
import Register from './components/Register/Register'
// import MovieSearch from './components/Search/MovieSearch'
import TestReviewForm from './components/ReviewForm/TestReviewForm'
import Profile from './components/Profile/Profile'
// import { PrivateRoutes } from './Services/PrivateRoutes'

function Routers() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />}/>
                {/* <Route path="/review" element={<ReviewForm />}/> */}
                <Route path="/login" element={<Login />}/>
                <Route path="/search" element={<Search />}/>
                <Route path="/loginsuccess" element={<LoginSuccess />}/>
                {/* <Route element={<PrivateRoutes />}> */}
                <Route path="/profile/:userId" element={<Profile />}/>
                {/* </Route> */}
                <Route path="/register" element={<Register />}/>
                <Route path="/registrationsuccess" element={<registrationSuccess />}/>
                <Route path="/reviews/create" element={<TestReviewForm />} />
            </Routes>
        </div>
    )
}

export default Routers;