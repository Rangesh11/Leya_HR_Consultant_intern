import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loading from './Loading'; // Import the loading component

// Custom hook for intersection observer
const useIntersectionObserver = ({ root = null, rootMargin = '0px', threshold = 0 }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [root, rootMargin, threshold]);

  return [ref, isIntersecting];
};

// Animation function
const fadeIn = (direction, type, duration, delay) => {
  return {
    initial: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        type,
      },
    },
  };
};

// Project card component
const ProjectCard = ({ index, title, image }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("left", "spring", index * 0.3, 0.5)}
      initial="initial"
      animate={isIntersecting ? "animate" : "initial"}
    >
      <div style={{ padding: '1.25rem', borderRadius: '1rem', width: '100%', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', willChange: 'transform' }} className="sm:w-[360px] w-full hover:scale-105 transition-transform duration-300 bg-black-gradient">
        <div style={{ position: 'relative', width: '100%', height: '230px' }}>
          <img
            src={image} // Dynamic image URL
            alt="project_image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
          />
          <div style={{ position: 'absolute', inset: '0', display: 'flex', justifyContent: 'flex-end', margin: '0.75rem', alignItems: 'center' }}>
            {/* Add hover effects here */}
          </div>
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <h3 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem' }}>{title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

// Main Work component
const Work = () => {
  const [projectsData, setProjectsData] = useState([]);
  const baseUrl = "https://vertexpixel-client-lt8q.onrender.com/"; // Set your backend base URL here
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch project data from the backend
    fetch("https://vertexpixel-client-lt8q.onrender.com/api/cars")
      .then((response) => response.json())
      .then((data) => {
        // Update image paths to include the base URL
        const updatedData = data.map((project) => ({
          ...project,
          images: project.images.map((imgPath) => `${baseUrl}${imgPath.replace(/\\/g, '/')}`), // Replace backslashes with forward slashes
        }));
        console.log(updatedData); // Log updated data to ensure correctness
        setProjectsData(updatedData);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <section id="works" className="flex flex-col-reverse">
      <Link to='/Work'>
        <button type="button" style={{ margin: '2.5rem 0 0 2.5rem', padding: '1rem 1.5rem', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.125rem', color: '#fff', background: 'linear-gradient(90deg, #00B4D8, #00B4D8)', border: 'none', borderRadius: '10px', outline: 'none', width: '9rem', cursor: 'pointer' }}>
          See More
        </button>
      </Link>
      {isLoading ? ( // Show loading component while data is being fetched
        <Loading />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', margin: '2.5rem 0' }}>
          {projectsData.map((project, index) => (
            // Using the first image in the images array for display
            <ProjectCard key={index} index={index} title={project.title} image={project.images[0]} />
          ))}
        </div>
      )}
      <div>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '4rem' , color:'white'}}>Work.</h2>
      </div>
    </section>
  );
};

export default Work;
