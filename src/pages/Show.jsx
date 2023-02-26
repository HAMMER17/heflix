import React from 'react'
import '../style/show.css'
import tv from '../images/home-tv.jpg'
import mobile from '../images/home-mobile.jpg'
import mac from '../images/home-imac.jpg'

const Show = () => {
  return (
    <div className='show'>
      <div className="show_tv">
        <img src={tv} alt="tv" />
        <div className="show_text">
          <h1>Enjoy on your TV.</h1>
          <h3>
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
          </h3>
        </div>
      </div>
      <div className="show_mobile">
        <img src={mobile} alt="mobile" />
        <div className="show_text">
          <h1>Download your programmes to watch on the go</h1>
          <h3>
            Save your data and watch all your favourites offline
          </h3>
        </div>
      </div>
      <div className="show_mac">
        <img src={mac} alt="mac" />
        <div className="show_text">
          <h1>Watch everywhere</h1>
          <h3>Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more.</h3>
        </div>
      </div>
    </div>
  )
}

export default Show
