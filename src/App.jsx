import { Route, Routes } from "react-router-dom"
import Userlogin from "./user/Userlogin"
import Home from "./user/Home"
import Usersignup from "./user/Usersignup"
import Adminlogin from "./admin/Adminlogin"
import Admindashboard from "./admin/Admindashboard"

function App() {

  return (
    <>
     <Routes>
      {/* User Routes */}
      
      <Route path="/" element={<Userlogin/>}></Route>
      <Route path="/login" element={<Userlogin/>}></Route>
      <Route path="/signup" element={<Usersignup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>

      {/* Admin Routes */}

      <Route path="/adminlogin" element={<Adminlogin/>}></Route>
      <Route path="/admindashboard" element={<Admindashboard/>}></Route>


     </Routes>
    </>
  )
}

export default App
