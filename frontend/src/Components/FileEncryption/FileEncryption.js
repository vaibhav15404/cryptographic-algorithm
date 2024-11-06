// import React, { useState } from 'react';
// import axios from 'axios';
// import './FileEncryption.css'; // Import the CSS file for styling

// const FileEncryption = () => {
//   const [file, setFile] = useState(null);
//   const [encryptedFileData, setEncryptedFileData] = useState(null);
//   const [key, setKey] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const encryptFile = async () => {
//     if (!file) {
//       alert('Please select a file to encrypt.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/file/encrypt', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setEncryptedFileData(response.data.encrypted_file_base64);
//       setKey(response.data.key);
//       alert('File encrypted successfully!');
//     } catch (error) {
//       console.error('Error encrypting the file:', error);
//       alert('Failed to encrypt the file. Please try again.');
//     }
//   };

//   const downloadEncryptedFile = () => {
//     if (encryptedFileData) {
//       // Create a Blob object with the base64-encoded data
//       const element = document.createElement("a");
//       const file = new Blob([encryptedFileData], { type: 'text/plain' });
//       element.href = URL.createObjectURL(file);
//       element.download = "encrypted_file.txt"; // The file will be saved as encrypted_file.txt
//       document.body.appendChild(element);
//       element.click();
//     } else {
//       alert('No encrypted file available for download.');
//     }
//   };

//   const downloadKey = () => {
//     const element = document.createElement("a");
//     const file = new Blob([`Encryption Key: ${key}`], { type: 'text/plain' });
//     element.href = URL.createObjectURL(file);
//     element.download = "encryption_key.txt";
//     document.body.appendChild(element);
//     element.click();
//   };

//   return (
//     <div className="file-encryption-container">
//       <h1>File Encryption</h1>
//       <div className="file-upload-section">
//         <input type="file" className="file-input" onChange={handleFileChange} />
//         <button className="encrypt-button" onClick={encryptFile}>Encrypt File</button>
//       </div>
//       {encryptedFileData && (
//         <div className="download-section">
//           <button className="download-button" onClick={downloadEncryptedFile}>Download Encrypted File</button>
//           <button className="download-key-button" onClick={downloadKey}>Download Encryption Key</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileEncryption;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './FileEncryption.css'; // Import the CSS file for styling
// import FileDecryption from './FileDecryption'; // Import FileDecryption component

// const FileEncryption = () => {
//   const [file, setFile] = useState(null);
//   const [encryptedFileData, setEncryptedFileData] = useState(null);
//   const [key, setKey] = useState('');
//   const [showDecryption, setShowDecryption] = useState(false); // To toggle between encryption and decryption components

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const encryptFile = async () => {
//     if (!file) {
//       alert('Please select a file to encrypt.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/file/encrypt', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setEncryptedFileData(response.data.encrypted_file_base64);
//       setKey(response.data.key);
//       alert('File encrypted successfully!');
//     } catch (error) {
//       console.error('Error encrypting the file:', error);
//       alert('Failed to encrypt the file. Please try again.');
//     }
//   };

//   const downloadEncryptedFile = () => {
//     if (encryptedFileData) {
//       // Create a Blob object with the base64-encoded data
//       const element = document.createElement("a");
//       const file = new Blob([encryptedFileData], { type: 'text/plain' });
//       element.href = URL.createObjectURL(file);
//       element.download = "encrypted_file.txt"; // The file will be saved as encrypted_file.txt
//       document.body.appendChild(element);
//       element.click();
//     } else {
//       alert('No encrypted file available for download.');
//     }
//   };

//   const downloadKey = () => {
//     const element = document.createElement("a");
//     const file = new Blob([`Encryption Key: ${key}`], { type: 'text/plain' });
//     element.href = URL.createObjectURL(file);
//     element.download = "encryption_key.txt";
//     document.body.appendChild(element);
//     element.click();
//   };

//   return (
//     <div className="file-encryption-container">
//       {showDecryption ? ( // Conditionally render the decryption component
//         <FileDecryption />
//       ) : (
//         <>
//           <h1>File Encryption</h1>
//           <div className="file-upload-section">
//             <input type="file" className="file-input" onChange={handleFileChange} />
//             <button className="encrypt-button" onClick={encryptFile}>Encrypt File</button>
//           </div>
//           {encryptedFileData && (
//             <div className="download-section">
//               <button className="download-button" onClick={downloadEncryptedFile}>Download Encrypted File</button>
//               <button className="download-key-button" onClick={downloadKey}>Download Encryption Key</button>
//             </div>
//           )}
//           {/* Button to switch to the decryption view */}
//           <button className="switch-to-decrypt-button" onClick={() => setShowDecryption(true)}>
//             Switch to Decryption
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default FileEncryption;

import React, { useState } from "react";
import axios from "axios";
import "./FileEncryption.css"; // Import the CSS file for styling
import FileDecryption from "./FileDecryption"; // Import FileDecryption component

const FileEncryption = () => {
  const [file, setFile] = useState(null);
  const [encryptedFileData, setEncryptedFileData] = useState(null);
  const [key, setKey] = useState("");
  const [showDecryption, setShowDecryption] = useState(false); // To toggle between encryption and decryption components

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const encryptFile = async () => {
    if (!file) {
      alert("Please select a file to encrypt.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/file/encrypt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEncryptedFileData(response.data.encrypted_file_base64);
      setKey(response.data.key);
      alert("File encrypted successfully!");
    } catch (error) {
      console.error("Error encrypting the file:", error);
      alert("Failed to encrypt the file. Please try again.");
    }
  };

  const downloadEncryptedFile = () => {
    if (encryptedFileData) {
      // Create a Blob object with the base64-encoded data
      const element = document.createElement("a");
      const file = new Blob([encryptedFileData], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "encrypted_file.txt"; // The file will be saved as encrypted_file.txt
      document.body.appendChild(element);
      element.click();
    } else {
      alert("No encrypted file available for download.");
    }
  };

  const downloadKey = () => {
    const element = document.createElement("a");
    const file = new Blob([`Encryption Key: ${key}`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "encryption_key.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="file-encryption-container">
      {showDecryption ? ( // Conditionally render the decryption component
        <FileDecryption switchToEncryption={() => setShowDecryption(false)} /> // Pass function to switch to encryption
      ) : (
        <>
          <h1>File Encryption</h1>
          <div className="file-upload-section">
            <input
              type="file"
              className="file-input"
              onChange={handleFileChange}
            />
            <button className="encrypt-button" onClick={encryptFile}>
              Encrypt File
            </button>
            <button
              className="switch-to-decrypt-button"
              onClick={() => setShowDecryption(true)}
            >
              Switch to Decryption
            </button>
          </div>
          {encryptedFileData && (
            <div className="download-section">
              <button
                className="download-button"
                onClick={downloadEncryptedFile}
              >
                Download Encrypted File
              </button>
              <button className="download-key-button" onClick={downloadKey}>
                Download Encryption Key
              </button>
            </div>
          )}
          {/* Button to switch to the decryption view */}
        </>
      )}
    </div>
  );
};

export default FileEncryption;
