const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetAbsent = (req, res, next) => {
  const validateQuery = z.object({
    pegawaiId: z.string().optional(),
    tanggal: z.string().optional(),
    jam_masuk: z.string().optional(),
    jam_keluar: z.string().optional(),
    status: z.string().optional(),
    keterangan: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetAbsentById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

exports.validateCreateAbsent = (req, res, next) => {
  const validateBody = z.object({
    status: z.enum(["hadir", "izin", "sakit", "cuti", "alpha", "lembur"], {
      errorMap: () => ({ message: "Status harus valid'" }),
    }),
    keterangan: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  req.body = resultValidateBody.data;
  next();
};

exports.validateUpdateAbsent = (req, res, next) => {
  const validateBody = z.object({
    status: z.enum(["hadir", "izin", "sakit", "cuti", "alpha", "lembur"], {
      errorMap: () => ({ message: "Status harus valid" }),
    }),
    keterangan: z.string().optional(),
  });

  try {
    const validatedData = validateBody.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid data",
      errors: error.errors ?? error.message, // FIXED
    });
  }
};
