import {createSlice, PayloadAction} from "@reduxjs/toolkit"


type InitialState = {
    usernameVerify:string
    socketMessage:string
}
const appSlice = createSlice({
    name:"appSlice",
    initialState:{
        usernameVerify:""as string,
        socketMessage:"" as string
    } as InitialState,
    reducers:{
        getUsernameVerify:{
            reducer:(state, action:PayloadAction<string>) => {
                state.usernameVerify = action.payload
            },
            prepare:(username:string) => {
                return{
                    payload:username
                }
            }
        },
        removeUsernameVerify:
        (state) => {
            state.usernameVerify = ""
        },
        getSocketMessage:{
            reducer:(state, action:PayloadAction<string>) => {
                state.socketMessage = action.payload
            },
            prepare:(message:string) => {
                return{
                    payload:message
                }
            }
        },
        removeSocketMessage:
        (state) => {
            state.socketMessage = ""
        },

    }

})

export const {
   getUsernameVerify,
   removeUsernameVerify,
   getSocketMessage,
   removeSocketMessage
} = appSlice.actions

export default appSlice.reducer