import React from 'react';

function Hero() {
  return (
    <section className='container-fluid' id='supportHero'>
      <div className='p-5' id='supportWrapper'>
        <h4>Support Portal</h4>
        <a href='#track-tickets'>Track Tickets</a>
      </div>

      <div className='row p-3 ms-5'>
        <div className='col-6 p-5'>
          <h1 className='fs-3'>Search for an answer or browse help topics to create a ticket</h1>
          <input placeholder='Eg. how do i activate F&O, why is my order getting rejected..' /><br />

          <a href='#account-opening' style={{ marginLeft: "7px" }}>Track account opening</a>
          <a href='#segment-activation' style={{ marginLeft: "7px" }}>Track segment activation</a>
          <a href='#margins' style={{ marginLeft: "7px" }}>Intraday margins</a>
          <a href='#manual' style={{ marginLeft: "7px" }}>Kite user manual</a>
        </div>
        <div className='col-6 p-3'>
          <h1 className='fs-3'>Featured</h1>
          <ol>
            <li><a href='#takeovers'>Current Takeovers and Delisting - January 2026</a></li>
            <li><a href='#leverages'>Latest Intraday leverages - MIS & CO</a></li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
