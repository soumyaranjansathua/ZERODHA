import React from 'react';

function Education() {
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-6'>
          <img src='/media/images/education.svg' alt='Zerodha Varsity' style={{ width: "70%" }} />
        </div>

        <div className='col-6'>
          <h1 className='mb-3 fs-2'>Free and open market education</h1>
          <p>Varsity, the largest online stock market education platform, is dedicated to making financial literacy accessible to everyone.</p>
          <a href='https://zerodha.com/varsity/' target='_blank' rel='noreferrer' style={{ textDecoration: "none" }}>
            Varsity <i className="fa-solid fa-arrow-right"></i>
          </a>

          <p className='mt-5'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
          <a href='https://tradingqna.com/' target='_blank' rel='noreferrer' style={{ textDecoration: "none" }}>
            TradingQ&A <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
