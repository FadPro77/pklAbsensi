const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users");
const { Unauthorized, BadRequestError } = require("../utils/request");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.register = async (data, file) => {
  if (data.pegawaiId) {
    const pegawai = await prisma.pegawai.findUnique({
      where: { id: data.pegawaiId },
      select: { nama: true, nip: true },
    });

    if (!pegawai) {
      throw new BadRequestError("Pegawai with the provided ID does not exist.");
    }

    data.nama_lengkap = pegawai.nama;
    data.username = pegawai.nip;
  }

  const user = await userRepository.createUser(data);
  const token = createToken(user);

  delete user.password;

  return {
    user,
    token,
  };
};

exports.registerAdmin = async (data, file) => {
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

exports.getProfile = async (userId) => {
  return prisma.users.findUnique({
    where: { id: userId },
    include: {
      pegawai: true,
    },
  });
};
