
import React ,{useState} from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from  'sweetalert2'






  const Signup = () => {


    const navigate = useNavigate();

    
    const [firstName,setfirstName] = useState("");
    
    const [lastName,setlastName] = useState("");
    
    const [username,setusername] = useState("");

    
    const [password,setpassword] = useState("");

    const [showPassword,setShowPassword] = useState(false);






    const passwordseeker = ()=>{
        const password = !showPassword
        setShowPassword(password);
    }

   




  return (
    <div className='h-screen bg-slate-800 flex justify-center items-center'>
    <div className='bg-white flex justify-center items-center w-full mt-6 rounded-md sm:w-7/12 '>
    <div className='w-full h-full flex-col justify-center items-center '>
    <h1 className='font-bold  text-5xl flex justify-center mt-8'>SignUp</h1>
    <p className='font-normal text-md mt-4 flex justify-center '>Enter your information to create your account</p>
    <div className='flex-col ml-12'>
    <p className='font-bold mt-6'>FirstName</p>
    <input className=' bg-gray-100  rounded-md h-12 w-4/5 mt-2' value={firstName} placeholder='Enter your FirstName' onChange={(e)=>{setfirstName(e.target.value)}} type="text" />

    <p className='font-bold mt-6'>LastName</p>
    <input placeholder='Enter your LastName' className=' bg-gray-100   rounded-md h-12 w-4/5  mt-2' value={lastName} onChange={(e)=>{setlastName(e.target.value)}} type="text" />
    <p className='font-bold mt-6'>Email</p>
    <input placeholder='Enter your Email' className=' bg-gray-100    rounded-md h-12 w-4/5  mt-2' value={username} onChange={(e)=>{setusername(e.target.value)}} type="email" />

    <p className='font-bold mt-6'>Password</p>
    <input placeholder='Enter your Password' className=' bg-gray-100  rounded-md h-12 w-4/5  mt-2' value={password} onChange={(e)=>{setpassword(e.target.value)}}  type={showPassword?"text":"password"} /> 
    <button className='ml-2' onClick={passwordseeker}>{showPassword ? <FiEye/> : <FiEyeOff/>}</button>
    </div>
   
    <div className='flex  justify-center '>
    <button  onClick={async(e)=>{
        e.preventDefault();
        try{
          const response = await axios.post( `${window.location.origin}/api/v1/user/signup`, {
              username,
              firstName,
              lastName,
              password
            });
        localStorage.setItem("token",response.data.token)
        Swal.fire(
          {
            title:response.data.message,
            icon:"success",
            timer:2000,
          }
        )

        navigate('/dashboard');


        }

catch(error){

console.error("The error is "+error)
  Swal.fire(
          {
            title:error.response.data.message,
            icon:"error",
            timer:2000,
          }
        )
}       
      
       
    }} className='mt-6 rounded-md w-28 h-12 font-bold bg-black cursor-pointer text-white'>SignUp</button>
    </div>

   
    
    <p className='mt-6 flex justify-center mb-4 font-light '>Already have an account?<Link className=' text-purple-900' to="/signin">Click Here</Link></p>

    

    </div>




  

    </div>
    </div>
  )
}

export default Signup
