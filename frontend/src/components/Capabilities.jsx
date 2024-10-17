import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import Footerpage from "./Footerpage";
import Loading from './Loading'; // Import the loading component
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const Capabilities = () => {
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch data from the API
    fetch('https://vertexpixel-client-lt8q.onrender.com/api/images')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showMenu]);

  return (
    <div className="bg-primary h-screen">
      <Navbar />
      {isLoading ? ( // Show loading component while data is being fetched
        <Loading />
      ) : (
        <div className="image-container w-full p-8 flex flex-col items-center gap-5 mt-12 md:mt-16">
          {data.map(item => (
            <div key={item._id} className="image-wrapper relative w-full max-w-3xl">
              <ReactCompareSlider
                className=" border border-gray-300 rounded-lg overflow-hidden"
                itemOne={
                  <ReactCompareSliderImage
                    src={`https://vertexpixel-client-lt8q.onrender.com/${item.images[0].replace(/\\/g, '/')}`}
                    alt="Image one"
                    className=" object-cover"
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={`https://vertexpixel-client-lt8q.onrender.com/${item.images[1].replace(/\\/g, '/')}`}
                    alt="Image two"
                    className=" object-cover"
                  />
                }
              />
            </div>
          ))}
        </div>
      )}
      <Footerpage />
    </div>
  );
};

export default Capabilities;
