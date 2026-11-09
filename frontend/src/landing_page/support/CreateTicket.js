import React from 'react';

function CreateTicket() {
  return (
    <div className='container'>
      <div className='row p-5 mb-5 mt-5'>
        <h1 className='fs-4 text-center'>To create a ticket, select a relevant topic</h1>

        <div className='col-4 p-5 mb-2 mt-2'>
          <h4 className='fs-5'><i className="fa-solid fa-circle-plus"></i> Account Opening</h4>
          <a href='#offline' style={{ textDecoration: "none", lineHeight: "2.5" }}>Offline Account Opening</a><br />
          <a href='#online' style={{ textDecoration: "none", lineHeight: "2.5" }}>Online Account Opening</a><br />
          <a href='#company' style={{ textDecoration: "none", lineHeight: "2.5" }}>Company, Partnership and HUF Account</a><br />
          <a href='#opening' style={{ textDecoration: "none", lineHeight: "2.5" }}>Opening</a><br />
          <a href='#nri' style={{ textDecoration: "none", lineHeight: "2.5" }}>NRI Account Opening</a><br />
          <a href='#charges' style={{ textDecoration: "none", lineHeight: "2.5" }}>Charges at Zerodha</a><br />
          <a href='#idfc' style={{ textDecoration: "none", lineHeight: "2.5" }}>Zerodha IDFC FIRST Bank 3-in-1 Account</a><br />
          <a href='#started' style={{ textDecoration: "none", lineHeight: "2.5" }}>Getting Started</a><br />
        </div>

        <div className='col-4 p-5 mb-2 mt-2'>
          <h4 className='fs-5'><i className="fa-solid fa-user"></i> Your Zerodha Account</h4>
          <a href='#credentials' style={{ textDecoration: "none", lineHeight: "2.5" }}>Login Credentials</a><br />
          <a href='#modification' style={{ textDecoration: "none", lineHeight: "2.5" }}>Account Modification and Segment Addition</a><br />
          <a href='#dpid' style={{ textDecoration: "none", lineHeight: "2.5" }}>DP ID and bank details</a><br />
          <a href='#profile' style={{ textDecoration: "none", lineHeight: "2.5" }}>Your Profile</a><br />
          <a href='#transfer' style={{ textDecoration: "none", lineHeight: "2.5" }}>Transfer and conversion of shares</a><br />
        </div>

        <div className='col-4 p-5 mb-2 mt-2'>
          <h4 className='fs-5'><i className="fa-solid fa-chart-simple"></i> Trading & Markets</h4>
          <a href='#margin' style={{ textDecoration: "none", lineHeight: "2.5" }}>Margin/leverage, Product and Order types</a><br />
          <a href='#kite' style={{ textDecoration: "none", lineHeight: "2.5" }}>Kite Web and Mobile</a><br />
          <a href='#faqs' style={{ textDecoration: "none", lineHeight: "2.5" }}>Trading FAQs</a><br />
          <a href='#corporate' style={{ textDecoration: "none", lineHeight: "2.5" }}>Corporate Actions</a><br />
          <a href='#sentinel' style={{ textDecoration: "none", lineHeight: "2.5" }}>Sentinel</a><br />
          <a href='#api' style={{ textDecoration: "none", lineHeight: "2.5" }}>Kite API</a><br />
          <a href='#pi' style={{ textDecoration: "none", lineHeight: "2.5" }}>Pi and other platforms</a><br />
          <a href='#reports' style={{ textDecoration: "none", lineHeight: "2.5" }}>Stockreports+</a><br />
          <a href='#gtt' style={{ textDecoration: "none", lineHeight: "2.5" }}>GTT</a><br />
        </div>

        <div className='col-4 p-5 mb-2 mt-2'>
          <h4 className='fs-5'><i className="fa-solid fa-wallet"></i> Funds</h4>
          <a href='#add-funds' style={{ textDecoration: "none", lineHeight: "2.5" }}>Adding Funds</a><br />
          <a href='#withdrawal' style={{ textDecoration: "none", lineHeight: "2.5" }}>Fund Withdrawal</a><br />
          <a href='#emandates' style={{ textDecoration: "none", lineHeight: "2.5" }}>eMandates</a><br />
          <a href='#bank-accounts' style={{ textDecoration: "none", lineHeight: "2.5" }}>Adding Bank Accounts</a><br />
        </div>

        <div className='col-4 p-5 mb-2 mt-2'>
          <h4 className='fs-5'><i className="fa-regular fa-circle-dot"></i> Console</h4>
          <a href='#console-reports' style={{ textDecoration: "none", lineHeight: "2.5" }}>Reports</a><br />
          <a href='#ledger' style={{ textDecoration: "none", lineHeight: "2.5" }}>Ledger</a><br />
          <a href='#portfolio' style={{ textDecoration: "none", lineHeight: "2.5" }}>Portfolio</a><br />
          <a href='#challenge' style={{ textDecoration: "none", lineHeight: "2.5" }}>60 Day Challenge</a><br />
          <a href='#ipo' style={{ textDecoration: "none", lineHeight: "2.5" }}>IPO</a><br />
          <a href='#referral' style={{ textDecoration: "none", lineHeight: "2.5" }}>Referral Program</a><br />
        </div>

        <div className='col-4 p-5 mb-2 mt-2'>
          <h4 className='fs-5'><i className="fa-regular fa-circle"></i> Coin</h4>
          <a href='#mutual-funds' style={{ textDecoration: "none", lineHeight: "2.5" }}>Understanding Mutual Funds</a><br />
          <a href='#about-coin' style={{ textDecoration: "none", lineHeight: "2.5" }}>About Coin</a><br />
          <a href='#buying-coin' style={{ textDecoration: "none", lineHeight: "2.5" }}>Buying and Selling through Coin</a><br />
          <a href='#sip' style={{ textDecoration: "none", lineHeight: "2.5" }}>Starting an SIP</a><br />
          <a href='#managing-portfolio' style={{ textDecoration: "none", lineHeight: "2.5" }}>Managing your Portfolio</a><br />
          <a href='#coin-app' style={{ textDecoration: "none", lineHeight: "2.5" }}>Coin App</a><br />
          <a href='#moving-coin' style={{ textDecoration: "none", lineHeight: "2.5" }}>Moving to Coin</a><br />
          <a href='#govt-securities' style={{ textDecoration: "none", lineHeight: "2.5" }}>Government Securities</a><br />
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
