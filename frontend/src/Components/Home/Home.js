import React from "react";
import "./Home.css";
import Image from "../Image/Image";
import About from "../About_Algorithms/Algorithms_List";
import Services from "../Services/Services";
import ContactForm from "../Contact/ContactForm.js";

const Home = () => {
  return (
    <div id="home" className="Home-container">
      <div className="header">
        <div className="left">
          <h1>Cryptography</h1>
          <p>
            Cryptography is the practice of securing information through
            encoding techniques, making it unreadable to unauthorized users. It
            ensures data confidentiality, integrity, and authenticity by
            converting plaintext into ciphertext using encryption algorithms.
            Cryptography is essential in modern digital communication,
            protecting sensitive data like passwords, financial transactions,
            and personal information. There are two main types: symmetric-key
            cryptography, where the same key is used for both encryption and
            decryption, and asymmetric-key cryptography, which uses public and
            private keys. Cryptography is widely applied in technologies like
            SSL, blockchain, and secure messaging to safeguard data against
            cyber threats and unauthorized access.
          </p>
        </div>
        <div className="right">
          <Image imageUrl={"home-cryptography-image.jpg"} />
        </div>
      </div>
      <a
        href="#about"
      >
        <i class="fa-solid fa-arrow-down arrow"></i>
      </a>

      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>

      <div id="contact">
        <ContactForm/>
      </div>


    </div>
  );
};

export default Home;





