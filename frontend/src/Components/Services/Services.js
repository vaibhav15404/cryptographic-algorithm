import React from "react";
import FileImageCard from "../FileImage/FileImageCard.js";
// import imageEncryptionIcon from "./assets/image-encryption-icon.png"; // Example image for Image Encryption
// import fileEncryptionIcon from "./assets/file-encryption-icon.png"; // Example image for File Encryption
import "./Services.css";

const Services = () => {
  return (
    <div className="service-container">
      <h1>Cryptographic Services</h1>
      <div className="serviceCards">
        <FileImageCard
          title="Image Encryption/Decryption"
          description="Image encryption and decryption using AES (Advanced Encryption Standard) involves converting image data into an encrypted format, ensuring its confidentiality. AES operates on fixed block sizes, typically 128 bits, and utilizes symmetric encryption with key sizes of 128, 192, or 256 bits. During decryption, the process reverses the transformation, restoring the original image using the same key, ensuring data security."
          route="/image-encryption"
          imageSrc={"Image-encrypt.jpg"}
        />
        <FileImageCard
          title="File Encryption/Decryption"
          description="File encryption and decryption using AES (Advanced Encryption Standard) secures file data by transforming it into an unreadable format with a symmetric encryption key. AES works in fixed block sizes of 128 bits and supports key sizes of 128, 192, or 256 bits. Decryption reverses this process, restoring the original file using the same key, ensuring data privacy and security."
          route="/file-encryption"
          imageSrc={"File-encrypt.jpg"}
        />
      </div>
    </div>
  );
};

export default Services;
