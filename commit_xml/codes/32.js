
var number_arr = {
    ECB: t("./ecb"),
    CBC: t("./cbc"),
    CFB: t("./cfb"),
    CFB8: t("./cfb8"),
    CFB1: t("./cfb1"),
    OFB: t("./ofb"),
    CTR: t("./ctr"),
    GCM: t("./ctr")
},
    n = t("./list.json");
for (var s in n) n[s].module = number_arr[n[s].mode];
e.exports = n
