import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='mt-1 ' style={{position: 'fixed', top: '0', left: 0, width: '100vw'}} >
           <div className='container-fluid nav-clr text-white rounded-2xl py-2 flex' >

               <div className='flex h-full items-center'>
               <img src="https://st2.depositphotos.com/43025966/43029/i/450/depositphotos_430293310-stock-photo-minimalistic-logo-your-company.jpg" className='w-16 h-16 mr-2' />
              <p className='text-2xl mt-3'> Ultimate Gadgeting</p>
               </div>
           </div>
        </nav>
      
    </div>
  )
}

export default Navbar
