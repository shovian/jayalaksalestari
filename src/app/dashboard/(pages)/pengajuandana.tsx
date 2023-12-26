import { PengajuanTable } from "../(component)/table";
import { User } from "../(entities)/user";

const Pengajuan = () => {
  return (
    <div className="flex justify-center items-center h-full w-full ">
      <PengajuanTable
        role={User.getCurrentUserRole() || undefined}
      ></PengajuanTable>
    </div>
  );
};

export default Pengajuan;
