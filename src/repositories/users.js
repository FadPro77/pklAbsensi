const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

exports.createUser = async (data) => {
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password, saltRounds);

  const newUser = await prisma.users.create({
    data,
    include: { pegawai: true },
  });

  return newUser;
};

exports.getUserByUsername = async (username) => {
  const user = await prisma.users.findFirst({
    where: { username },
  });

  return JSONBigInt.parse(JSONBigInt.stringify(user));
};

exports.getUserById = (id) => {
  return prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      role: true,
      nama_lengkap: true,
      pegawaiId: true,
    },
  });
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

exports.updatePassword = async (userId, newPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  const updatedUser = await prisma.users.update({
    where: {
      id: Number(userId),
    },
    data: {
      password: hashedPassword,
    },
  });

  const serializedUser = JSONBigInt.stringify(updatedUser);
  return JSONBigInt.parse(serializedUser);
};
