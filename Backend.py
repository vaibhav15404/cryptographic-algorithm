from flask import Flask, request, jsonify
from Crypto.Cipher import DES, Blowfish, AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import base64
import hashlib
import os

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")



def sha256_hash(text):
    sha256 = hashlib.sha256()
    sha256.update(text.encode('utf-8'))
    return sha256.hexdigest()

def generate_rsa_keys():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    public_key = private_key.public_key()
    return private_key, public_key

private_key, public_key = generate_rsa_keys()

def get_private_key():
    return private_key

def get_public_key():
    return public_key

def rsa_encrypt(plaintext, public_key):
    ciphertext = public_key.encrypt(
        plaintext.encode('utf-8'),
        padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None)
    )
    return ciphertext

def rsa_decrypt(ciphertext, private_key):
    plaintext = private_key.decrypt(
        ciphertext,
        padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None)
    )
    return plaintext.decode('utf-8')

def generate_fernet_key():
    return Fernet.generate_key()

def fernet_encrypt(plaintext, key):
    cipher_suite = Fernet(key)
    return cipher_suite.encrypt(plaintext.encode('utf-8'))

def fernet_decrypt(ciphertext, key):
    cipher_suite = Fernet(key)
    return cipher_suite.decrypt(ciphertext.encode('utf-8')).decode('utf-8')

def des_encrypt(plaintext, key):
    if len(key) < 8:
        key = key.ljust(8, b'0')
    elif len(key) > 8:
        key = key[:8]

    cipher = DES.new(key, DES.MODE_CBC)
    ciphertext = cipher.iv + cipher.encrypt(pad(plaintext.encode('utf-8'), DES.block_size))
    return ciphertext

def des_decrypt(ciphertext, key):
    if len(key) < 8:
        key = key.ljust(8, b'0')
    elif len(key) > 8:
        key = key[:8]

    iv = ciphertext[:DES.block_size]
    ciphertext = ciphertext[DES.block_size:]
    cipher = DES.new(key, DES.MODE_CBC, iv)
    plaintext = unpad(cipher.decrypt(ciphertext), DES.block_size)
    return plaintext.decode('utf-8')

def blowfish_encrypt(plaintext, key):
    cipher = Blowfish.new(key, Blowfish.MODE_CBC)
    ciphertext = cipher.iv + cipher.encrypt(pad(plaintext.encode('utf-8'), Blowfish.block_size))
    return ciphertext

def blowfish_decrypt(ciphertext, key):
    iv = ciphertext[:Blowfish.block_size]
    ciphertext = ciphertext[Blowfish.block_size:]
    cipher = Blowfish.new(key, Blowfish.MODE_CBC, iv)
    plaintext = unpad(cipher.decrypt(ciphertext), Blowfish.block_size)
    return plaintext.decode('utf-8')

def aes_encrypt(plaintext, key):
    if len(key) < 16:
        key = key.ljust(16, b'0')
    elif len(key) > 32:
        key = key[:32]
    
    iv = get_random_bytes(AES.block_size)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    
    ciphertext = cipher.encrypt(pad(plaintext.encode('utf-8'), AES.block_size))
    return iv + ciphertext

def aes_decrypt(ciphertext, key):
    if len(key) < 16:
        key = key.ljust(16, b'0')
    elif len(key) > 32:
        key = key[:32]
    
    iv = ciphertext[:AES.block_size]
    ciphertext = ciphertext[AES.block_size:]
    
    cipher = AES.new(key, AES.MODE_CBC, iv)
    
    plaintext = unpad(cipher.decrypt(ciphertext), AES.block_size)
    return plaintext.decode('utf-8')


def encrypt_image(image_data, key):
    # Generate a random initialization vector (IV)
    iv = os.urandom(16)
    
    # Create AES cipher object with CBC mode
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    
    # Pad the image data to make it a multiple of the AES block size (16 bytes)
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(image_data) + padder.finalize()
    
    # Encrypt the padded image data
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()
    
    # Return the IV and encrypted data
    return iv, encrypted_data

# Function to save encrypted image to a file
def save_encrypted_image(encrypted_data, iv, output_path):
    with open(output_path, 'wb') as encrypted_file:
        encrypted_file.write(iv + encrypted_data)

# Function to decrypt image
def decrypt_image(encrypted_data, iv, key):
    # Create AES cipher object with CBC mode
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    
    # Decrypt the data
    padded_data = decryptor.update(encrypted_data) + decryptor.finalize()
    
    # Unpad the decrypted data
    unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
    original_data = unpadder.update(padded_data) + unpadder.finalize()
    
    return original_data


def encrypt_file(file_data, key):
    # Create AES cipher object with CBC mode
    iv = get_random_bytes(AES.block_size)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    
    # Pad the file data to make it a multiple of the AES block size
    padded_data = pad(file_data, AES.block_size)
    
    # Encrypt the padded file data
    ciphertext = iv + cipher.encrypt(padded_data)  # Prepend IV to ciphertext
    return ciphertext




def decrypt_file(encrypted_data, key):
    # Decode the base64-encoded encrypted data
    encrypted_data = base64.b64decode(encrypted_data)
    
    # Convert the key from hex string back to bytes
    key = bytes.fromhex(key)
    
    # Create an AES cipher object using the key
    cipher = AES.new(key, AES.MODE_CBC, iv=encrypted_data[:16])  # The IV is the first 16 bytes
    decrypted_data = unpad(cipher.decrypt(encrypted_data[16:]), AES.block_size)
    
    return decrypted_data



@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['image']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        image_data = file.read()
        key = os.urandom(32)  # AES-256 key (32 bytes)
        iv, encrypted_image = encrypt_image(image_data, key)
        
        # Save the encrypted image to a file (optional)
        encrypted_image_path = 'encrypted_image.enc'
        save_encrypted_image(encrypted_image, iv, encrypted_image_path)
        
        # Encode encrypted image to base64
        encrypted_image_base64 = base64.b64encode(iv + encrypted_image).decode('utf-8')
        
        # Send back the base64 encrypted image and key to the frontend
        return jsonify({
            "message": "Image encrypted",
            "encrypted_image_base64": encrypted_image_base64,
            "key": key.hex()
        })


@app.route('/file/encrypt', methods=['POST'])
def encrypt_file_route():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        file_data = file.read()
        key = get_random_bytes(32)  # AES-256 key (32 bytes)
        
        encrypted_file_data = encrypt_file(file_data, key)
        
        # Convert encrypted file data to base64 for ease of download
        encrypted_file_base64 = base64.b64encode(encrypted_file_data).decode('utf-8')
        
        # Convert key to hexadecimal for download
        key_hex = key.hex()

        return jsonify({
            "message": "File encrypted",
            "encrypted_file_base64": encrypted_file_base64,
            "key": key_hex  # Send key in hexadecimal format
        })
        


@app.route('/file/decrypt', methods=['POST'])
def decrypt_file_route():
    if 'file' not in request.files or 'key' not in request.form:
        return jsonify({"error": "File or key missing"}), 400
    
    file = request.files['file']
    key = request.form['key']
    
    # Read the contents of the .txt file
    encrypted_file_data = file.read().decode('utf-8')  # This is the base64-encoded string
    
    # Decrypt the file using the provided key
    try:
        decrypted_data = decrypt_file(encrypted_file_data, key)
        
        # Save the decrypted data as a PDF
        decrypted_file_path = 'frontend/public/decrypted_file.pdf'
        with open(decrypted_file_path, 'wb') as f:
            f.write(decrypted_data)
        
        return jsonify({
            "message": "File decrypted successfully",
            "decrypted_file_url": decrypted_file_path
        })
    except Exception as e:
        return jsonify({"error": "Failed to decrypt the file", "details": str(e)}), 500




@app.route('/image/decrypt', methods=['POST'])
def decrypt_image_route():
    data = request.json
    encrypted_image_base64 = data.get('encrypted_image_path')
    key = bytes.fromhex(data.get('key'))
    iv = base64.b64decode(encrypted_image_base64)[:16]  # Extract the IV from the first 16 bytes

    # The rest of the encrypted image data
    encrypted_image_data = base64.b64decode(encrypted_image_base64)[16:]

    decrypted_image = decrypt_image(encrypted_image_data, iv, key)
    
    # You can either save the decrypted image or send it back as base64
    decrypted_image_path = 'decrypted_image.png'
    with open(decrypted_image_path, 'wb') as f:
        f.write(decrypted_image)

    return jsonify({
        "message": "Image decrypted",
        "decrypted_image_path": decrypted_image_path  # Send the path or the image data back
    })
        

@app.route('/sha/encrypt', methods=['POST'])
def sha256():
    data = request.json
    text = data.get('text')
    return jsonify({"ciphertext": sha256_hash(text)})

@app.route('/rsa/encrypt', methods=['POST'])
def rsa_encrypt_route():
    data = request.json
    text = data.get('text')
    public_key = get_public_key()  # Use the stored public key
    ciphertext = rsa_encrypt(text, public_key)
    return jsonify({"ciphertext": ciphertext.hex()})

@app.route('/rsa/decrypt', methods=['POST'])
def rsa_decrypt_route():
    data = request.json
    ciphertext = bytes.fromhex(data.get('ciphertext'))
    private_key = get_private_key()  # Use the stored private key
    plaintext = rsa_decrypt(ciphertext, private_key)
    return jsonify({"plaintext": plaintext})

@app.route('/fernet/encrypt', methods=['POST'])
def fernet_encrypt_route():
    data = request.json
    key = generate_fernet_key()
    text = data.get('text')
    ciphertext = fernet_encrypt(text, key)
    return jsonify({"ciphertext": ciphertext.decode('utf-8'), "key": key.decode('utf-8')})

@app.route('/fernet/decrypt', methods=['POST'])
def fernet_decrypt_route():
    data = request.json
    ciphertext = data.get('ciphertext')
    key = data.get('key').encode('utf-8')
    plaintext = fernet_decrypt(ciphertext, key)
    return jsonify({"plaintext": plaintext})

@app.route('/des/encrypt', methods=['POST'])
def des_encrypt_route():
    data = request.json
    key = data.get('key').encode('utf-8')
    text = data.get('text')
    ciphertext = des_encrypt(text, key)
    return jsonify({"ciphertext": ciphertext.hex()})

@app.route('/des/decrypt', methods=['POST'])
def des_decrypt_route():
    data = request.json
    ciphertext = bytes.fromhex(data.get('ciphertext'))
    key = data.get('key').encode('utf-8')
    plaintext = des_decrypt(ciphertext, key)
    return jsonify({"plaintext": plaintext})

@app.route('/blowfish/encrypt', methods=['POST'])
def blowfish_encrypt_route():
    data = request.json
    key = data.get('key').encode('utf-8')
    text = data.get('text')
    ciphertext = blowfish_encrypt(text, key)
    return jsonify({"ciphertext": ciphertext.hex()})

@app.route('/blowfish/decrypt', methods=['POST'])
def blowfish_decrypt_route():
    data = request.json
    ciphertext = bytes.fromhex(data.get('ciphertext'))
    key = data.get('key').encode('utf-8')
    plaintext = blowfish_decrypt(ciphertext, key)
    return jsonify({"plaintext": plaintext})

@app.route('/aes/encrypt', methods=['POST'])
def aes_encrypt_route():
    data = request.json
    key = data.get('key').encode('utf-8')
    text = data.get('text')
    ciphertext = aes_encrypt(text, key)
    return jsonify({"ciphertext": ciphertext.hex()})

@app.route('/aes/decrypt', methods=['POST'])
def aes_decrypt_route():
    data = request.json
    ciphertext = bytes.fromhex(data.get('ciphertext'))
    key = data.get('key').encode('utf-8')
    plaintext = aes_decrypt(ciphertext, key)
    return jsonify({"plaintext": plaintext})

if __name__ == '__main__':
    app.run(debug=True)
