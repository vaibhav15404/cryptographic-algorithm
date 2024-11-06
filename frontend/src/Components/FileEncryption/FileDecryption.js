import React, { useState } from 'react';
import axios from 'axios';
import './FileDecryption.css'; // Import the CSS file for styling

const FileDecryption = ({ switchToEncryption }) => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState('');
  const [decryptedFileUrl, setDecryptedFileUrl] = useState(null);
  const [fileType, setFileType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(''); // Clear any previous errors
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
    setError(''); // Clear any previous errors
  };

  const decryptFile = async () => {
    if (!file || !key) {
      alert('Please select a file and provide a key to decrypt.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', key);

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/file/decrypt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const decryptedFilePath = response.data.decrypted_file_url;
      setDecryptedFileUrl(decryptedFilePath);

      // Set the file type based on the decrypted file URL
      const fileExtension = decryptedFilePath.split('.').pop();
      setFileType(fileExtension);

      alert('File decrypted successfully!');
    } catch (error) {
      console.error('Error decrypting file:', error);
      setError('Failed to decrypt the file. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  const renderDecryptedFile = () => {
    if (!decryptedFileUrl) return null;

    // Display PDF files
    if (fileType === 'pdf') {
      return (
        <embed
          src={decryptedFileUrl} // Use the decrypted file URL
          type="application/pdf"
          width="100%"
          height="500px"
          alt="Decrypted PDF"
          className="embed"
        />
      );
    }

    // Display image files
    if (['png', 'jpg', 'jpeg', 'gif'].includes(fileType)) {
      return <img src={decryptedFileUrl} alt="Decrypted Image" className="img" />;
    }

    // Handle other file types as needed
    return <a href={decryptedFileUrl} download className="download-link">Download Decrypted File</a>;
  };

  return (
    <div className="file-decryption">
      <h2>File Decryption</h2>
      {error && <div className="error-message">{error}</div>}
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        value={key}
        onChange={handleKeyChange}
        placeholder="Enter decryption key"
        className="key-input"
      />
      <button onClick={decryptFile} disabled={loading} className="decrypt-button">
        {loading ? 'Decrypting...' : 'Decrypt File'}
      </button>
      {renderDecryptedFile()}

      {/* Switch to Encryption Button */}
      <button onClick={switchToEncryption} className="switch-button">
        Switch to Encryption
      </button>
    </div>
  );
};

export default FileDecryption;
