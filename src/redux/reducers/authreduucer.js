import { createReducer } from "@reduxjs/toolkit";

const initialstates = {
    user:null,
    notes:[],
    user: null,
    errorsdata: [],
    isloading: false,
    value: 0,
    msg:null
}

export const authreducer = createReducer(initialstates, (builder) => {
    builder.addCase("signuserpending", (state) => {
        state.isloading = true
    })
    builder.addCase("signusersuccess", (state, action) => {
        state.isloading = false
        state.msg = action.payload
    })
    builder.addCase("signuserrejected", (state, action) => {
        state.isloading = false
        state.errorsdata = action.payload
    })
    builder.addCase("loginuserpending", (state) => {
        state.isloading = true
    })
    builder.addCase("loginusersuccess", (state,action) => {
        state.isloading = false
        state.msg = action.payload
    })
    builder.addCase("loginuserrejected", (state,action) => {
        state.isloading = false
        state.msg = action.payload
    })
    builder.addCase("getuserpending" , (state)=>{
        state.isloading=true
    })
    builder.addCase("getusersuccess" , (state,action)=>{
        state.isloading=false
        state.user=action.payload
        state.notes=action.payload.tasks
    })
    builder.addCase("createtaskpending" , (state)=>{
        state.isloading=true
    })
    builder.addCase("createtaskrejected" , (state,action)=>{
        state.isloading=false
        state.errorsdata=action.payload
    })
    builder.addCase("createtasksuccess" , (state,action)=>{
        state.isloading=false
        state.notes=action.payload[0].user.tasks
        state.msg=action.payload[1].msg
    })
    builder.addCase("clearerror", (state) => {
        state.errorsdata = []
    })
    builder.addCase("clearmessage", (state) => {
        state.msg = null
    })
    builder.addCase("updatetask", (state,action) => {
        state.notes=action.payload
    })
    builder.addCase("clearuser" , (state)=>{
        state.user=null
    })
})