import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Dashboard = () => {

    const navigate = useNavigate();

   
    const [users , setUsers] = useState('');
    const [balance, setBalance] = useState(1);
    const [filter,setFilter] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('token')

        axios.get(`${window.location.origin}/api/v1/account/balance`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then(response=>{

            setBalance(response.data.balance);
            
        }).catch(error=>{
            console.error("Error fetched successfully " , error);
        });

       
    },[]);

    useEffect(()=>{

      

        axios.get(`${window.location.origin}/api/v1/user/bulk?filter=` + filter,{
          
        }).then(response=>{
            setUsers(response.data.user);
        }).catch(error=>{
            console.error("Error fetching users",error)
        })

    },[filter]);

    console.log(users);
    

    



    
   


  return (
    <div >
    <div className='ml-2'>
    
    <div className=' relative flex'>

    <div className=' text-2xl font-bold ml-4'>PaytMall</div>
    <div  className=' absolute text-2xl font-bold right-4'>Hello, User</div>



    
    </div>
    <hr className='mt-4' />

    <div>
        <h1 className='ml-2 mt-4 text-2xl font-bold'>
            Your Balance is Rs {balance}
        </h1>
    </div>
    <div>
        <h1 className='ml-2 mt-4  text-2xl font-bold'>
            Users
        </h1>
    </div>

    <div className='mt-4 ml-2'>
        <input type="text" value={filter} onChange={(e)=>setFilter(e.target.value)}  placeholder='Search Users' className='w-full h-12 rounded-md  bg-slate-100' />
    </div>


            
     {
        users && users.length >0 ?
         
        (
            
        users.map((user)=>(
            <div key={user._id} className=' ml-2 flex relative mt-4'>
    <h1 className=' text-2xl bg-slate-100 rounded-full w-8 flex justify-center' >{user.firstName[0]}</h1>
        <h1 className='text-2xl ml-2 font-bold'>{user.firstName}  {user.lastName}</h1>
        <button onClick={async()=>{
                 navigate('/sendmoney?id='+user._id +"&name="+user.firstName );
        }} className='bg-black w-32 h-10 absolute right-2 rounded-md text-white'>Send Money</button>
    </div>
        )))
       :<div className='ml-2 font-semibold text-2xl'>
       Search above to send money to your friends
       </div>

        
     }


       
  
    </div>

    </div>

      
    
  )
}

export default Dashboard
