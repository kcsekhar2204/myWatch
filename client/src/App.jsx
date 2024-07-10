import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoutes"
import Admin from "./pages/Admin"
import EditFilm from "./pages/EditFilm"
import AddFilm from "./pages/AddFilm"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import WatchList from "./pages/WatchList"
import Films from "./pages/Films"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/films' element={<Films />} />
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
      <Footer />
    </>
  )
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Admin />} />
      <Route path='/film/add' element={<AddFilm />} />
      <Route path='/film/edit/:id' element={<EditFilm />} />
    </Routes>
  )
}

export default App
