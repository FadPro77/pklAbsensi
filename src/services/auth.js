const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users");
const { imageUpload } = require("../utils/imageKit");
const { Unauthorized } = require("../utils/request");

exports.register = async (data, file) => {
  const user = await userRepository.createUser(data);
  const token = createToken(user);
  delete user.password;

  return {
    user,
    token,
  };
};

exports.login = async (username, password) => {
  const user = await userRepository.getUserByUsername(username);
  if (!user) {
    throw new Unauthorized("Username is not found!");
  }

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
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });

  return token;
};
