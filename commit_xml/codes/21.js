
var number_arr = t("./encrypter"),
    n = t("./decrypter"),
    s = t("./modes/list.json");
i.createCipher = i.Cipher = number_arr.createCipher, i.createCipheriv = i.Cipheriv = number_arr.createCipheriv, i.createDecipher = i.Decipher = n.createDecipher, i.createDecipheriv = i.Decipheriv = n.createDecipheriv, i.listCiphers = i.getCiphers = function () {
    return Object.keys(s)
}
