import { TPage } from "@/app/types/TPage";
import { useEffect, useState } from "react";

interface Attendance {
  id: string;
  employeeName: string;
  date: string;
  status: string;
}

const AttendancePage: React.FC<TPage> = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

  useEffect(() => {
    // Simulating fetching attendance data from an API
    const fetchAttendanceData = async () => {
      // Simulated API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy attendance data
      const dummyData: Attendance[] = [
        {
          id: "1",
          employeeName: "John Doe",
          date: "2023-09-21",
          status: "Present",
        },
        {
          id: "2",
          employeeName: "Jane Smith",
          date: "2023-09-20",
          status: "Absent",
        },
        {
          id: "3",
          employeeName: "Michael Johnson",
          date: "2023-09-19",
          status: "Present",
        },
      ];

      setAttendanceData(dummyData);
    };

    fetchAttendanceData();
  }, []);

  return (
    <div className="general-page">
      <div className="general-page__header">
        <h1 className="general-page__title">Kehadiran</h1>
        <button className="add-button" onClick={() => {}}>
          +
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance) => (
            <tr key={attendance.id}>
              <td>{attendance.id}</td>
              <td>{attendance.employeeName}</td>
              <td>{attendance.date}</td>
              <td>{attendance.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
