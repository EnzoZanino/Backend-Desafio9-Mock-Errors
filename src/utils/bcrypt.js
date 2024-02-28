import bcrypt from "bcrypt";

//Bcrypt create/validate Hash functions
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => {
  // console.log(
  //   `Datos a validar: user-password: ${user.password}, password: ${password}`
  // );
  // if(bcrypt.compareSync(password, user.password)){
  //   console.log("Inicio correcto :)");
  // }
  return bcrypt.compareSync(password, user.password);
};
