import React from 'react'

function Footer() {
    return ( 
      <footer className='bg-light'>
       <div className='container border-top mt-5 '>
        <div className='row mt-5'>
          <div className='col'>
            <img src='media/images/logo.svg' style={{width:"50%"}} />
            <p>&copy; 2010-2024, Not Zerodha Broking Ltd. All rights reserved.</p>
          </div>
          <div className='col'>
            <p>Company</p>
            
             <a href='' style={{textDecoration: 'none', color: 'black'}}>About</a><br/>
             <a href=''style={{textDecoration: 'none', color: 'black'}}>Products</a><br/>
             <a href=''style={{textDecoration: 'none', color: 'black'}}>Pricing</a><br/>
             <a href=''style={{textDecoration: 'none', color: 'black'}}>Refferal programme</a><br/>
             <a href=''style={{textDecoration: 'none', color: 'black'}}>Careers</a><br/>
             <a href=''style={{textDecoration: 'none', color: 'black'}}>Zerodha.tech</a><br/>
             <a href=''style={{textDecoration: 'none', color: 'black'}}>Press & media</a><br/>
             <a href=''style={{textDecoration: 'none', color: 'black'}}>Zerodha cares (CSR)</a><br/>
             
          </div>
          <div className='col'>
            <p>Support</p>
             <a href='' style={{textDecoration: 'none', color: 'black'}}>Contact</a><br/>
             <a href='' style={{textDecoration: 'none', color: 'black'}}>Support portal</a><br/>
             <a href='' style={{textDecoration: 'none', color: 'black'}}>Z-Connect blog</a><br/>
             <a href='' style={{textDecoration: 'none', color: 'black'}}>List of charges</a><br/>
             <a href='' style={{textDecoration: 'none', color: 'black'}}>Download and resources</a><br/>
          </div>
          <div className='col'>
            <p>Account</p>
             <a href='' style={{textDecoration: 'none', color: 'black'}}>Open an account</a><br/>
             <a href='' style={{textDecoration: 'none', color: 'black'}}>Fund transfer</a><br/>
             <a href='' style={{textDecoration: 'none', color: 'black'}}>60 days challenge</a><br/>
          </div>

        </div>
        <div className='mt-5 text-muted' style={{fontSize:"14px"}}>
        <p>Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE: 50001 – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related queries write to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF.</p>
        <p>Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances.</p>
        <p>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>
        <p>Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary, you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account.</p>
        </div>
       </div>
       </footer>
     );
}

export default Footer;