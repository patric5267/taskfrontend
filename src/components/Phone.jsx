import React, { useState } from 'react'
import { MdHome } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { VscChecklist } from "react-icons/vsc";
import { MdEditDocument } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Phone = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [location, setLocation] = useState("/")
    const [position2, setPosition2] = useState("-198px")
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
            {user && <div className='navphone md:hidden  flex flex-col justify-between  fixed top-0  w-52 h-full py-3  text-white' style={position2 === "-198px" ? { backgroundColor: "transparent", left: "-198px" } : { backgroundColor: "#433d3d", left: "0" }}>
                <div className="profilepicdescription mx-3 flex items-center rounded-md cursor-pointer py-2 px-2">
                    <img src={user.img} alt="" className=' rounded-full w-16 h-16' />
                    <h1 className=' font-medium ml-1'>{user.name}</h1>
                </div>
                <ul style={position2 === '-198px' ? { display: "none" } : { display: "block" }} className=' cursor-pointer'>
                    {links.map((i) => <Link onClick={() => setLeft("-198px")} key={i.page} to={i.page}> <li style={i.page === location ? { backgroundColor: "#8080807d" } : {}} onClick={() => setLocation(i.page)} className='relative pl-4 flex  items-center py-2 hover:bg-slate-700 '>
                        {i.icon}
                        <p className=' ml-1'>{i.title}</p>
                        <div style={i.page === location ? { backgroundColor: "#4ea24ecc" } : {}} className=' absolute h-full w-1 top-0 right-0 '></div>
                    </li>
                    </Link>)}

                </ul>
                <div className='pl-5 flex items-center py-2 hover:bg-slate-700 cursor-pointer' onClick={() => { dispatch({ type: 'clearuser' }), localStorage.removeItem("id"), navigate('/login') , setPosition2("-198px") }}>
                    <FaSignOutAlt className=' text-2xl' />
                    <p className=' font-medium ml-1'>Sign Out</p>
                </div>
                {position2 === "-198px" ? <IoMdMenu className=' absolute text-3xl rounded-full py-1 px-1 top-7 left-[96%] border-gray-500 border-soli border-2' onClick={() => setPosition2("0")} /> : <FaArrowLeft className=' absolute text-3xl rounded-full py-1 px-1 top-7 left-[94%] border-gray-500 border-solid border-2' onClick={() => setPosition2("-198px")} />}
            </div>}
        </>
    )
}

export default Phone
