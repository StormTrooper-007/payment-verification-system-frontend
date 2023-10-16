import {createSlice, PayloadAction} from "@reduxjs/toolkit"


type InitialState = {
    usernameVerify:string
    socketMessage:string
}
const appSlice = createSlice({
    name:"appSlice",
    initialState:{
        socketMessage:"" as string
    } as InitialState,
    reducers:{
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
   getSocketMessage,
   removeSocketMessage
} = appSlice.actions

export default appSlice.reducer