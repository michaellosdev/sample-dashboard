
import React from "react";
import ReactDom from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store/store'

//importing styles
import './styles/utils.css'
import './styles/globalStyles.css'



import App from './App'
import ScrollToTop from "./utils/ScrollToTop";



ReactDom.render(
   <BrowserRouter>
      <Provider store={store}>
         <ScrollToTop />
         <App />
      </Provider>
   </BrowserRouter>

, document.getElementById('root'))