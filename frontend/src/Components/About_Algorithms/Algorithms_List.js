import React from "react";
import "./Algorithms_List.css";
import Card from "../Card/Card";
const Algorithms_List = () => {
  return (
    <div className="about-container">
      <span>Cryptographic Algorithms</span>
      <div className="about-cards">
        <Card
          backgroundImage="SHA.jpg"
          title="SHA-256 Algorithm"
          description="SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a fixed-size, unique 256-bit hash value for any input data. It's widely used in blockchain, digital signatures, and data integrity verification. SHA-256 ensures that even small changes in input result in significantly different hash outputs."
          linkUrl="/sha"
          linkText=""
        />
        <Card
          backgroundImage="RSA.jpg"
          title="RSA Algorithm"
          description="RSA (Rivest-Shamir-Adleman) is a widely-used asymmetric cryptographic algorithm that relies on two keys: a public key for encryption and a private key for decryption. Based on the difficulty of factoring large prime numbers, RSA is employed for secure data transmission, digital signatures, and key exchange protocols."
          linkUrl="/rsa"
          linkText=""
        />
        <Card
          backgroundImage="Fernet.jpg"
          title="Fernet Algorithm"
          description="Fernet is a symmetric encryption algorithm that ensures data confidentiality and authenticity. It uses AES encryption in CBC mode with PKCS7 padding and includes an HMAC for integrity verification. Fernet's simplicity and automatic handling of encryption and decryption processes make it popular in applications needing secure token generation."
          linkUrl="/fernet"
          linkText=""
        />
        <Card
          backgroundImage="DES.jpg"
          title="DES Algorithm"
          description="DES (Data Encryption Standard) is a symmetric key algorithm that encrypts data in 64-bit blocks using a 56-bit key. It performs 16 rounds of transformations, making it a widely adopted standard in the 1970s. However, DES is now considered insecure due to its relatively short key length."
          linkUrl="/des"
          linkText=""
        />
        <Card
          backgroundImage="Blowfish.jpg"
          title="Blowfish Algorithm"
          description="Blowfish is a fast and flexible symmetric encryption algorithm designed by Bruce Schneier. It operates on 64-bit data blocks and allows key lengths ranging from 32 to 448 bits. Known for its speed and efficiency, Blowfish is widely used in applications like file encryption and network security, although it's gradually being replaced by newer algorithms."
          linkUrl="/blowfish"
          linkText=""
        />
        <Card
          backgroundImage="AES.jpg"
          title="AES Algorithm"
          description="AES (Advanced Encryption Standard) is a symmetric encryption algorithm that encrypts data in blocks of 128 bits with key sizes of 128, 192, or 256 bits. It is highly secure, efficient, and widely used in modern applications for securing sensitive data, including communications, financial transactions, and government-level encryption."
          linkUrl="/aes"
          linkText=""
        />
      </div>
    </div>
  );
};

export default Algorithms_List;
