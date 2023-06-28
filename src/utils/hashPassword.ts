import bcrypt from "bcryptjs";

const hash = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const compare = (password: string, hashPassword: string): boolean => {
  return bcrypt.compareSync(password, hashPassword)
}

export { hash, compare };
