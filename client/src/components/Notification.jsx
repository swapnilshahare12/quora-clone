import React from 'react'

const Notification = ({userprofilepic,spacename,posttime,useraskedquestion}) => {
  return (
    <div className='notifications-center-bottom'>
      <div className='notifications-center-bottom-first'>
      <div className="notifications-center-bottom-first-left">
      <div className='user-profile-pic'>
          <img
            src={userprofilepic}
            alt=''
          />
        </div>
        <div className='user-space-details'>
                  <span className='user-space-name'>{spacename}</span>
          <span className='dot'>.</span>
          <span>Posted in Space you might like</span>
          <span className='dot'>.</span>
                  <span className='post-time'>{posttime}</span>
        </div>
      </div>
      <div className="notifications-center-bottom-first-right">
      <div className='threedot'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z'
              className='icon_svg-stroke'
              strokeWidth='1.5'
              stroke='#666'
              fill='none'
            ></path>
          </svg>
        </div>
      </div>
        
        
      </div>
      <div className='notifications-center-bottom-second'>
              <h1>{useraskedquestion}</h1>
      </div>
    </div>
  );
}

export default Notification