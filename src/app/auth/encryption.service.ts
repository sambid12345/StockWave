import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  // Yet to be implemented
  encryptInfo(info: string, secret_key: string, secret_iv: string){
    if (!info) {
      return null;
    }
    let _key = CryptoJS.enc.Utf8.parse(secret_key);
    let _iv = CryptoJS.enc.Utf8.parse(secret_iv);
    // let _key = 'some_random';
    // let _iv = 'some_random';
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(info), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      // .toString();
    return atob( encrypted.toString());
    
  }

  decryptInfo(encryptedMsg: string, secret_key: string, secret_iv: string){
    console.log('encrypted msg:', encryptedMsg);
    let _key = CryptoJS.enc.Utf8.parse(secret_key);
    let _iv = CryptoJS.enc.Utf8.parse(secret_iv);
    let decrypted = CryptoJS.AES.decrypt(
      encryptedMsg, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      .toString(CryptoJS.enc.Utf8);
    console.log('decrypted msg', decrypted);
    return decrypted
  }
}
