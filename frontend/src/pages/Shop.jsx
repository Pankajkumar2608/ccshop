import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
import Filter from '../components/Filter'
import { useNavigate } from 'react-router'

const Shop = () => {
  const navigate = useNavigate();
  
    const isAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true,
        });
        if (response.status === 200) {
          return;
        }
      } catch (error) {
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };
    isAuth();
 
  return (
    <div className='font-nunito bg-gray-700'>
        <Navbar/>
        <Filter/>
       
        <Body/>
    </div>

    

  )
}

export default Shop