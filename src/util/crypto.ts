import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_AHPONGKDOR_KEY || "akpongkdor_12345";

export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
