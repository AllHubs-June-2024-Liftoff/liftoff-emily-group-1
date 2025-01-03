
import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import Movies from './components/Movies/Movies'
import Search from './components/Search/Search'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import LoginSuccess from './components/Login/LoginSuccess'
import Register from './components/Register/Register'
import registrationSuccess from './components/Register/RegistrationSuccess'
import MovieSearch from './components/MovieSearch'

function App() {


  return (
    <>
      <Navbar />
        <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />}/>

        <Route path="/login" element={<Login />}/>
        <Route path="/search" element={<MovieSearch />}/>
        <Route path="/loginsuccess" element={<LoginSuccess />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/registrationsuccess" element={<registrationSuccess />}/>
      </Routes>
        </div>
    </>
  )
}

export default App
