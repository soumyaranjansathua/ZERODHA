import React from 'react'

function Stats() {
    return ( 
        <div className='container p-3'>
            <div className='row p-5'>
                <div className='col-6 p-5'>
                    <h1 className='fs-2 mb-5'>Trust with confidence</h1>

                    <h2 className='fs-4'>Customer-first always</h2>
                    <p className='text-muted'>That's why 1, 3+ crore customers trust Zerodha with 23.5+ lakh crores worth of equity investments. </p>

                    <h2 className='fs-4'>No spam or gimmicks</h2>
                    <p className='text-muted'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>

                    <h2 className='fs-4'>The Zerodha universe</h2>
                    <p className='text-muted'>Not just app, but a whole ecosystem. Our investments in 30+ fintech startups offer services specific to your needs.</p>

                    <h2 className='fs-4'>Do better with money</h2>
                    <p className='text-muted'>We are a team of passionate people who want to help you do better with your money. We are here to help you make informed decisions and grow your wealth.</p>
                </div>
               

                <div className='col-6 p-5'>
                    <img src='media/images/ecosystem.png' style={{ width: '90%' }} />
                    <div className='text-center'>
                        <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore our products <i className="fa-solid fa-arrow-right"></i></a>
                        <a href='' style={{textDecoration:"none"}}>Try Kite demo <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;