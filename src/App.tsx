import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"

import MainPage from "./Pages/MainPage"
import FilmPage from "./Pages/FilmPage"
import ErrorPage from "./Pages/ErrorPage"
import Header from "./components/Header"

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: '/movie/:movieId',
        element: <FilmPage/>
    },
])

function App() {  
  return (
    <Provider store={store}>
      <Header/>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App
