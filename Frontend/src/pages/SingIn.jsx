import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoMdEye } from "react-icons/io"
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios"

function SingIn  (){


  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // use to go to the signin page 

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { serverUrl,userData,setUserData } = useContext(userDataContext)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //fetch the API foe signup 
  const handleSignIn = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true);
    try {
      let result = await axios.post(`${serverUrl}api/auth/signin`, {
        email, password
      }, { withCredentials: true })
      // console.log(result)
      setUserData(result.data);
      setLoading(false);
      navigate("/")
    } catch (error) {
      console.log(error)
      setUserData(null)
      setLoading(false);
      setError(error.response.data.message )
    }
    {

    }
  }



  return (
    <div className='w-full h-screen bg-cover flex justify-center items-center'
      style={{ backgroundImage: `url(${bg})` }} >

      <form className='w-[90%] h-130 max-w-115 bg-[#0f0e0e5f] backdrop-blur shadow-lg  rounded-2xl
        shadow-blue-900 flex flex-col items-center justify-center gap-5 px-5'
        onSubmit={handleSignIn}>
        <h1 className='text-blue-400 text-[30px] font-semibold mb-7.5'>
          Sign In to <span className=' text-orange-400'>Virtual Assistant </span>
        </h1>




        <input type='email'
          placeholder=' Email'
          className='w-full h-15 outline-none border-2
                   border-white bg-transparent text-white
                    placeholder-gray-400 px-5 py-2.5
                     rounded-full text-[18px]'
          required onChange={(e) => setEmail(e.target.value)} value={email} />


        <div className='w-full h-15 border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
          <input type={showPassword ? "text" : "password"}
            placeholder='password'
            className='w-full h-full rounded-full outline-none bg-transparent 
                        placeholder-gray-400 px-5 py-2.5'
            required onChange={(e) => setPassword(e.target.value)} value={password} />


          {!showPassword && <IoMdEye className='absolute top-4 right-5 text-[white] w-6.25 h-6.25 cursor-pointer ' onClick={() => setShowPassword(true)} />}

          {showPassword && <IoEyeOff className='absolute top-4 right-5 text-[white] w-6.25 h-6.25 cursor-pointer' onClick={() => setShowPassword(false)} />}
        </div>
        {error.length > 0 && <p className="text-red-500  text-[16px] ">
          *{error}
          </p>}
        <button className='min-w-37 h-13 mt-2 bg-orange-200 rounded-full text-amber-800 text-xl font-semibold
         hover:bg-orange-300 shadow-2xl shadow-amber-100' disabled={loading}>
          {loading ? "Loading..." : "Sign In"}  
        </button>

        { /*...........if have any account ........................*/}

        <p className=' text-white text-[18px] font-semibold'>Want to Create a new account ?
          &nbsp;  <span className='text-orange-400 cursor-pointer' onClick={() => navigate("/signup")}>Sign Up</span></p>


      </form>

    </div>
  )
}

export default SingIn
