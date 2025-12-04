import { createBrowserRouter,RouterProvider } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage"
import Applayout from "./LayOut/Applayout"
import SignIn from "./pages/SignIn"
import SignUp from './pages/SignUp'
import Home from "./pages/Home"
import PrivateRoute from "./routes/privateRoute"
import PublicRoute from "./routes/PublicRoute"
function App() {
const router = createBrowserRouter([
  {
    path:"/",
    errorElement:<ErrorPage/>,
    element:<PrivateRoute>
      <Applayout/>
    </PrivateRoute>,
    children:[
      {
        path:"/",
        element:<Home/>
      }
    ]
  },
  {
    path:"/signin",
    element:<PublicRoute>
      <SignIn/>
    </PublicRoute>
  },
   {
    path:"/signup",
    element:<PublicRoute>
      <SignUp/>
    </PublicRoute>
  }
])
  return <RouterProvider router={router}/>
}

export default App
