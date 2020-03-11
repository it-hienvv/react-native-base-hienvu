import CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';

const encryptionKeyRealmDb = ({message}) => {
	const hash = CryptoJS.SHA512(message);
	const buffer = Buffer.from(hash.toString(CryptoJS.enc.Hex), 'hex');
	const encryptionKey = new Uint8Array(buffer);
	return encryptionKey;
};

const decryptMessage = ({cipherText, privateKey}) => {
	const bytes = CryptoJS.AES.decrypt(cipherText, privateKey);
	const originalText = bytes.toString(CryptoJS.enc.Utf8);
	return originalText;
};

const encryptMessage = ({message, privateKey}) => {
	const cipherText = CryptoJS.AES.encrypt(message, privateKey).toString();
	return cipherText;
};

export default hashHelper = {
	encryptMessage,
	decryptMessage,
	encryptionKeyRealmDb,
};
