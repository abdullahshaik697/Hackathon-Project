import { useState } from "react"
import { auth, db } from "../firebase/config"
import { Link, useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"

const Usersignup = () =>{

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate() 


    const handleUserSignup = async (e) =>{
        e.preventDefault()
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          const uid = userCredential.user.uid;
          console.log(userCredential);
          console.log(userCredential.user);
          console.log(userCredential.user.uid);
          
          await setDoc(doc(db, "users", uid), {
            displayName: username,
            email: email,
          });
      
          alert("Signup Successful!\nNow login to your account.");
          navigate("/login");
    
        
    } catch (error) {
        console.log(error);
        
    }
    }

    return(
        <>

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Saylani Welfare Trust"
            src="data:image/jpeg;base64,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q87W2G0T3SyTho23xL3AIBFwBcEGwLHne5878oO738mb03ptWN3cPcAjSVLEBd72F9t+gj7hX4cLXHxhtN9hY2CkPcHvb7udz0A9YF5QpBVVRyUAe4WgbICBjUQEEEXB2MiaxMaRKHTqmmdDm68lf/1bwPn19ZhFppOreDb3MVbSHQXamdQH0hyYe76wJOXeuqpL3B5lTqC6tv1U7MD4EGRj5OO8edSbgxmY06Yu7j0G5PoJOXkY8cbtJNo0oMsDYnEdsw7lPl5W+SPXqZ5fHi3Jz+5MdoZRubbdQ7hQSTYDqZ7E2iI7tkRFNUhiLU13UHmx6MfLwHtmUROSdz4E2dA9gasRcK1udjb1ttGhRYDNKhKKXRnbD027zBB2g/Smw35Oht5jxgSVzyhTuK2Noaudg6rpHta59TaBQ4TOmxLmguMNJWLmk6qpqVwX20k3CBQyAgrqNwdhvA6TF5zSouUrP2YUUu+5Coxqs6IoJ+ddD7xAgYbiFFep2lTUlSuUpstmRQKVKykg9X12O+9xA0cWcTthqlCnSp9q7sC6AHV2ZIUEHkpLMLE7XFtr3BDRnGZlatZmxBprh1R00HUgDaldqyJ3m0nex2sAfEh90/GnUvh0cDUisPMA/bJ6rR4lSaVnzCBX4bwj/KwtI/uCaRnyR/tKk8fHP+sNP5IYH+50f4BJ/EZf5K/hcX8Ybk4foL+joUU/ylMpbLlt/tK0YMceKwkDLenaPbwWyD/SBOecdrfqtMr9EPEyiiDc0wx8Wux95lY4+OPjaemEtKQGwAHoLTWK1jxCYiIZ2lpSFYRotAQl7AQEBAQEBAQEBAQEDF1BFiLgyJjfkRfizL+jbb6Lbj2HmPrmPt2r+mRXY/LkqG70XVvpU7G/4+6cuXjUvO7V1P8ATOa7RaWS0Qbntm8tBHv2mFeFi3u25R0QuKOoALTo6QOWohQPYLmd9ImI1SNQ0jw2LhLkNUbWRyHJR6D8by0Yp3u07EoTaEvZIQMKqXBHjtsbfXArlyCgUCVKYrAMWvWtVOo7Xuw22AG3hAi5VwvSpMXcJUa7BPzaIqKTqChVFiQfnHfcwJeJyHDuGBoIpcBSyAI4C202dbEWsLWO1hAjNwvQKqra3UMGYVHNTtSu69pquWt0HKBOq5Ph2ADYemdKlV7i3VW5hTbu3v0gRsJw7QQEFWq6l0E1nat3Lg6e+TZe6NvIQN4yTDaSnxWjpJDFezSxI5G1uYuffAsAICAgICAgICAgICAgICAgICAgICAgICAgIHloC0jQSR7AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQED/2Q=="
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up as USER
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e)=> setUsername(e.target.value)}
                  required
                  className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  required
                  className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  
                  required
                  className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleUserSignup}
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </div>
        <p className="text-center mt-4">Already have an account? <Link className="text-green-700 hover:text-green-900" to={'/login'}>Log in</Link></p>
        </div>
      </div>
        </>
    )
}

export default Usersignup