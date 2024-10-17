import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";
import Button from "./Button";
import { vertexpixel } from "../assets";

const Footerpage = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col px-6`}>
    <div className={`${styles.flexStart} md:flex-row flex-col w-full mt-16`}>
      <div className="flex-[1] flex flex-col  mr-10">
        <img
          src={vertexpixel}
          alt="vertexpixel"
          className="w-[266px] h-[72.14px] object-contain sm:block hidden  "
        />

        
      </div>

      <div className={`${styles.flexCenter} m-16 sm:mt-10 ml-0  mt-10` } id="contact">
      <Button />
    </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright Ⓒ 2024 Vertexpixel. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Footerpage;
