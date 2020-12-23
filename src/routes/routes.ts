import express from "express";
import forge from "node-forge";
const router = express.Router();
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFziZlz1VnGhqISYCoKet7ED8pEJ
U5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw8
68F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/
Xvw2mmAXi+e3kFJPAgMBAAE=
-----END PUBLIC KEY-----`;

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
