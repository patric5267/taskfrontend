export const signup = (user) => async (dispatch) => {
    try {
        dispatch({
            type: "signuserpending"
        })
        const data = await fetch('https://precious-cuff-mite.cyclic.app/createuser', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(user)
        })
        const res = await data.json()
        if (res.errors) {
            dispatch({
                type: 'signuserrejected',
                payload: res.errors
            })
        }
        else {
            dispatch({
                type: "signusersuccess",
                payload: res.msg
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const login = (user) => async (dispatch) => {
    try {
        dispatch({
            type: "loginuserpending"
        })
        const data = await fetch('https://precious-cuff-mite.cyclic.app/loginuser', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(user)
        })
        const res = await data.json()
        if (res.msg === 'invalid credentials') {
            dispatch({
                type: 'loginuserrejected',
                payload: res.msg
            })
        }
        else {
            dispatch({
                type: "loginusersuccess",
                payload: res.msg
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const getuser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getuserpending"
        })
        const data = await fetch(`https://precious-cuff-mite.cyclic.app/getuser/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            }
        })
        const res = await data.json()
        if (res) {
            dispatch({
                type: "getusersuccess",
                payload: res
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const createnote = (userdata) => async (dispatch) => {
    try {
        dispatch({
            type: "createtaskpending"
        })
        const data = await fetch(`https://precious-cuff-mite.cyclic.app/createtask/${userdata.user._id}`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(userdata.obj)
        })
        const res = await data.json()
        if (res.errors) {
            dispatch({
                type: "createtaskrejected",
                payload: res.errors
            })
        }
        else {
            dispatch({
                type: 'createtasksuccess',
                payload: res
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const updatetask = (taskinfo) => async (dispatch) => {
    try {
        await fetch(`https://precious-cuff-mite.cyclic.app/updatetask/${taskinfo._id}`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(taskinfo)
        })
       
    } catch (error) {
        console.log(error);
    }

}

export const deletetask = (deletedtask) => async () => {
    try {
        await fetch('https://precious-cuff-mite.cyclic.app/deletetask', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(deletedtask)
        })

    } catch (error) {
        console.log(error);
    }
}

export const updatataksform = (formdata) => async () => {
    try {
        await fetch('https://precious-cuff-mite.cyclic.app/updatefortask', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formdata)
        })

    } catch (error) {
        console.log(error);
    }

}