const leavesService = require("../services/leaves");
const { successResponse } = require("../utils/response");

exports.getLeaves = async (req, res, next) => {
  const data = await leavesService.getLeaves(
    req.query?.pegawaiId,
    req.query?.tanggal_mulai,
    req.query?.tanggal_selesai,
    req.query?.jenis,
    req.query?.alasan,
    req.query?.status_pengajuan,
  );
  successResponse(res, data);
};

exports.getLeavesById = async (req, res, next) => {
  const data = await leavesService.getLeavesById(req.params.id);
  successResponse(res, data);
};

exports.createLeaves = async (req, res, next) => {
  const data = await leavesService.createLeaves(req.body, req.user);
  successResponse(res, {
    message: "Leaves successfully Added!",
    data,
  });
};

exports.updateLeaves = async (req, res, next) => {
  const { id } = req.params;
  const data = await leavesService.updateLeaves(id, req.body);
  successResponse(res, {
    message: "Leaves successfully Updated!",
    data,
  });
};
