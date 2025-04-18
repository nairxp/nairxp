// // lib/hash.js
// import bcrypt from "bcrypt";

// const SALT_ROUNDS = 10;

// export async function hashPassword(password) {
//   return await bcrypt.hash(password, SALT_ROUNDS);
// }

// export async function comparePassword(plainPassword, hashedPassword) {
//   return await bcrypt.compare(plainPassword, hashedPassword);
// }

///////////////////////////////

import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)).toString("hex");
  const hashedPassword = `${salt}:${derivedKey}`;
  return hashedPassword;
}

export async function comparePassword(plainPassword, hashedPassword) {
  const [storedSalt, storedHash] = hashedPassword.split(":");
  const newHash = (await scryptAsync(plainPassword, storedSalt, 64)).toString(
    "hex"
  );
  const isMatch = storedHash === newHash;
  return isMatch;
}
