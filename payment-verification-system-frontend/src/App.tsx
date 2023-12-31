import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Protected from './pages/Protected';
import Root from './pages/Root';
import Login from './pages/Login';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import RegisterPage from './pages/RegisterPage';


function App() {
const router = createBrowserRouter(
createRoutesFromElements(
  <>
  <Route element={<Root/>}>
    <Route element={<Protected/>}>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/checkout/:id" element={<Checkout/>}></Route>
     
    </Route>
  
  </Route>
  <Route>
    <Route path="/login" element = {<Login />}></Route>
    <Route path="/register" element = {<RegisterPage />}></Route>
  </Route>
  </>
)
 )
 return (
  <div>
    <RouterProvider router={router}/>
  </div>
 )
}

export default App
