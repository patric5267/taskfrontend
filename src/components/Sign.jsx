import React, { useEffect, useState } from 'react'
import { IoIosPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/action';
import { useNavigate } from 'react-router-dom';
const Sign = () => {
  const navigate = useNavigate()
  const[eye , setEye]= useState("password")
  const dispatch  = useDispatch()
  const {isloadinguser , msg , errorsdata} = useSelector((state)=>state.auth)
  useEffect(()=>{
    if(errorsdata.length!==0){
      setTimeout(()=>{
        dispatch({
          type:"clearerror"
        })
      },2000)
    }
  },[errorsdata])
  useEffect(()=>{
     if(msg==='Sign up successfull'){
         navigate('/login')
         dispatch({
          type:"clearmessage"
         })
     }
  },[msg])
  const[data , setData] = useState({
    name:"",email:"",password:"",img:"https://joesch.moe/api/v1/random"
  })
  const postdata = async(e)=>{
    e.preventDefault()
    dispatch(signup(data))
  }
  return (
    <div className='relative  w-full h-full flex justify-center items-center  z-40 top-0'>
      <div className=' sign text-gray-300  bg-[#add8e621] w-[22rem] lg:mt-0 h-[27rem]  py-3 px-2 sm:px-4 rounded-md'>
        <h1 className=' text-2xl font-medium'>Create a Account</h1>
        <form className=' flex flex-col items-end' onSubmit={postdata}>
          <div className="relative name flex flex-col my-3 w-full">
            <label htmlFor="username">Name</label>
            <input type="text" value={data.name} className='mt-2 text-black outline-gray-400 rounded-md py-1 pl-2' onChange={(e)=>setData({...data , name:e.target.value})} required />
            <IoIosPerson className=' absolute right-2 top-9 text-gray-600 text-xl' />
          </div>
          <div className="relative name flex flex-col my-3 w-full">
            <label htmlFor="email">Email</label>
            <input type="email" className='outline-gray-400 text-black mt-2 rounded-md py-1 pl-2'  onChange={(e)=>setData({...data , email:e.target.value})} required/>
            <MdEmail className=' absolute right-2 top-9 text-gray-600 text-xl' />
          </div>
          <div className="relative name flex flex-col my-3 w-full">
            <label htmlFor="email">Create a Password</label>
            <input type={eye} className='outline-gray-400 text-black mt-2  rounded-md py-1 pl-2' onChange={(e)=>setData({...data , password:e.target.value})} required/>
            {data.password.length===0 ? <RiLockPasswordFill className=' absolute right-2 top-9 text-gray-600 text-xl' />:
            <FaRegEye className=' absolute right-2 top-9 text-gray-600 text-xl' onClick={eye==='password' ? ()=>setEye("text") : ()=>setEye("password")}/> }
          </div>
          {
            isloadinguser ? <div className='relative  w-full h-7 my-2'><div className="loader absolute bottom-6 right-6"></div></div>  :  <button type='submit' className=' flex justify-center items-center text-gray-200 cursor-pointer mt-3 bg-blue-500 px-4 py-2 rounded-md text-lg'>
           Create Account
          </button>
          }
        
          <div className=' flex items-center mt-3'>
            <p>Already a User?</p>
            <Link to='/login' className=' ml-1'>Login</Link>
          </div>
        </form>
      </div>
      <div className="arrcon  grid grid-cols-1 gap-y-4 absolute top-2 left-2 sm:right-2 sm:w-[20rem]">
        { errorsdata.map((i)=> <div key={i.path} className="errname bg-red-700 py-2 px-2  text-gray-200 rounded-md font-medium">
            <h1>{i.msg}</h1>
           </div> ) }
         </div>
    </div>
  )
}

export default Sign
