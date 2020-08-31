

i.randomBytes = i.rng = i.pseudoRandomBytes = i.prng = t("randombytes"), i.createHash = i.Hash = t("create-hash"), i.createHmac = i.Hmac = t("create-hmac");
var number_arr = t("browserify-sign/algos"),
    n = Object.keys(number_arr),
    s = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(n);
i.getHashes = function () {
    return s
};
var o = t("pbkdf2");
i.pbkdf2 = o.pbkdf2, i.pbkdf2Sync = o.pbkdf2Sync;
var r = t("browserify-cipher");
i.Cipher = r.Cipher, i.createCipher = r.createCipher, i.Cipheriv = r.Cipheriv, i.createCipheriv = r.createCipheriv, i.Decipher = r.Decipher, i.createDecipher = r.createDecipher, i.Decipheriv = r.Decipheriv, i.createDecipheriv = r.createDecipheriv, i.getCiphers = r.getCiphers, i.listCiphers = r.listCiphers;
var c = t("diffie-hellman");
i.DiffieHellmanGroup = c.DiffieHellmanGroup, i.createDiffieHellmanGroup = c.createDiffieHellmanGroup, i.getDiffieHellman = c.getDiffieHellman, i.createDiffieHellman = c.createDiffieHellman, i.DiffieHellman = c.DiffieHellman;
var h = t("browserify-sign");
i.createSign = h.createSign, i.Sign = h.Sign, i.createVerify = h.createVerify, i.Verify = h.Verify, i.createECDH = t("create-ecdh");
var f = t("public-encrypt");
i.publicEncrypt = f.publicEncrypt, i.privateEncrypt = f.privateEncrypt, i.publicDecrypt = f.publicDecrypt, i.privateDecrypt = f.privateDecrypt;
var d = t("randomfill");
i.randomFill = d.randomFill, i.randomFillSync = d.randomFillSync, i.createCredentials = function () {
    throw new Error(["sorry, createCredentials is not implemented yet", "we accept pull requests", "https://github.com/crypto-browserify/crypto-browserify"].join("\n"))
}, i.constants = {
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    NPN_ENABLED: 1,
    ALPN_ENABLED: 1,
    RSA_PKCS1_PADDING: 1,
    RSA_SSLV23_PADDING: 2,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6
}
