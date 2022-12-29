import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = {firstName: '', lastName: ''}

export const CustomerSlice = createSlice({
    name: 'customer',
    initialState: {value: initialStateValue},
    reducers: {
        loginCustomer : (state, action) => {
            state.value = action.payload
        },

        logoutCustomer: (state) => {
            state.value = initialStateValue;
          },
    }
})

export const {loginCustomer , logoutCustomer} = CustomerSlice.actions;

export default CustomerSlice.reducer