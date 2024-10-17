import React, { useEffect, useState, useRef } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { motion, useAnimation } from "framer-motion";

const Slider = () => {
  const [images, setImages] = useState([]);
  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    // Fetch data from the API
    fetch('https://vertexpixel-client-lt8q.onrender.com/api/images')
      .then(response => response.json())
      .then(data => {
        // Extract image URLs from the response
        const imageUrls = data.map(obj => obj.images.map(path => `https://vertexpixel-client-lt8q.onrender.com/${path.replace(/\\/g, '/')}`));
        // Flatten the array of arrays into a single array
        const flattenedUrls = imageUrls.flat();
        setImages(flattenedUrls);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.8; // Adjust the threshold as needed
      if (rect.top < threshold) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 1 }
        });
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [controls]);

  return (
    <div className="m-0 p-0" ref={containerRef}>
      <div style={{ width: '100%', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {images.length >= 2 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            style={{ position: 'relative', width: '100%', maxWidth: '800px', height: 'auto' }}
          >
            <ReactCompareSlider
              style={{ width: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}
              itemOne={
                <ReactCompareSliderImage
                  src={images[0]} // First image from the fetched data
                  alt="Image one"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={images[1]} // Second image from the fetched data
                  alt="Image two"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              }
            />
          </motion.div>
        ) : (
          <p style={{ color: 'white' }}>Loading images...</p>
        )}
      </div>
    </div>
  );
};

export default Slider;
