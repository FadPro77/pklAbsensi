const { z } = require("zod");
const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  Unauthorized,
  Forbidden,
} = require("../utils/request");
const userRepository = require("../repositories/users");

exports.authorization =
  (...roles) =>
  async (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new Unauthorized("You need to login in advance!");
    }

    const splittedAuthHeader = authorizationHeader.split(" ");
    if (splittedAuthHeader.length <= 1) {
      throw new Unauthorized("Token is not valid!");
    }

    const token = splittedAuthHeader[1];
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.getUserById(
      Number(extractedToken.user_id),
    );

    if (!user) {
      throw new Unauthorized("User not found!");
    }

    const accessValidation = roles.includes(user.role);
    if (!accessValidation) {
      throw new Forbidden("You can not access this resource!");
    }

    req.user = user;
    next();
  };

exports.validateRegister = (req, res, next) => {
  const validateBody = z.object({
    password: z.string(),
    pegawaiId: z.preprocess(
      (val) => (val === undefined ? undefined : Number(val)),
      z.number().optional(),
    ),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  req.body = result.data; // IMPORTANT: use parsed values
  next();
};

exports.validateRegisterAdmin = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    password: z.string(),
    username: z.string(),
    nama_lengkap: z.string(),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  req.body = result.data; // IMPORTANT: use parsed values
  next();
};

exports.validateLogin = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    username: z.string(),
    password: z.string(),
  });

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateAdmin = (req, res, next) => {
  const userRole = req.user.role; // Pastikan role_id sudah di-set pada req.user setelah proses otentikasi
  if (userRole !== 1) {
    // adminRole = 1
    throw new Forbidden("You do not have permission to perform this action!");
  }
  next();
};
