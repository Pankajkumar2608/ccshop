import React from 'react'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
import Filter from '../components/Filter'

const Shop = () => {
  const isAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/isAuth", {
        withCredentials: true,
      });

      if (response.status === 200) {
        Navigate('/shop');
      } else {
        Navigate('/signin');
        
      }
    } catch (error) {
      Navigate('/signin');
      
    }
}
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