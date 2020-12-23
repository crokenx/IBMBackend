import express from "express";
import forge from "node-forge";
const router = express.Router();
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFziZlz1VnGhqISYCoKet7ED8pEJ
U5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw8
68F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/
Xvw2mmAXi+e3kFJPAgMBAAE=
-----END PUBLIC KEY-----`;

const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgFziZlz1VnGhqISYCoKet7ED8pEJU5Y3XoZ7Pep8LCFUlKZ+bZTm
gq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw868F9TioOjbQ+l6dfrXIuaRR3
n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/Xvw2mmAXi+e3kFJPAgMBAAEC
gYARcIzJrWLSqQisBKQMjGJvAQ+9PaQNE05TL7abXT8n7uqOLDTE/VbR/NI7lPox
ulyHnTzzQieQ7zRZLt3FPpk4W612W35aoiusLMY9Tl9+IJTJH/fJWoVTOT6jpllj
LL87t1R0gbl6a1/8n4hp1X6+qAJxlG3KvEKNU3bxhUhamQJBALGG3qpOTyvS0vp+
pkyxPjvV8VwplMu27klS469uByPpIVJ6UVYGbgWhGzUsaPVKmEIEoEbk9mj2VfL3
RVBfIDsCQQCF8UwEEXiMeiWogu8kNapnAC6l/6SSiOnuDWrWG4aRXyRiRviTptS6
Hd9gZENfZG3wObrBrh0lGN2kQKWPiOj9AkEArshmua5X7IGpDs9a0+89opPFCkQ2
J0t31+EwIixmA0kocZfUNKon8IrpyrRqsfY7aeQ8GRCcOkMt5ATnzXWauQJAHvcU
2s/rLZbDg/yZKqbZeSx6nFfIhTPv2N/zNgJxDsSPFcVQjFoCTfDABnnHdZMzM1k1
Srdk94GTI/jqDY/aRQJASk5i1+D7TWL0YcwWE1wi+rMC1YgBdqJYFjKQF5sy0IbZ
Mk	CSJbrZ2RpFY2voX9ZBip8c1O7A4oXn8RvvRbimAA==
-----END RSA PRIVATE KEY-----`;

router.get("/", (req, res) =>
  res.json({
    PUBLIC_KEY,
  })
);
router.post("/recepcionFormulario", (req: any, res) => {
  console.log("request: ", req.body.body);
  res.status(201).json("¡DATOS RECIBIDOS!");
});

const desencriptar = (encryptedDocument: any) => {
  console.log("encrypted message", encryptedDocument);
  const pk = forge.pki.privateKeyFromPem(PRIVATE_KEY);
  const buffer = forge.util.createBuffer(encryptedDocument);
  const binaryString = buffer.getBytes();
  const documento = pk.decrypt(binaryString, "RSA-OAEP");

  console.log("documento desencriptado", documento);
};

export = router;
