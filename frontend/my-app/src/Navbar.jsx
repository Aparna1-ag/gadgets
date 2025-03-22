import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div>
        <nav className='mt-1 z-40' style={{position: 'fixed', top: '-4px', left: 0, width: '100vw', background: '#020E1E'}} >
           <div className='container-fluid nav-clr text-white rounded-2xl py-2 flex' >

            <Link to="/" className='no-underline text-decoration-none text-white'>
            <div className='flex h-full items-center'>
               {/* <img src="https://st2.depositphotos.com/43025966/43029/i/450/depositphotos_430293310-stock-photo-minimalistic-logo-your-company.jpg" className='w-16 h-16 mr-2' /> */}
               <img src="https://png.pngtree.com/png-vector/20230607/ourmid/pngtree-letter-logo-for-company-vector-png-image_7123299.png" className='w-10 h-10 mr-4' />

             
              <p className='text-2xl mt-3 no-underline text-white' style={{textDecoration: "none"}}> Ultimate Gadgeting</p>
               </div></Link>
           </div>
        </nav>
      
    </div>
  )
}

export default Navbar
