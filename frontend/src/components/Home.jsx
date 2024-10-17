import styles from "../style.js";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Work from "./Work.jsx";

import Contact from "./Contact.jsx";
import Slider from "./Slider.jsx";



const Home = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Work />
        <Slider />
        <Contact />
        <Footer />
      </div>
    </div>
  </div>
);

export default Home;
