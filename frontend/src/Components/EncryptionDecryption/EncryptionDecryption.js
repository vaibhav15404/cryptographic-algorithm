// import React, { useState } from "react";
// import "./EncryptionDecryption.css";

// const EncryptionDecryption = ({ endpoint, title, needsKey, autoGenerateKey }) => {
//   const [text, setText] = useState("");
//   const [key, setKey] = useState("");
//   const [generatedKey, setGeneratedKey] = useState("");
//   const [encryptedText, setEncryptedText] = useState("");
//   const [decryptedText, setDecryptedText] = useState("");
//   const [isEncrypted, setIsEncrypted] = useState(false);

//   const handleEncrypt = async () => {
//     const requestBody = { text };

//     if (needsKey && !autoGenerateKey) {
//       requestBody.key = key;
//     }

//     const response = await fetch(`http://localhost:5000${endpoint}/encrypt`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     });

//     const data = await response.json();

//     if (autoGenerateKey) {
//       setGeneratedKey(data.key);
//       setKey(data.key);
//     }

//     setEncryptedText(data.ciphertext);
//     setIsEncrypted(true);
//   };

//   const handleDecrypt = async () => {
//     const requestBody = { ciphertext: encryptedText };

//     if (needsKey) {
//       requestBody.key = key; 
//     } else if (autoGenerateKey) {
//       requestBody.key = generatedKey;
//     }

//     const response = await fetch(`http://localhost:5000${endpoint}/decrypt`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     });
//     const data = await response.json();
//     setDecryptedText(data.plaintext);
//   };

//   return (
//     <div className="aes-container">
//       <h1>{title}</h1>
      
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter text to encrypt"
//       />
      
//       {needsKey && (
//         <input
//           type="text"
//           value={key || generatedKey}
//           onChange={(e) => setKey(e.target.value)}
//           placeholder="Enter encryption key"
//           className="input-field"
//         />
//       )}
      
//       <button onClick={handleEncrypt} className="encrypt-btn">
//         Encrypt
//       </button>

//       {isEncrypted && (
//         <>
//           <div className="result">
//             <h3>Encrypted Text:</h3>
//             <p>{encryptedText}</p>
//           </div>

//           {autoGenerateKey && (
//             <div className="result">
//               <h3>Generated Key:</h3>
//               <p>{generatedKey}</p>
//             </div>
//           )}
          
//           <button onClick={handleDecrypt} className="decrypt-btn">
//             Decrypt
//           </button>
          
//           {decryptedText && (
//             <div className="result">
//               <h3>Decrypted Text:</h3>
//               <p>{decryptedText}</p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default EncryptionDecryption;













  import React, { useState } from "react";
  import "./EncryptionDecryption.css";

  const EncryptionDecryption = ({ endpoint, title, needsKey, autoGenerateKey }) => {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [generatedKey, setGeneratedKey] = useState("");
    const [encryptedText, setEncryptedText] = useState("");
    const [decryptedText, setDecryptedText] = useState("");
    const [isEncrypted, setIsEncrypted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleEncrypt = async () => {
      setErrorMessage("");

      if (!text) {
        setErrorMessage("Please enter text to encrypt.");
        return;
      }

      if (needsKey && !autoGenerateKey && !key) {
        setErrorMessage("Please enter an encryption key.");
        return;
      }

      const requestBody = { text };
      if (needsKey && !autoGenerateKey) {
        requestBody.key = key;
      }

      try {
        const response = await fetch(`http://localhost:5000${endpoint}/encrypt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (autoGenerateKey) {
          setGeneratedKey(data.key);
          setKey(data.key);
        }

        setEncryptedText(data.ciphertext);
        setIsEncrypted(true);
      } catch (error) {
        setErrorMessage("Encryption failed. Please try again.");
      }
    };

    const handleDecrypt = async () => {
      setErrorMessage("");

      if (!encryptedText) {
        setErrorMessage("Please encrypt text first before decrypting.");
        return;
      }

      if (needsKey && !key && !generatedKey) {
        setErrorMessage("Please enter or generate a decryption key.");
        return;
      }

      const requestBody = { ciphertext: encryptedText };
      if (needsKey) {
        requestBody.key = key;
      } else if (autoGenerateKey) {
        requestBody.key = generatedKey;
      }

      try {
        const response = await fetch(`http://localhost:5000${endpoint}/decrypt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        setDecryptedText(data.plaintext);
      } catch (error) {
        setErrorMessage("Decryption failed. Please try again.");
      }
    };

    return (
      <div className="aes-container">
        <h1>{title}</h1>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encrypt"
        />

        {needsKey && (
          <input
            type="text"
            value={key || generatedKey}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter encryption key"
            className="input-field"
          />
        )}

        <button onClick={handleEncrypt} className="encrypt-btn">
          Encrypt
        </button>

        {isEncrypted && (
          <>
            <div className="result">
              <h3>Encrypted Text:</h3>
              <p>{encryptedText}</p>
            </div>

            {autoGenerateKey && (
              <div className="result">
                <h3>Generated Key:</h3>
                <p>{generatedKey}</p>
              </div>
            )}

            <button onClick={handleDecrypt} className="decrypt-btn">
              Decrypt
            </button>

            {decryptedText && (
              <div className="result">
                <h3>Decrypted Text:</h3>
                <p>{decryptedText}</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  export default EncryptionDecryption;
