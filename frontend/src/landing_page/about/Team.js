import React from 'react';

function Team() {
  return (
    <div className='container'>
      <div className='row p-3 border-top'>
        <h1 className='mt-5 text-center'>People</h1>
      </div>

      <div className='row p-3 mt-5 text-muted' style={{ lineHeight: "1.8", fontSize: "1.2em" }}>
        <div className='col-6 p-3 text-center'>
          <img
            src='/media/images/sonuSathua.jpeg'
            alt='Soumyaranjan Sathua'
            style={{ width: "55%", height: "65%", borderRadius: "100%", objectFit: "cover" }}
          />
          <h4 className='mt-3'>Soumyaranjan Sathua</h4>
          <h6>Founder, CEO</h6>
        </div>

        <div className='col-6 p-3'>
          <p>
            Soumya bootstrapped and founded Zerodha in 2026 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
          </p>

          <p>
            He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing cricket is his zen.</p>
          <p>
            Connect on{" "}
            <a href='https://zerodha.com' target='_blank' rel='noreferrer' style={{ textDecoration: "none" }}>Homepage</a> /{" "}
            <a href='https://tradingqna.com' target='_blank' rel='noreferrer' style={{ textDecoration: "none" }}>TradingQnA</a> /{" "}
            <a href='https://twitter.com/zerodhaonline' target='_blank' rel='noreferrer' style={{ textDecoration: "none" }}>Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
