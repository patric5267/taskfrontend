import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createnote, updatetask, deletetask , updatataksform} from '../redux/action';

const All = ({ a, notesdata }) => {
    const[update , setUpdate] = useState(false)
    const[updatedTask , setUpdatedTask] = useState(null)
    const postupdatetask =(e)=>{
        dispatch(updatataksform(updatedTask))
        e.preventDefault()
        dispatch({
            type: "updatetask",
            payload: notesdata.map((i) => i._id === updatedTask._id ? updatedTask  : i)
        })
        setUpdate(false)
    }
    const {msg, user, errorsdata } = useSelector((state) => state.auth)
    const [note, setNote] = useState([])
    const [deleted, setDeleted] = useState({
        userid: user._id, delteteditem: null
    })
    useEffect(() => {
        if (deleted.delteteditem !== null) {
            dispatch(deletetask(deleted))
            dispatch({
                type: "updatetask",
                payload: notesdata.filter((i) => i._id !== deleted.delteteditem)
            })
        }
    }, [deleted])
    const [page, setPage] = useState()
    useEffect(() => {
        if (a === '/') {
            setPage("All Tasks")
            setNote(notesdata)
        }
        else if (a === '/completed') {
            setPage("Completed")
            setNote(notesdata.filter((i) => i.completed === true))
        }
        else if (a === '/important') {
            setPage("Important!")
            setNote(notesdata.filter((i) => i.important === true))
        }
        else {
            setPage("Do It Now")
            setNote(notesdata.filter((i) => i.incomplete === true))
        }
    }, [a, notesdata])
    const [completed, setCompleted] = useState(null)

    useEffect(() => {
        if (completed) {
            dispatch(updatetask(completed))
            // console.log(completed);
            dispatch({
                type: "updatetask",
                payload: notesdata.map((i) => i._id === completed._id ? completed : i)
            })
        }
    }, [completed])

    useEffect(() => {
        if (errorsdata.length !== 0) {
            setTimeout(() => {
                dispatch({
                    type: "clearerror"
                })
            }, 2000);
        }
    }, [errorsdata])
    const dispatch = useDispatch()
    const [obj, setObj] = useState({
        title: "", description: "", date: "", completed: false, important: false
    })
    const [task, setTask] = useState(false)
    const postdata = (e) => {
        e.preventDefault()
        dispatch(createnote({ user, obj }))
    }
    useEffect(()=>{
      if(msg==='task added'){
           setObj({ title: "", description: "", date: "", completed: false, important: false})
           dispatch({
            type:"clearmessage"
           })
           setTask(false)
      }
    },[msg])
    return (
        <>
            <div className='main bg-[#3632324d]  h-full overflow-y-auto rounded-md border-slate-700 border-solid border-2'>
                <div className=' py-4 px-4 flex justify-between'>
                    <h1 className=' font-medium text-white text-xl ml-2 md:ml-0'>
                        <p>{page}</p>
                        <div className="line bg-green-300 w-9 h-[0.2rem] mt-2"></div>
                    </h1>
                    <IoMdAdd onClick={() => setTask(true)} className=' cursor-pointer text-gray-200 text-3xl border-slate-600 border-2 rounded-full py-1 px-1' />
                </div>
                <div className="notes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 pb-2 gap-y-4 gap-x-4">
                    {note.map((i) => <div  key={i._id} className=" cursor-pointer border-slate-500 border-2 border-solid bg-[#9e9e9e1f] note rounded-md px-2 py-3 text-white flex flex-col justify-between ">
                        <div>
                            <h1 className="title font-medium">{i.title}</h1>
                            <p className="description mt-2 text-lg">
                                {i.description.length >= 60 ? `${i.description.slice(0, 60)}...` : i.description}
                            </p>
                        </div>
                        <div>
                            <p className='data mt-8'>{(i.date).slice(0,10)}</p>
                            <div className="extras flex justify-between items-center mt-3">
                                <button onClick={i.completed ? () => setCompleted({ ...i, completed: false, incomplete: true }) : () => setCompleted({ ...i, completed: true, incomplete: false })} style={i.completed ? { backgroundColor: '#2e932e' } : { backgroundColor: "#c62727" }} className=' font-medium rounded-full px-4 py-1'>Completed</button>
                                <div className="deleteupdate text-2xl flex items-center ">
                                    <MdEditSquare onClick={()=> {setUpdate(true) , setUpdatedTask(i)}}/>
                                    <MdDelete className=' ml-1 sm:ml-0'  onClick={() => setDeleted({ ...deleted, delteteditem: i._id })}/>
                                </div>
                            </div>
                        </div>

                    </div>)}
                    <div onClick={() => setTask(true)} className='border-slate-500 border-2 border-solid bg-[#9e9e9e1f] note rounded-md px-2 py-3 h-60 md:h-52 text-gray-400 text-lg cursor-pointer flex items-center justify-center '>+ Add New Task</div>
                </div>
            </div>
            {task && <div className=' bg-transparent flex justify-center items-center  fixed z-20 h-full w-full top-0 left-0 px-3 lg:px-0 py-3'>
                <div className='scroll bg-[#454343] overflow-y-auto  sm:w-[29rem] w-full py-3 rounded-md text-gray-300 px-4 flex flex-col xl:h-[34rem]'>
                    <h1 className=' font-medium text-xl'>Create a Task</h1>
                    <form className=' flex flex-col items-end' onSubmit={postdata}>
                        <div className="title flex flex-col py-3 w-full">
                            <label htmlFor="title" className=' font-medium mb-2'>Title</label>
                            <input type="text" value={obj.title} className=' text-black rounded-md px-2 outline-none h-9 bg-white ' placeholder='Eg. Its my first task' onChange={(e) => setObj({ ...obj, title: e.target.value })} required />
                        </div>
                        <div className="title flex flex-col py-3 w-full">
                            <label htmlFor="description" className=' font-medium mb-2'>Description</label>
                            <textarea name="" value={obj.description} placeholder='Eg. Walk 2km tonight after dinner' id="" cols="30" rows="5" className='px-2 py-1 rounded-md bg-white text-black outline-none' onChange={(e) => setObj({ ...obj, description: e.target.value })} required></textarea>
                        </div>
                        <div className="title flex flex-col py-3 w-full">
                            <label htmlFor="date" className=' font-medium mb-2'>Date</label>
                            <input type="date" value={obj.date} className=' px-2 rounded-md h-9 outline-none bg-white text-black' placeholder='' onChange={(e) => setObj({ ...obj, date: e.target.value })} required />
                        </div>
                        <div className="title flex justify-between items-center py-3 w-full">
                            <label htmlFor="completed" className='font-medium'>Toggle Completed</label>
                            <input type="checkbox" value={obj.completed} className=' rounded-md  outline-none  bg-white text-black' placeholder='' onChange={() => setObj({ ...obj, completed: obj.completed ? false : true })} />
                        </div>
                        <div className="title flex justify-between items-center py-3 w-full">
                            <label htmlFor="completed" className='font-medium'>Toggle Important</label>
                            <input type="checkbox" checked={obj.important} className=' rounded-md  outline-none  bg-white text-gray-400' placeholder='' onChange={() => setObj({ ...obj, important: obj.important ? false : true })} />
                        </div>
                        <div className=' flex items-center'>
                            <input type="submit" value='+ Create Task' className=' cursor-pointer text-white font-medium bg-blue-400 px-4 py-1 rounded-md text-md md:text-lg' />
                            <button onClick={() => {
                                setTask(false), setObj({ title: "", description: "", date: "", completed: false, important: false })
                            }} className=' font-medium px-4 py-1 text-white bg-red-500 rounded-md ml-2 text-md md:text-lg'>Close</button>
                        </div>
                    </form>
                </div>
                <div className='errordata absolute sm:right-0 top-0 w-full px-3 sm:w-[20rem]'>
                    {errorsdata.map((i) => <div key={i.path} className='errname bg-red-600 text-lg text-white font-medium px-1 rounded-md my-3'>
                        {i.msg}
                    </div>)}

                </div>
            </div>}
            {update && <div className=' bg-transparent flex justify-center items-center  fixed z-20 h-full w-full top-0 left-0 px-3 lg:px-0 py-3'>
                <div className='scroll bg-[#454343] overflow-y-auto  sm:w-[29rem] w-full py-5 rounded-md text-gray-300 px-4 flex flex-col '>
                    <h1 className=' font-medium text-xl'>Update Task!</h1>
                    <form className=' flex flex-col items-end' onSubmit={postupdatetask} >
                        <div className="title flex flex-col py-3 w-full">
                            <label htmlFor="title" className=' font-medium mb-2'>Title</label>
                            <input type="text" value={updatedTask.title} className=' rounded-md px-2 outline-none h-9 bg-white text-gray-400' placeholder=''  required onChange={(e)=>setUpdatedTask({...updatedTask , title:e.target.value})}/>
                        </div>
                        <div className="title flex flex-col py-3 w-full">
                            <label htmlFor="description" className=' font-medium mb-2'>Description</label>
                            <textarea name="" value={updatedTask.description} id="" cols="30" rows="5" className='px-2 py-1 rounded-md bg-white text-gray-400 outline-none' required onChange={(e)=>setUpdatedTask({...updatedTask , description:e.target.value})}></textarea>
                        </div>
                        <div className="title flex justify-between items-center py-3 w-full">
                            <label htmlFor="completed" className='font-medium'>Toggle Important</label>
                            <input type="checkbox" checked={updatedTask.important}  className=' rounded-md  outline-none  bg-white text-gray-400' placeholder='' onChange={()=>setUpdatedTask({...updatedTask , important:updatedTask.important? false : true})}/>
                        </div>
                        <div className=' flex items-center'>
                            <input type="submit" value='Update' className=' cursor-pointer text-white font-medium bg-blue-400 px-4 py-1 rounded-md text-md md:text-lg' />
                            <button onClick={()=>setUpdate(false)} className=' font-medium px-4 py-1 text-white bg-red-500 rounded-md ml-2 text-md md:text-lg'>Close</button>
                        </div>
                    </form>
                </div>
                <div className='errordata absolute sm:right-0 top-0 w-full px-3 sm:w-[20rem]'>
                    {errorsdata.map((i) => <div key={i.path} className='errname bg-red-600 text-lg text-white font-medium px-1 rounded-md my-3'>
                        {i.msg}
                    </div>)}

                </div>
            </div>}
        </>
    )
}

export default All
