const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

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
