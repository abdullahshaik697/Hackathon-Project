import { useState } from "react"

const Navbar = ({setPage}) =>{

return (
    <>
     <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="text-3xl font-bold text-green-600">Saylani Welfare Trust</div>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
        <button className="bg-green-500 hover:bg-green-600 text-lg text-white px-4 py-2 rounded-md transition" onClick={()=> setPage("bookAppointments")}>Book Appointment</button>
        <button className="bg-green-500 hover:bg-green-600 text-lg text-white px-4 py-2 rounded-md transition" onClick={()=> setPage('requestHelp')}>Request Help</button>
        <button className="bg-green-500 hover:bg-green-600 text-lg text-white px-4 py-2 rounded-md transition" onClick={()=> setPage('myRequests')}>My Requests</button>
        <button className="bg-green-500 hover:bg-green-600 text-lg text-white px-4 py-2 rounded-md transition" onClick={()=> setPage('profile')}>Profile</button>
        <button className="bg-green-500 hover:bg-green-600 text-lg text-white px-4 py-2 rounded-md transition" onClick={()=> setPage('settings')}> Settings</button>
      </div>
    </div>
  </nav>
    </>
    )
}

export default Navbar 