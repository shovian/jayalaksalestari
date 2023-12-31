"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./(component)/sidebar";
import DaftarBarang from "./(pages)/daftarbarang";
import DaftarProyek from "./(pages)/daftarproyek";
import AbsensiPage from "./(pages)/halamanabsensi";
import Pengajuan from "./(pages)/pengajuandana";
import Pendanaan from "./(pages)/daftardanatersetujui";
import Persetujuan from "./(pages)/persetujuanDana";
import { User } from "./(entities)/user";
import { Absensi } from "./(entities)/absensi";
import Saldo from "./(pages)/daftarsaldo";
import Keuangan from "./(pages)/keuangan";

const Dashboard = () => {
  const [alreadyAbsensi, setAlreadyAbsensi] = useState<boolean>(false);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  useEffect(() => {
    const id = User.getCurrentUserId();
    const role = User.getCurrentUserRole();
    Absensi.subscribeStatus(id as string, setAlreadyAbsensi);
    role == "managergudang" || role == "staffgudang"
      ? Absensi.getLatestDate().then((date: Date) => {
          const nowDate = new Date(Date.now());
          const isLatestDate = date.getDate() === nowDate.getDate();
          const isLatestMonth = date.getMonth() === nowDate.getMonth();
          const isLatestFullYear = date.getFullYear() === nowDate.getFullYear();

          if (isLatestDate && isLatestMonth && isLatestFullYear) {
            Absensi.getLatestAbsensiStatusByIdKaryawan(id).then((status) => {
              setAlreadyAbsensi(status === "hadir");
            });
          } else {
            if (nowDate.getHours() >= 8) {
              Absensi.assignNewAbsensi();
            }
          }
        })
      : setAlreadyAbsensi(true);
    const tempUserRole = role;
    if (tempUserRole !== undefined) {
      setCurrentUserRole(tempUserRole);
    }
  }, []);
  const pageList =
    currentUserRole === "engineer"
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <AbsensiPage /> },
          { name: "Daftar Dana Tersetujui", page: <Pendanaan /> },
          { name: "Persetujuan Dana", page: <Persetujuan /> },
          { name: "Pengajuan Dana", page: <Pengajuan /> },
          { name: "Daftar Saldo", page: <Saldo /> },
          { name: "Keuangan", page: <Keuangan /> },
        ]
      : currentUserRole === "pemilik"
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <AbsensiPage /> },
          { name: "Persetujuan Dana", page: <Persetujuan /> },
          { name: "Daftar Saldo", page: <Saldo /> },
          { name: "Keuangan", page: <Keuangan /> },
        ]
      : currentUserRole === "adminkeuangan"
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Daftar Dana Tersetujui", page: <Pendanaan /> },
          { name: "Daftar Saldo", page: <Saldo /> },
          { name: "Keuangan", page: <Keuangan /> },
        ]
      : currentUserRole === "adminhrd"
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <AbsensiPage /> },
        ]
      : currentUserRole === "managergudang"
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <AbsensiPage /> },
          { name: "Pengajuan Dana", page: <Pengajuan /> },
          { name: "Daftar Saldo", page: <Saldo /> },
          { name: "Keuangan", page: <Keuangan /> },
        ]
      : [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <AbsensiPage /> },
          { name: "Pengajuan Dana", page: <Pengajuan /> },
        ];
  return currentUserRole ? (
    alreadyAbsensi ? (
      <div className="text-xs lg:text-base">
        <Sidebar pages={pageList} />
      </div>
    ) : (
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        {"Absen dulu"}
        <button
          className="text-slate-500"
          onClick={() => {
            const id = User.getCurrentUserId();
            id ? Absensi.setStatusByIdKaryawan(id, "hadir") : {};
          }}
        >
          Saya hadir!
        </button>
      </div>
    )
  ) : (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      {"You're unauthorized!"}
      <a className="text-slate-500" href="/auth">
        Back to LogIn
      </a>
    </div>
  );
};

export default Dashboard;
