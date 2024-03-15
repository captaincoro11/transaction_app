import React ,{useState} from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'


  const Signin = () => {


    const navigate = useNavigate();


    

    
    const [username,setusername] = useState("");

    
    const [password,setpassword] = useState("");

    const [showPassword,setShowPassword] = useState(false);


    const submitHandler =(e)=>{
        e.preventDefault();
    }

    const passwordseeker = ()=>{
        const password = !showPassword
        setShowPassword(password);
    }

    




  return (
    <div className='h-screen bg-slate-800 flex justify-center items-center'>
    <form onSubmit={submitHandler} className='bg-white flex justify-center items-center w-full mt-6 rounded-md sm:w-7/12 '>
    <div className='w-full h-full flex-col justify-center items-center '>
    <h1 className='font-bold  text-5xl flex justify-center mt-8'>SignIn</h1>
    <p className='font-normal text-md mt-4 flex justify-center '>Enter your credentials to access your account</p>
    <div className='flex-col ml-12'>
   
    <p className='font-bold mt-6'>Email</p>
    <input placeholder='Enter your Email' className=' bg-gray-100  rounded-md h-12 w-4/5  mt-2' value={username} onChange={(e)=>{setusername(e.target.value)}} type="email" />

    <p className='font-bold mt-6'>Password</p>
    <input placeholder='Enter your Password' className=' bg-gray-100  rounded-md h-12 w-4/5  mt-2' value={password} onChange={(e)=>{setpassword(e.target.value)}}  type={showPassword?"text":"password"} /> 
    <button className='ml-2' onClick={passwordseeker}>{showPassword ? <FiEye/> : <FiEyeOff/>}</button>
    </div>
   
    <div className='flex  justify-center '>
    <button type='submit' onClick={async()=>{
      try{
        const response = await axios.post(`${window.location.origin}/api/v1/user/signin`,{
        username,
        password
      });
      localStorage.setItem("token",response.data.token);
      Swal.fire({
        title:response.data.message,
        icon:"success",
        timer:2000
      })
      navigate('/dashboard')

      }
      catch(error){
        Swal.fire({
        title:error.response.data.message,
        icon:"error",
        timer:2000
      })

      }

    }} className='mt-6 rounded-md w-28 h-12 font-bold bg-black cursor-pointer text-white'>SignIn</button>
    </div>

   
    
    <p className='mt-6 flex justify-center mb-4 font-light '>Don't have an account?<Link className=' text-purple-900' to="/signup">Click here</Link></p>

    

    </div>




  

    </form>
    </div>
  )
}

export default Signin
