import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = {firstName: '', lastName: '', role: ''}

export const EmployeeSlice = createSlice({
    name: 'employee',
    initialState: {value: initialStateValue},
    reducers: {
        loginEmployee : (state, action) => {
            state.value = action.payload
        },

        logoutEmployee: (state) => {
            state.value = initialStateValue;
          },
    }
})

export const {loginEmployee , logoutEmployee} = EmployeeSlice.actions;

export default EmployeeSlice.reducer  