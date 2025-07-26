import { useEffect, useState } from "react"
import  Navbar  from "./components/Navbar"
import Myprofile from "./components/Myprofile"
import Myrequest from "./components/Myrequest"
import Bookappointment from "./components/Bookappointment"
import Requesthelp from "./components/Requesthelp"
import Settings from "./components/Settings"
import { auth, db } from "../firebase/config"
import { doc , getDoc } from "firebase/firestore"


const Home  = () =>{

  const [name, setName] = useState("Loading...");

    useEffect(() => {
      const getUserInfo = async () => {
        try {
          const userId = auth.currentUser?.uid;
          if (!userId) {
            console.log("User not logged in");
            return;
          }
  
          const userRef = doc(db, 'users', userId); // ✅ correct path
          const userSnap = await getDoc(userRef);
  
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setName(userData.displayName);
          } else {
            setName("No Name Found");
            console.log("No such user found");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
  
      getUserInfo();
    }, []);
  
  const [page, setPage ] = useState('profile')
    
    return(

        <>

          <div className="flex flex-row items-center justify-between bg-green-500 px-32 py-20 text-center">
          <img className="" src="https://saylaniwelfareusa.com/static/media/logo_saylaniwelfareusa.22bf709605809177256c.png" alt="Saylani Welfare Trust" />
        <div>

        <h1 className="text-4xl sm:text-5xl font-bold text-[#fff] mb-4">
          Welcome, {name}
        </h1>
        <p className=" text-lg text-[#fff] sm:text-xl max-w-xl">
          Manage your appointments, requests, and account settings from the dashboard below.
        </p>
      </div>
        </div>
    
        <Navbar setPage={setPage}/>

        <div>
        { page=== 'profile' ? <Myprofile/> :
         page=== 'requestHelp' ? <Requesthelp/> :
         page=== 'bookAppointments' ? <Bookappointment/>:
         page=== 'myRequests' ? <Myrequest/>: 
         page=== 'settings' ? <Settings/>: <Myprofile/> }

        </div>

        </>
    )
}

export default Home 