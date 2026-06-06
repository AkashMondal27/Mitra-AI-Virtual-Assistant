import React, { useContext } from 'react'
import { Navigate, Route ,Routes } from 'react-router-dom'
import SingUp from './pages/SingUp'
import SingIn from './pages/SingIn'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'
import Home from './pages/Home'
import { userDataContext } from './context/UserContext'

const App = () => {
  const{userData,setUserData}=useContext(userDataContext)
  return (
    <Routes>
      <Route path='/' element={(userData?.assistantImage && userData?.assistantName) ?<Home/> :<Navigate to={"/customize"}/>} />
      <Route path='/signup' element={!userData?<SingUp/>:<Navigate to={"/customize"}/>}/>
      <Route path='/signin'  element={!userData?<SingIn/>:<Navigate to={"/"}/>}/>
      <Route path='/customize' element={userData ? <Customize/> : <Navigate to="/signup"/>}/>
      <Route path='/customize2' element={userData ? <Customize2/> : <Navigate to="/signup"/>}/> 
     

    </Routes>
  )
}

export default App
