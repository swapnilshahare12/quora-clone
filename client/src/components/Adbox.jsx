import React from 'react'
import '../componentscss/Adbox.css'

const Adbox = () => {
  return (
    <div className='home-right'>
      <div className='advertisement-box'>
        <div className='ad-icons'>
          <div className='ad-info-icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              viewBox='0 0 15 15'
            >
              <path d='M7.5,1.5a6,6,0,1,0,0,12a6,6,0,1,0,0,-12m0,1a5,5,0,1,1,0,10a5,5,0,1,1,0,-10ZM6.625,11l1.75,0l0,-4.5l-1.75,0ZM7.5,3.75a1,1,0,1,0,0,2a1,1,0,1,0,0,-2Z'></path>
            </svg>
          </div>
          <div className='ad-close-icon'>
            <img
              src='https://static.criteo.net/flash/icon/close_button.svg'
              alt=''
            />
          </div>
        </div>
        <div className='image-1'>
          <img src='/images/ad1.png' alt='' />
        </div>
        <div className='ad-icons'>
          <div className='ad-info-icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              viewBox='0 0 15 15'
            >
              <path d='M7.5,1.5a6,6,0,1,0,0,12a6,6,0,1,0,0,-12m0,1a5,5,0,1,1,0,10a5,5,0,1,1,0,-10ZM6.625,11l1.75,0l0,-4.5l-1.75,0ZM7.5,3.75a1,1,0,1,0,0,2a1,1,0,1,0,0,-2Z'></path>
            </svg>
          </div>
          <div className='ad-close-icon'>
            <img
              src='https://static.criteo.net/flash/icon/close_button.svg'
              alt=''
            />
          </div>
        </div>
        <div className='image-2'>
          <img src='/images/ad2.png' alt='' />
        </div>
      </div>
      <div className='ad-headline'>
        <p>advertisement</p>
      </div>
    </div>
  );
}

export default Adbox