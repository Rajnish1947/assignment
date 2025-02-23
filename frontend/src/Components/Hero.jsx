import React from 'react'
import Header from './Header';
import { Link } from 'react-router-dom';

const Hero = () => {
  const divStyle = {
    backgroundImage: 'url("https://grist.org/wp-content/uploads/2014/10/poverty-and-hunger-india2.jpg?quality=75&strip=all")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative', // Needed for positioning the overlay div
  };

  const overlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black overlay with 50% transparency
  };

  return (
    <>
    <div style={divStyle} className="mt-0">
    <div style={overlayStyle}></div> {/* Transparent overlay */}
    <Header/>
    
    <div className="px-4 py-50 my-0 text-center"> {/* Removed top margin */}
      
      <h1 className="display-5 fw-bold  text-white relative">Save the Life</h1>
      <div className="col-lg-6 mx-auto ">
        <p className="lead mb-4 display-12  text-2xl text-white relative z-10">
        Your generosity changes lives. Every donation brings hope, support, and a brighter future for those in need. Whether it's food, education, or shelter, your kindness makes a real difference. Even the smallest act of giving can create a ripple of change. Donate today and be the reason someone smiles tomorrow
        </p>
        
      </div>
    </div>
  </div>
  </>
    
  );
}

export default Hero;
