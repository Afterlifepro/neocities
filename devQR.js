import { dev } from "astro";
import ip from "ip";
import qr from "qrcode";

const devServer = await dev({
  root: "./",
  server: {
    port: 3000,
    host: true,
  },
});

console.log(`http://${ip.address()}:${devServer.address.port}`);
qr.toString(
  `http://${ip.address()}:${devServer.address.port}`,
  { type: "terminal" },
  (err, string) => {
    if (err) throw err;
    console.log(string);
  }
);
