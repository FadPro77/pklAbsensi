const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetEmployees = (req, res, next) => {
  const validateQuery = z.object({
    nip: z.string().optional(),
    nama: z.string().optional(),
    jabatan: z.string().optional(),
    status: z.string().optional(),
    tanggal_masuk: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetEmployeesById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

exports.validateCreateEmployee = (req, res, next) => {
  const validateBody = z.object({
    nip: z.string(),
    nama: z.string(),
    jabatan: z.string(),
    status: z.enum(["aktif", "nonaktif"], {
      errorMap: () => ({ message: "Status harus 'aktif' atau 'nonaktif'" }),
    }),
    tanggal_masuk: z.string(),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  const resultvalidateFileBody = validateFileBody.safeParse(req.files);
  if (!resultvalidateFileBody.success) {
    throw new BadRequestError(resultvalidateFileBody.error.errors);
  }
  req.body = resultValidateBody.data;
  next();
};

exports.validateUpdateEmployee = (req, res, next) => {
  const validateBody = z.object({
    nip: z.string().min(1, "Nip pegawai tidak boleh kosong"),
    nama: z.string().min(1, "Nama pegawai tidak boleh kosong"),
    jabatan: z.string().min(1, "Nama jabatan tidak boleh kosong").optional(),
    status: z
      .enum(["aktif", "nonaktif"], {
        errorMap: () => ({ message: "Status harus 'aktif' atau 'nonaktif'" }),
      })
      .optional(),
    tanggal_masuk: z
      .string()
      .min(1, "Tanggal masuk pegawai tidak boleh kosong")
      .optional(),
  });

  const validateFileBody = z
    .object({
      foto: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  try {
    const validatedData = validateBody.parse(req.body);

    const resultvalidateFileBody = validateFileBody.safeParse(req.files);
    if (!resultvalidateFileBody.success) {
      throw new BadRequestError(resultvalidateFileBody.error.errors);
    }

    req.body = validatedData;
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: error.errors });
  }

  next();
};

exports.validateDeleteEmployee = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
