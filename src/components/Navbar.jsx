import React, { useEffect, useState } from 'react'
import { MdHome } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { VscChecklist } from "react-icons/vsc";
import { MdEditDocument } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location2 = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[location , setLocation] = useState(location2.pathname)
    const { user } = useSelector((state) => state.auth)
    const links = [
        {
            page: "/",
            title: "All Tasks",
            icon: <MdHome className=' text-2xl' />
        },
        {
            page: "/important",
            title: "Important!",
            icon: <VscChecklist className=' text-2xl' />
        },
        {
            page: "/completed",
            title: "Completed",
            icon: <FaCheck className=' text-2xl' />
        },
        {
            page: "/do",
            title: "Do It Now",
            icon: <MdEditDocument className=' text-2xl' />
        }
    ]
   
    return (
        <>
            {user && <div className='nav hidden md:flex md:flex-col md:justify-between border-slate-700 rounded-md border-solid border-2  w-52 py-3 text-white h-full bg-[#3632324d]'>
                <div className="profilepicdescription mx-3 flex items-center rounded-md cursor-pointer py-2 px-2">
                    <img src={user.img} alt="" className=' rounded-full w-16 h-16' />
                    <h1 className=' font-medium ml-1'>{user.name}</h1>
                </div>
                <ul className=' cursor-pointer'>
                    {links.map((i) => <Link key={i.page} to={i.page}> <li style={i.page===location ? {backgroundColor:"#8080807d"} : {}} onClick={()=>setLocation(i.page)} className='relative pl-4 flex  items-center py-2 hover:bg-slate-700 '>
                        {i.icon}
                        <p className=' ml-1'>{i.title}</p>
                        <div style={i.page===location ? {backgroundColor : "#4ea24ecc"} : {}}  className=' absolute h-full w-1 top-0 right-0 '></div>
                    </li>
                    </Link>)}

                </ul>
                <div className='pl-5 flex items-center py-2 hover:bg-slate-700 cursor-pointer' onClick={() => { dispatch({ type: 'clearuser' }), localStorage.removeItem("id"), navigate('/login')  }}>
                    <FaSignOutAlt className=' text-2xl' />
                    <p className=' font-medium ml-1'>Sign Out</p>
                </div>
            </div>}
        </>
    )
}

export default Navbar
