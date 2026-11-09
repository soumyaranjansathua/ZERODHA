import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='bg-light'>
      <div className='container border-top mt-5'>
        <div className='row mt-5'>
          <div className='col'>
            <img src='/media/images/logo.svg' alt='Zerodha' style={{ width: "50%" }} />
            <p>&copy; 2010-2026, Not Zerodha Broking Ltd. All rights reserved.</p>
          </div>
          <div className='col'>
            <p className='fw-bold'>Company</p>
            <Link to='/about' style={{ textDecoration: 'none', color: 'black' }}>About</Link><br />
            <Link to='/product' style={{ textDecoration: 'none', color: 'black' }}>Products</Link><br />
            <Link to='/pricing' style={{ textDecoration: 'none', color: 'black' }}>Pricing</Link><br />
            <a href='#referral' style={{ textDecoration: 'none', color: 'black' }}>Referral programme</a><br />
            <a href='#careers' style={{ textDecoration: 'none', color: 'black' }}>Careers</a><br />
            <a href='https://zerodha.tech' target='_blank' rel='noreferrer' style={{ textDecoration: 'none', color: 'black' }}>Zerodha.tech</a><br />
            <a href='#press' style={{ textDecoration: 'none', color: 'black' }}>Press & media</a><br />
            <a href='#csr' style={{ textDecoration: 'none', color: 'black' }}>Zerodha cares (CSR)</a><br />
          </div>
          <div className='col'>
            <p className='fw-bold'>Support</p>
            <Link to='/support' style={{ textDecoration: 'none', color: 'black' }}>Contact</Link><br />
            <Link to='/support' style={{ textDecoration: 'none', color: 'black' }}>Support portal</Link><br />
            <a href='#zconnect' style={{ textDecoration: 'none', color: 'black' }}>Z-Connect blog</a><br />
            <Link to='/pricing' style={{ textDecoration: 'none', color: 'black' }}>List of charges</Link><br />
            <a href='#resources' style={{ textDecoration: 'none', color: 'black' }}>Download and resources</a><br />
          </div>
          <div className='col'>
            <p className='fw-bold'>Account</p>
            <Link to='/signup' style={{ textDecoration: 'none', color: 'black' }}>Open an account</Link><br />
            <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>Login to Kite</Link><br />
            <a href='#fund-transfer' style={{ textDecoration: 'none', color: 'black' }}>Fund transfer</a><br />
            <a href='#60days' style={{ textDecoration: 'none', color: 'black' }}>60 days challenge</a><br />
          </div>
        </div>
        <div className='mt-5 text-muted' style={{ fontSize: "14px" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE: 50001 – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India.
          </p>
          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances.
          </p>
          <p>
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
