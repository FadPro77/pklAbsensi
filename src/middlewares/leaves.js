const { z } = require("zod");
const { BadRequestError } = require("../utils/request");
const { jenis_izin, status_pengajuan } = require("@prisma/client");

exports.validateGetLeaves = (req, res, next) => {
  const validateQuery = z.object({
    pegawaiId: z.string().optional(),
    tanggal_mulai: z.string().optional(),
    tanggal_selesai: z.string().optional(),
    jenis: z.string().optional(),
    alasan: z.string().optional(),
    status_pengajuan: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetLeavesById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

exports.validateCreateLeaves = (req, res, next) => {
  const validateBody = z.object({
    jenis: z.enum(["izin", "sakit", "cuti"], {
      errorMap: () => ({ message: "Izin harus valid" }),
    }),
    alasan: z.string(),
    tanggal_mulai: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "tanggal_mulai harus format YYYY-MM-DD",
    }),
    tanggal_selesai: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "tanggal_selesai harus format YYYY-MM-DD",
    }),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  req.body = {
    ...result.data,
    tanggal_mulai: new Date(result.data.tanggal_mulai),
    tanggal_selesai: new Date(result.data.tanggal_selesai),
  };

  next();
};

exports.validateUpdateLeaves = (req, res, next) => {
  const validateParams = z.object({
    id: z.coerce.number(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    status_pengajuan: z.enum(["menunggu", "disetujui", "ditolak"], {
      errorMap: () => ({ message: "Status pengajuan harus valid'" }),
    }),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};
