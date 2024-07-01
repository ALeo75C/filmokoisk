import {createSlice} from '@reduxjs/toolkit'
import { getUser } from '../thunk'


type initialStateType = {
    requestStatus: string,
    token?: string
}

const initialState: initialStateType = {
    requestStatus: 'idle',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const token = action.payload
            console.log(token)
            state.token = token
        },
        deleteUser: (state) => {
            delete state.token
            delete localStorage.token
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.requestStatus = 'pending'
            })
            .addCase(getUser.fulfilled, (state, {payload}) => {
                state.token = payload.token
                state.requestStatus = 'fulfilled'
            })
            .addCase(getUser.rejected, (state, payload) => {
                console.log(payload.error.message)
                state.requestStatus = 'rejected'
            })
    }
})

export const {addUser, deleteUser} = userSlice.actions