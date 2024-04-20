import "./App.css";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AllMovies from "./AllMovies";
import SingleMovie from "./components/SingleMovie";
import {Provider} from 'react-redux'
import store from './store'

const router = createBrowserRouter([
  {
     path: '/',
     element: <AllMovies />
  },
  {
    path: '/movie/:movieId',
    element: <SingleMovie />
  }, 
 
 ])
 
 function App() {
  return (
     <Provider store={store}>
       <RouterProvider router={router}/>
     </Provider>
  )
 }

export default App;
