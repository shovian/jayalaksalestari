"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./(component)/sidebar";
import DaftarBarang from "./(pages)/daftarbarang";
import DaftarProyek from "./(pages)/daftarproyek";
import Absensi from "./(pages)/absensi";
import Pengajuan from "./(pages)/pengajuandana";
import Pendanaan from "./(pages)/daftardanatersetujui";
import Persetujuan from "./(pages)/persetujuanDana";
import { User } from "./(entities)/user";

const Dashboard = () => {
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  useEffect(() => {
    const tempUserRole = User.getCurrentUserRole();
    if (tempUserRole !== undefined) {
      setCurrentUserRole(tempUserRole);
    }
  }, []);
  const pageList =
    currentUserRole === ""
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <Absensi /> },
          { name: "Daftar Dana Tersetujui", page: <Pendanaan /> },
          { name: "Persetujuan Dana", page: <Persetujuan /> },
          { name: "Pengajuan Dana", page: <Pengajuan /> },
        ]
      : currentUserRole === "pemilik"
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <Absensi /> },
          { name: "Persetujuan Dana", page: <Persetujuan /> },
        ]
      : currentUserRole === "adminkeuangan"
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Daftar Dana Tersetujui", page: <Pendanaan /> },
        ]
      : currentUserRole === "adminhrd"
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <Absensi /> },
        ]
      : currentUserRole === "managergudang"
      ? [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <Absensi /> },
          { name: "Pengajuan Dana", page: <Pengajuan /> },
        ]
      : [
          { name: "Daftar Barang", page: <DaftarBarang /> },
          { name: "Daftar Proyek", page: <DaftarProyek /> },
          { name: "Absensi", page: <Absensi /> },
          { name: "Pengajuan Dana", page: <Pengajuan /> },
        ];
  return currentUserRole ? (
    <Sidebar pages={pageList} />
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
