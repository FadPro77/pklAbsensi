const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users");
const { imageUpload } = require("../utils/imageKit");
const { Unauthorized } = require("../utils/request");

exports.register = async (data, file) => {
  // create user
  const user = await userRepository.createUser(data);

  // generate token
  const token = createToken(user);

  // don't forget to remove the password object, if not removed it will be displayed in response
  delete user.password;

  // return the user info and the token
  return {
    user,
    token,
  };
};

exports.login = async (username, password) => {
  // get user by username
  const user = await userRepository.getUserByUsername(username);
  if (!user) {
    throw new Unauthorized("Username is not found!");
  }

  // compare the password
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Unauthorized("Incorrect password!");
  }

  const token = createToken(user);
  delete user.password;

  return {
    user,
    token,
  };
};

const createToken = (user) => {
  // generate token with jwt
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });

  return token;
};
