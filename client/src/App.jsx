import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoutes"
import FilmDashboard from "./pages/admin/FilmDashboard"
import EditFilm from "./pages/admin/EditFilm"
import AddFilm from "./pages/admin/AddFilm"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import WatchList from "./pages/WatchList"
import Films from "./pages/Films"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Admin from "./pages/admin/Admin"
import PeopleDashboard from "./pages/admin/PeopleDashboard"
import FilmDetail from "./pages/FilmDetail"
import CrewDetail from "./pages/CrewDetail"

function App() {

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/films' element={<Films />} />
          <Route path='/films/:title' element={<FilmDetail />} />
          <Route path='/name/:name' element={<CrewDetail />} />
          <Route path='login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {isAdminRoute ? "" : <Footer /> }
    </>
  )
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path='/films' element={<FilmDashboard />} />
      <Route path='/cast_and_crew' element={<PeopleDashboard />} />
      <Route path='/film/add' element={<AddFilm />} />
      <Route path='/film/edit/:id' element={<EditFilm />} />
    </Routes>
  )
}

export default App
