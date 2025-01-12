import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'



const LoadingPage = () => {
    const Navigate = useNavigate();
    const isAuth = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/isAuth", {
            withCredentials: true,
          });
          if (response.status === 200) {
            Navigate('/home');
          } else {
            Navigate('/signin');
            
          }
        } catch (error) {
          Navigate('/signin');
          
        }
    }

    useEffect(() => {
        isAuth();
    }, []);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <h1>Loading...</h1>
    </div>
  )
}

export default LoadingPage;