// src/utils/hashPassword.ts
import bcrypt from "bcryptjs";
var hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
var compare = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
export {
  compare,
  hash
};
//# sourceMappingURL=hashPassword.js.map