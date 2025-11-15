const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");
const axios = require("axios");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
  // encrypt password
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password, saltRounds);

  // create the new user
  const newUser = await prisma.users.create({
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(newUser);
  return JSONBigInt.parse(serializedStudents);
};

exports.getUserByUsername = async (username) => {
  const user = await prisma.users.findFirst({
    where: { username },
  });

  return JSONBigInt.parse(JSONBigInt.stringify(user));
};

exports.getUserById = async (id) => {
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedStudents);
};

exports.findUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id: BigInt(id),
    },
  });

  const serializedUser = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedUser);
};

exports.updateUserRole = async (userId, newRoleId) => {
  const updatedUser = await prisma.users.update({
    where: {
      id: BigInt(userId),
    },
    data: {
      role_id: parseInt(newRoleId, 10),
    },
  });

  const serializedUser = JSONBigInt.stringify(updatedUser);
  return JSONBigInt.parse(serializedUser);
};
