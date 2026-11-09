import React from 'react';

function Hero() {
  return (
    <div className='container p-5 mb-5'>
      <div className='row text-center'>
        <img src='media/images/homeHero.png' alt='Zerodha Hero' className='mb-5' />
        <h1 className='mt-5'>Invest in everything</h1>
        <p>
          Online platform to invest in stocks, mutual funds, and more.
        </p>
        <a
          href='/signup'
          className='p-2 btn btn-primary fs-5 mb-5'
          style={{ width: "20%", minWidth: "180px", margin: "0 auto", textDecoration: "none" }}
        >
          Sign up now
        </a>
      </div>
    </div>
  );
}

export default Hero;
