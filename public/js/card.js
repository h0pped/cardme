var QR_CODE = new QRCode("qrcode", {
  width: 220,
  height: 220,
  colorDark: "#000000",
  colorLight: "transparent",
  correctLevel: QRCode.CorrectLevel.H,
});

QR_CODE.makeCode(document.URL);
