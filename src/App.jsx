import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {
 
  return (
    <>
      <Toaster position="top-right" />
    <Navbar />
     <Outlet />
     <Footer />
    </>
  )
}

export default App
