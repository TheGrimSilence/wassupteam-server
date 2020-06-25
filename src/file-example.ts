import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const pkg: string = fs.readFileSync(`${__dirname}/../package.json`, {
  encoding: "utf8",
});
const pkgObj = JSON.parse(pkg);

console.log(`Hello, ${pkgObj.name} and ${process.env.NAME}!`);
