import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
  return (
    <div className='container p-5 mb-3'>
      <div className='row text-center'>
        <h1 className='mt-5 mb-3'>Open a Zerodha Account</h1>
        <p className='mb-3'>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
        </p>
        <Link
          to='/signup'
          className='p-2 btn btn-primary fs-5 mb-5'
          style={{ width: "20%", minWidth: "180px", margin: "0 auto", textDecoration: "none" }}
        >
          Sign up now
        </Link>
      </div>
    </div>
  );
}

export default OpenAccount;
