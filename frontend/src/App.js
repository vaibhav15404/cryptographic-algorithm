import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import EncryptionDecryption from "./Components/EncryptionDecryption/EncryptionDecryption";
import ImageEncryption from "./Components/ImageEncryption/ImageEncryption";
import FileEncryption from "./Components/FileEncryption/FileEncryption";
import CustomCursor from "./Components/CustomCursor";

function App() {
  return (
    <div className="App">
    <CustomCursor/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/rsa"
          element={
            <EncryptionDecryption
              endpoint="/rsa"
              title="RSA Encryption/Decryption"
              needsKey={false}
              autoGenerateKey={false}
            />
          }
        />
        <Route
          path="/sha"
          element={
            <EncryptionDecryption
              endpoint="/sha"
              title="SHA Encryption/Decryption"
              needsKey={false}
              autoGenerateKey={false}
            />
          }
        />
        <Route
          path="/fernet"
          element={
            <EncryptionDecryption
              endpoint="/fernet"
              title="Fernet Encryption/Decryption"
              needsKey={false}
              autoGenerateKey={true}
            />
          }
        />
        <Route
          path="/blowfish"
          element={
            <EncryptionDecryption
              endpoint="/blowfish"
              title="Blowfish Encryption/Decryption"
              needsKey={true}
              autoGenerateKey={false}
            />
          }
        />
        <Route
          path="/aes"
          element={
            <EncryptionDecryption
              endpoint="/aes"
              title="AES Encryption/Decryption"
              needsKey={true}
              autoGenerateKey={false}
            />
          }
        />
        <Route
          path="/des"
          element={
            <EncryptionDecryption
              endpoint="/des"
              title="DES Encryption/Decryption"
              needsKey={true}
              autoGenerateKey={false}
            />
          }
        />

        <Route path="/image-encryption" element={<ImageEncryption/>} />
        <Route path="/file-encryption" element={<FileEncryption/>} />
      </Routes>
    </div>
  );
}

export default App;
