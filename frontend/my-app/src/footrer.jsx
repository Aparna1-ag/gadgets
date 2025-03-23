import React from 'react'

const Footer = () => {

    let footerWhite = false

    if (window.location.href.includes('gadgetdetails') || window.location.href.includes('postnewgadget')) {
        footerWhite = true
    }


  return (
    <div>

        <footer>
            <div className={`w-screen ${footerWhite? 'bg-white text-blue-950' : 'text-white'}`}>
                <div className='w-11/12 mx-auto flex justify-between py-3 '>
                <div> © 2025 UltimateGadgeting</div>

<div className='flex '>
<i className="fa-brands fa-instagram mx-3 text-2xl "></i>
<i className="fa-brands fa-facebook mx-3 text-2xl"></i>
<i className="fa-brands fa-x-twitter mx-3 text-2xl"></i>
</div>
                </div>

            </div>
        </footer>
      
    </div>
  )
}

export default Footer
