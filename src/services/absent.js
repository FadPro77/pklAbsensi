const absentRepository = require("../repositories/absent");
const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../utils/request");

exports.getAbsent = async (
  pegawaiId,
  tanggal,
  jam_masuk,
  jam_keluar,
  status,
  keterangan,
) => {
  const absent = await absentRepository.getAbsent(
    pegawaiId,
    tanggal,
    jam_masuk,
    jam_keluar,
    status,
    keterangan,
  );
  if (!absent.length) {
    throw new NotFoundError(
      "No absent records found with the provided criteria",
    );
  }
  return absent;
};

exports.getAbsentById = async (id) => {
  const data = await absentRepository.getAbsentById(id);
  if (!data) {
    throw new NotFoundError("Absent record is Not Found!");
  }
  return data;
};

exports.createAbsent = async (data, user) => {
  if (!user || !user.pegawaiId) {
    throw new BadRequestError("User tidak memiliki pegawaiId!");
  }

  data.pegawaiId = user.pegawaiId;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  data.tanggal = today;

  const now = new Date();
  data.jam_masuk = now;

  return absentRepository.createAbsent(data);
};

exports.updateAbsent = async (id, data) => {
  const existingAbsent = await absentRepository.getAbsentById(id);
  if (!existingAbsent) {
    throw new NotFoundError("Absent record is Not Found!");
  }

  // Only allow these two fields to be changed
  const safeData = {
    status: data.status,
    keterangan: data.keterangan,
  };

  // tanggal stays the same as database (do NOT reset to today)
  safeData.tanggal = existingAbsent.tanggal;

  // jam_masuk stays the same (do NOT change)
  safeData.jam_masuk = existingAbsent.jam_masuk;

  // jam_keluar is always NOW (auto)
  safeData.jam_keluar = new Date();

  const updatedAbsent = await absentRepository.updateAbsent(id, safeData);
  if (!updatedAbsent) {
    throw new InternalServerError(["Failed to update Absent record!"]);
  }

  return updatedAbsent;
};
