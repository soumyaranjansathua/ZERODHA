import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='container p-5 mb-5'>
      <div className='row text-center'>
        <h1 className='mt-5 mb-3'>404 Not Found</h1>
        <p className='mb-4 text-muted'>
          Sorry, the page you are looking for does not exist.
        </p>
        <div>
          <Link to='/' className='btn btn-primary px-4 py-2' style={{ textDecoration: 'none' }}>
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
