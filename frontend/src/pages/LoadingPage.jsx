import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'




const LoadingPage = () => {
  const navigate = useNavigate();
  

  useEffect(() => {
    const isAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true,
        });
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate('/home');
        }
      } catch (error) {
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };
    isAuth();
  }, [navigate]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <h1>Loading...</h1>
    </div>
  )
}

export default LoadingPage;