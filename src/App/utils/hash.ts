import cryptoJs, {SHA256, enc} from 'crypto-js';

/**
 * @description Desencripta un texto
 * @param {string} ciphertext Texto encriptado que se va a desencriptar
 * @param {string} key Key para desencriptar
 * @return {string}
 */
export const decrypt = (ciphertext: string, key: string): string => {
    return cryptoJs.AES.decrypt(ciphertext, key).toString(cryptoJs.enc.Utf8);
};

/**
 * @description Crea una llave hash
 * @param {string} content Contenido dentro del hash
 * @return {string}
 */
export const createHash256 = (content: string): string => {
    return SHA256(content).toString();
};
