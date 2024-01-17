import React, { useEffect, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/action';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const[eye , setEye]= useState("password")
  const [user, setUser] = useState({
    email: "", password: ""
  })
  const dispatch = useDispatch()
  const { isloading, msg } = useSelector((state) => state.auth)
  useEffect(() => {
    if (msg === 'invalid credentials') {
      setTimeout(() => {
        dispatch({
          type: "clearmessage"
        })
      }, 2000)
    }
    else if(msg) {
        localStorage.setItem("id" , msg)
        navigate('/')
        dispatch({
          type: "clearmessage"
        })
    }
  }, [msg])
  const postdata = (e) => {
    e.preventDefault()
    dispatch(login(user))
  }
  return (
    <div className='relative  w-full h-full flex justify-center items-center  z-40 top-0'>
      <div className='sign text-gray-300  bg-[#add8e621] w-[20rem] py-3 px-2 sm:px-4 rounded-md'>
        <h1 className=' text-2xl font-medium'>Login</h1>
        <form className=' flex flex-col items-end' onSubmit={postdata}>
          <div className="relative name flex flex-col my-3 w-full">
            <label htmlFor="email">Email</label>
            <input type="email" className='outline-gray-400 text-black mt-2 rounded-md py-1 pl-2' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <MdEmail className=' absolute right-2 top-9 text-gray-600 text-xl' />
          </div>
          <div className="relative name flex flex-col my-3 w-full">
            <label htmlFor="email">Password</label>
            <input type={eye} className='outline-gray-400 text-black mt-2  rounded-md py-1 pl-2' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
           {user.password.length===0 ? <RiLockPasswordFill className=' absolute right-2 top-9 text-gray-600 text-xl' />:
            <FaRegEye className=' absolute right-2 top-9 text-gray-600 text-xl' onClick={eye==='password' ? ()=>setEye("text") : ()=>setEye("password")}/> }
          </div>
          {
            isloading ? <div className='relative  w-full h-7 my-2'><div className="loader absolute bottom-6 right-6"></div></div> : <button type='submit' className=' flex justify-center items-center text-gray-200 cursor-pointer mt-3 bg-blue-500 px-4 py-2 rounded-md text-lg'>
              Login
            </button>
          }
          <div className=' flex items-center mt-3'>
            <p>New User?</p>
            <Link to='/sign' className=' ml-1'>Create Account</Link>
          </div>
          <div className='w-full mt-4'>
            <h1 className=' text-lg underline'>Demo User</h1>
            <div className=' mt-2'>
              <p>Email : abc@gmail.com</p>
            </div>
            <div className=' mt-1'>
              <p>Password : abc245</p>
            </div>
          </div>
        </form>
      </div>
      {msg==='invalid credentials' && <div className="errname absolute top-0 sm:right-0 w-full errorbox font-bold text-lg rounded-md px-1 my-2 sm:w-[20rem] bg-red-500 text-white py-1 ">
        <h1>Invalid Credentials</h1>
      </div>}
    </div>
  )
}

export default Login
