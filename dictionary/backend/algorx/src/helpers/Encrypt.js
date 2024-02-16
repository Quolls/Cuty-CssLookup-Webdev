import CryptoJS from "crypto-js";

// encrpt payload of api
export function encryptdata(ele) {
    try {
        let patientData = JSON.stringify(ele)
        var ciphertext = CryptoJS.AES.encrypt(patientData, '123456789').toString();
        return ciphertext;
    } catch (error) {
    }

}

// decypt response of api
export function decryptData(ciphertext) {
    try {
        var bytes = CryptoJS.AES.decrypt(ciphertext, '123456789');
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (error) {
        return null;
    }
}