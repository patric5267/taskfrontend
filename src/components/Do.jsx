import React , {useEffect} from 'react'
import All from './All'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { getuser } from '../redux/action'
import Navbar from './Navbar'
import Phone from './Phone'
const Do = () => {
  const dispatch = useDispatch()
  const {user , notes , isloading} = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate('/login')
    }
    else{
      if(!user){
        dispatch(getuser(localStorage.getItem("id")))
      }
   }
  }, [])
  if(isloading){
    return <div className=' fixed h-full w-full  left-0 top-0 flex justify-center items-center'><span class="loader2"></span></div>
  }
  else{
    return (
      <>
      <Navbar/>
      <Phone/>
     {user &&<div className='md:ml-2 w-full  h-full'>
        <All a={location.pathname} notesdata={notes}/>
      </div> }
      </>
    )
  }
}

export default Do
