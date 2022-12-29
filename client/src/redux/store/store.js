import {configureStore} from '@reduxjs/toolkit'
import customerReducer from './features/customer'
import employeeReducer from './features/employee'

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        customer: customerReducer,

    }
  });


export default store