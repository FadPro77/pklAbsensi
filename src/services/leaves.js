const leavesRepository = require("../repositories/leaves");

const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../utils/request");

exports.getLeaves = async (
  pegawaiId,
  tanggal_mulai,
  tanggal_selesai,
  jenis,
  alasan,
  status_pengajuan,
) => {
  const leaves = await leavesRepository.getLeaves(
    pegawaiId,
    tanggal_mulai,
    tanggal_selesai,
    jenis,
    alasan,
    status_pengajuan,
  );
  if (!leaves.length) {
    throw new NotFoundError("No leaves found with the provided criteria");
  }
  return leaves;
};

exports.getLeavesById = async (id) => {
  const data = await leavesRepository.getLeavesById(id);
  if (!data) {
    throw new NotFoundError("Leave not found with the provided ID");
  }
  return data;
};

exports.createLeaves = async (data, user) => {
  if (!user || !user.pegawaiId) {
    throw new BadRequestError("User tidak memiliki pegawaiId!");
  }

  data.pegawaiId = user.pegawaiId;

  return leavesRepository.createLeaves(data);
};
