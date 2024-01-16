import React , {useEffect} from 'react'
import All from './All'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { getuser } from '../redux/action'

const Do = () => {
  const dispatch = useDispatch()
  const {user , notes} = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate('/login')
    }
    else{
      dispatch(getuser(localStorage.getItem("id")))
   }
  }, [])
  return (
    <>
   {user &&<div className='md:ml-2 w-full  h-full'>
      <All a={location.pathname} notesdata={notes}/>
    </div> }
    </>
  )
}

export default Do
