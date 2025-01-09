import axios from 'axios';
import React, { useContext} from 'react'
import Body from './Body';



const Filter = () => {
    const handleFilter = async() => {
        try {
            const fetch = await axios.get('http://localhost:3000/api/filter', {withcredentials: true});
            

            

        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    }
    

    
    return (
        <div className="p-6 w-full mx-auto bg-gray-200 rounded-xl mt-2 shadow-lg font-nunito">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:transform hover:scale-105 transition-all duration-300'>
                    <label className='text-black font-semibold min-w-[90px]'>Bin:</label>
                    <input 
                        type="text" 
                        placeholder="Enter bin number" 
                        className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    />
                </div>
             
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:transform hover:scale-105 transition-all duration-300'>
                    <label className='text-black font-semibold min-w-[90px]'>Country:</label>
                    <input 
                        type="text" 
                        placeholder="Type country name" 
                        className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    />
                </div>
                
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:transform hover:scale-105 transition-all duration-300'>
                    <label className='text-black font-semibold min-w-[90px]'>Base:</label>
                    <select 
                        className='w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                    >
                        <option>dec 2024</option>
                        <option>jan 2025</option>
                        <option>feb 2025</option>
                    </select>
                </div>
             
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:transform hover:scale-105 transition-all duration-300'>
                    <label className='text-black font-semibold min-w-[90px]'>Zip:</label>
                    <input 
                        type="text" 
                        placeholder="Enter zip code" 
                        className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    />
                </div>

                <div className='col-span-1 md:col-span-2 flex justify-center mt-4'>
                    <button
                        className='px-8 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300'
                    >
                        Filter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filter
