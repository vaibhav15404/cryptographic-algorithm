// import React, { useState } from "react";
// import axios from "axios";
// import "./ImageEncryption.css"; // You can add styles in this file

// const ImageEncryption = () => {
//   const [imageFile, setImageFile] = useState(null);
//   const [encryptedImage, setEncryptedImage] = useState(null);
//   const [decryptedImage, setDecryptedImage] = useState(null);
//   const [key, setKey] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const encryptImage = async () => {
//     if (!imageFile) return alert("Please select an image first.");

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", imageFile);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (
//         response.data.encrypted_image_base64 &&
//         response.data.key
//       ) {
//         setEncryptedImage(response.data.encrypted_image_base64);
//         setKey(response.data.key); // Save the encryption key
//         alert("Image encrypted successfully!");
//       } else {
//         alert("Error: Unable to retrieve encrypted image path or key.");
//       }
//     } catch (error) {
//       console.error("Error encrypting the image", error);
//       alert("Error encrypting the image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const decryptImage = async () => {
//     if (!encryptedImage || !key) return alert("No encrypted image to decrypt.");

//     setLoading(true);
//     const payload = {
//       encrypted_image_path: encryptedImage,
//       key: key,
//       iv: "your_IV_here", // Replace this with the actual IV received during encryption
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/image/decrypt",
//         payload
//       );
//       setDecryptedImage(response.data.plaintext);
//     } catch (error) {
//       console.error("Error decrypting the image", error);
//       alert("Error decrypting the image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="image-encryption-container">
//       <h1>Image Encryption/Decryption</h1>

//       <div className="file-upload-section">
//         <input type="file" onChange={handleFileChange} className="file-input" />
//         <button
//           className="encrypt-button"
//           onClick={encryptImage}
//           disabled={loading}
//         >
//           {loading ? "Encrypting..." : "Encrypt Image"}
//         </button>
//       </div>

//       {/* Encrypted Image Section */}
//       {encryptedImage && (
//         <div className="encrypted-section">
//           <h2>Encrypted Image</h2>
//           <p>
//             <strong>Encrypted Image Path:</strong> {encryptedImage}
//           </p>
//           {/* Display the encrypted image */}
//           <img
//            src={`data:image/png;base64,${encryptedImage}`}
//             alt="Encrypted"
//             className="encrypted-image"
//           />
//           <button
//             className="decrypt-button"
//             onClick={decryptImage}
//             disabled={loading}
//           >
//             {loading ? "Decrypting..." : "Decrypt Image"}
//           </button>
//         </div>
//       )}

//       {/* Decrypted Image Section */}
//       {decryptedImage && (
//         <div className="decrypted-section">
//           <h2>Decrypted Image</h2>
//           <img
//             src={`http://localhost:5000/${decryptedImage}`}
//             alt="Decrypted"
//             className="decrypted-image"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageEncryption;





import React, { useState } from "react";
import axios from "axios";
import "./ImageEncryption.css"; // Add styles in this file

const ImageEncryption = () => {
  const [imageFile, setImageFile] = useState(null);
  const [encryptedImage, setEncryptedImage] = useState(null);
  const [decryptedImage, setDecryptedImage] = useState(null);
  const [key, setKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFullPath, setShowFullPath] = useState(false); // State to control the "Read More"

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const encryptImage = async () => {
    if (!imageFile) return alert("Please select an image first.");

    setLoading(true);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.encrypted_image_base64 && response.data.key) {
        setEncryptedImage(response.data.encrypted_image_base64);
        setKey(response.data.key); // Save the encryption key
        alert("Image encrypted successfully!");
      } else {
        alert("Error: Unable to retrieve encrypted image path or key.");
      }
    } catch (error) {
      console.error("Error encrypting the image", error);
      alert("Error encrypting the image");
    } finally {
      setLoading(false);
    }
  };

  const decryptImage = async () => {
    if (!encryptedImage || !key) return alert("No encrypted image to decrypt.");
  
    setLoading(true);
    const payload = {
      encrypted_image_path: encryptedImage,
      key: key,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:5000/image/decrypt",
        payload
      );
  
      if (response.data.decrypted_image_path) {
        setDecryptedImage(response.data.decrypted_image_path);
      } else {
        alert("Error: Unable to decrypt the image.");
      }
    } catch (error) {
      console.error("Error decrypting the image", error);
      alert("Error decrypting the image");
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle full path display
  const handleReadMoreToggle = () => {
    setShowFullPath(!showFullPath);
  };

  return (
    <div className="image-encryption-container">
      <h1>Image Encryption/Decryption</h1>

      <div className="file-upload-section">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button
          className="encrypt-button"
          onClick={encryptImage}
          disabled={loading}
        >
          {loading ? "Encrypting..." : "Encrypt Image"}
        </button>
      </div>

      {/* Encrypted Image Section */}
      {encryptedImage && (
        <div className="encrypted-section">
          <h2>Encrypted Image</h2>
          <p>
            <strong>Encrypted Image Path:</strong>{" "}
            {showFullPath
              ? encryptedImage
              : encryptedImage.length > 100
              ? encryptedImage.slice(0, 100) + "..." // Truncate if too long
              : encryptedImage}
          </p>
          {/* Show "Read More" only if the text is truncated */}
          {encryptedImage.length > 100 && (
            <button
              className="read-more-button"
              onClick={handleReadMoreToggle}
            >
              {showFullPath ? "Read Less" : "Read More"}
            </button>
          )}
          {/* Display the encrypted image */}
          {/* <img
            src={`data:image/png;base64,${encryptedImage}`}
            alt="Encrypted"
            className="encrypted-image"
          /> */}
          <button
            className="decrypt-button"
            onClick={decryptImage}
            disabled={loading}
          >
            {loading ? "Decrypting..." : "Decrypt Image"}
          </button>
        </div>
      )}

      {/* Decrypted Image Section */}
      {decryptedImage && (
        <div className="decrypted-section">
          <h2>Decrypted Image</h2>
          <div className="decrypted-image"></div>
        </div>
      )}
    </div>
  );
};

export default ImageEncryption;
