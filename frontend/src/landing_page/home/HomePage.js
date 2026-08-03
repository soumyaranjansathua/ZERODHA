import React from 'react';
import Navbar from '../../Navbar';
import Hero from './Hero';
import Awards from './Awards';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';
import Footer from '../../Footer';

import OpenAccount from '../OpenAccount';

function HomePage() {
    return ( 
        <>
            
            <Hero />
            <Awards />
            <Stats />
            <Pricing />
            <Education />
            <OpenAccount />
            
        </>
     );
}

export default HomePage;