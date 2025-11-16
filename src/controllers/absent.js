const absentService = require("../services/absent");
const { successResponse } = require("../utils/response");

exports.getAbsent = async (req, res, next) => {
  const data = await absentService.getAbsent(
    req.query?.pegawaiId,
    req.query?.tanggal,
    req.query?.jam_masuk,
    req.query?.jam_keluar,
    req.query?.status,
    req.query?.keterangan,
  );
  successResponse(res, data);
};

exports.getAbsentById = async (req, res, next) => {
  const data = await absentService.getAbsentById(req.params.id);
  successResponse(res, data);
};

exports.createAbsent = async (req, res, next) => {
  const data = await absentService.createAbsent(req.body, req.user);
  successResponse(res, {
    message: "Absent successfully Added!",
    data,
  });
};

exports.updateAbsent = async (req, res, next) => {
  const { id } = req.params;

  const data = await absentService.updateAbsent(id, req.body);
  successResponse(res, {
    message: "Absent Updated successfully!",
    data,
  });
};
