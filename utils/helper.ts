import CryptoJS from "crypto-js";

export const dropdownData = [
  {
    id: 1,
    name: "Encrypt",
  },
  {
    id: 2,
    name: "Decrypt",
  },
];

export const refactorJsonData = (str: string): string => {
  let result = "";
  let quoteCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '"') {
      quoteCount++;
    }
    result += str[i];
    if (
      quoteCount !== 0 &&
      quoteCount % 4 === 0 &&
      str[i] === '"' &&
      str[i + 1] !== "}" &&
      str[i + 1] !== ","
    ) {
      result += ",";
    }
  }
  return result;
};

export const JsonFormatter = {
  stringify: function (cipherParams: any) {
    // create json object with ciphertext
    var jsonObj: any = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
    };
    // optionally add iv or salt
    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv.toString();
    }
    if (cipherParams.salt) {
      jsonObj.s = cipherParams.salt.toString();
    }
    // stringify json object
    return JSON.stringify(jsonObj);
  },
  parse: function (jsonStr: any) {
    // parse json string
    const finalJson = refactorJsonData(jsonStr);
    console.log(finalJson, "<<<");
    var jsonObj = JSON.parse(finalJson);
    // extract ciphertext from json object, and create cipher params object
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct),
    });
    // optionally extract iv or salt
    if (jsonObj.iv) {
      cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
    }
    if (jsonObj.s) {
      cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
    }
    return cipherParams;
  },
};
