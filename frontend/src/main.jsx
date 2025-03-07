import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootreducer from './Redux/reducer.js'

const store = configureStore({
   reducer : rootreducer
 })
 
 

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <Toaster/>
      <App />
   </Provider>
)
