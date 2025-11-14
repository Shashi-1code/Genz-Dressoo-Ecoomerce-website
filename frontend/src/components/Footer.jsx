import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} className='mb-5 w-32' alt=""></img>
        <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam illum enim aut placeat recusandae, dolore culpa doloremque ex tenetur laborum quis consectetur esse est autem voluptatem eligendi a quae. Quas!
        </p>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>
            COMPANY
        </p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-222-465-4335</li>
            <li>contact@genzdrresoo.com</li>
        </ul>
      </div>
    </div>
    <div>
        <hr/>
        <p className='py-5 text-sm text-center '>
            &copy; 2024 Genzdrresoo.com All rights reserved.
        </p>
    </div>
    </div>
  )
}

export default Footer
