import React from 'react'
import { FaHome, FaPhoneAlt, FaCamera } from 'react-icons/fa'
import { BsPeopleFill, BsFillEnvelopeOpenFill } from 'react-icons/bs'
import '../style/footer.css'
const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer_item">
        <FaHome size={25} className='footer_icon' />
      </div>

      <FaPhoneAlt size={25} className='footer_icon' />


      <FaCamera size={25} className='footer_icon' />


      <BsPeopleFill size={25} className='footer_icon' />


      <BsFillEnvelopeOpenFill size={25} className='footer_icon' />

    </div>
  )
}

export default Footer;
