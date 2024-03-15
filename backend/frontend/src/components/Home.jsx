import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



const Home = () => {
    const navigate = useNavigate();
    const gotodashboard = () =>{
        navigate('/dashboard')

    }
    const gotosignup = () =>{
        navigate('/signup')

    }
  return (
    <div>
    <div className='h-screen flex-col bg-black'>

    <h1 className='text-5xl text-white py-2 font-bold font-sans flex justify-center '>Paytmall</h1>
    <p className='text-white text-3xl font-semibold font-sans flex justify-center mt-4 ml-2 '>Your one stop to do all online transactions  </p>
    <div className='flex justify-evenly mt-60'>
    <button onClick={gotodashboard} className=' bg-white w-36 rounded-md font-semibold border-stone-950 h-12 '>Go to Dashboard</button>
    <button onClick={gotosignup} className=' bg-white w-36 rounded-md font-semibold border-stone-950 h-12 '>Signup</button>
    </div>


    </div>
      
    </div>
  )
}

export default Home
