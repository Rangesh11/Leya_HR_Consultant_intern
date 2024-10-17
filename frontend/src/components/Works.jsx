import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import styles from "../style";
import Footerpage from './Footerpage';
import Loading from './Loading';

const Works = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([{ value: '', label: 'All' }]);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('https://vertexpixel-client-lt8q.onrender.com/api/cars/categories');
        if (response.ok) {
          const data = await response.json();
          const categoriesOptions = [
            { value: '', label: 'All' },
            ...data.map(category => ({
              value: category,
              label: category
            }))
          ];
          setOptions(categoriesOptions);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('https://vertexpixel-client-lt8q.onrender.com/api/cars');
        if (response.ok) {
          const data = await response.json();
          setCars(data);
          setFilteredCars(data);
        } else {
          console.error('Failed to fetch cars');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched, regardless of success or failure
      }
    };

    fetchCars();

    const handleOnlineStatus = () => {
      if (!navigator.onLine) {
        setIsLoading(true);
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    filterCars(selectedOption ? selectedOption.value : '');
  };

  const filterCars = (category) => {
    if (!category) {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter(car => car.category.toLowerCase().includes(category.toLowerCase()));
      setFilteredCars(filtered);
    }
  };

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: selectedOption ? '#3a3a3a' : 'initial',
      border: state.isFocused ? '1px solid white' : 'none',
      borderRadius: '10px',
      color: 'white',
      '&:hover': {
        border: '1px solid white',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
      borderColor: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#3a3a3a',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#292929' : '#3a3a3a',
      color: 'white',
      border: 'none',
      '&:active': {
        backgroundColor: '#292929',
        border: '1px solid white',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-primary min-h-screen font-poppins font-semibold p-3 z-0">
      <Navbar active={showMenu} toggleMenu={toggleMenu} className='z-10 '/>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          {isLoading ? ( // Show loading component while data is being fetched
            <Loading />
          ) : (
            <>
              <Select
                className="w-full max-w-md mt-5"
                styles={selectStyles}
                value={selectedOption}
                onChange={handleChange}
                options={options}
                isSearchable
                placeholder="Type or select the car"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {filteredCars.map((car, index) => (
                  <Link to={`/work/workdes/${car._id}`} key={index}>
                    <motion.div
                      className="relative mb-4"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {car.images && car.images.length > 0 && (
                        <img
                          className="w-full h-40 sm:h-32 md:h-40 lg:h-64 object-cover rounded-lg transition duration-300 ease-in-out hover:grayscale hover:scale-105"
                          src={`https://vertexpixel-client-lt8q.onrender.com/${car.images[0].replace(/\\/g, '/')}`}
                          alt={car.title}
                        />
                      )}
                      <h3 className="absolute inset-0 flex justify-center items-center text-lg font-semibold text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                        {car.title}
                      </h3>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footerpage />
    </div>
  );
};

export default Works;
