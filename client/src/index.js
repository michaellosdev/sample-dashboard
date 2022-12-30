
import React from "react";
import ReactDom from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store/store'
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

//importing styles
import './styles/utils.css'
import './styles/globalStyles.css'



import App from './App'
import ScrollToTop from "./utils/ScrollToTop";

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDom.render(
   <BrowserRouter>
      <Provider store={store}>
         <ScrollToTop />
         <App />
      </Provider>
   </BrowserRouter>

, document.getElementById('root'))