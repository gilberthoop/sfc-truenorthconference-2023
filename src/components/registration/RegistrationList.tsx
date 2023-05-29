import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { Participant } from "../../utils/types";
import { TABLE_HEADERS } from "@/utils/global-values";

function RegistrationList() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  async function fetchParticipants() {
    const response = await fetch("/api/registrations");
    const participants: Participant[] = await response.json();
    setParticipants(participants);
  }

  useEffect(() => {
    fetchParticipants();
  }, []);

  // Table information
  const headers = TABLE_HEADERS;
  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 60 },
    { field: "firstname", headerName: "First name", width: 140 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "region", headerName: "Region", width: 170 },
    { field: "area", headerName: "Area", width: 240 },
    { field: "sfcRole", headerName: "SFC Role", width: 240 },
    {
      field: "coupleCoordinators",
      headerName: "Couple Coordinators",
      width: 200,
    },
    { field: "arrivalDetails", headerName: "Arrival Details", width: 380 },
    { field: "departureDetails", headerName: "Departure Details", width: 380 },
    {
      field: "needsAccommodation",
      headerName: "Needs Accommodation",
      width: 180,
    },
    { field: "fieldOfWork", headerName: "Field of Work", width: 320 },
    { field: "shirtSize", headerName: "Shirt Size", width: 100 },
    { field: "allergies", headerName: "Allergies", width: 160 },
    { field: "emergencyContact", headerName: "Emergency Contact", width: 240 },
    { field: "mediaConsent", headerName: "Media Consent", width: 130 },
  ];
  const tableData = participants.map((participant, index) => ({
    id: index + 1,
    firstname: participant.firstname,
    lastname: participant.lastname,
    phone: participant.phone,
    email: participant.email,
    region: participant.region,
    area: participant.area,
    sfcRole: participant.sfcRole,
    coupleCoordinators: participant.coupleCoordinators,
    arrivalDetails: `${participant.origin} ${participant.arrivalDateTime}`,
    departureDetails: `${participant.destination} ${participant.departureDateTime}`,
    needsAccommodation: participant.accommodationNeeded,
    fieldOfWork: participant.fieldOfWork,
    shirtSize: participant.shirtSize,
    allergies: participant.allergies,
    emergencyContact: participant.emergencyContact,
    mediaConsent: participant.mediaConsent ? "Yes" : "No",
  }));

  function exportToExcel() {
    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    // Add headers to the worksheet
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Add worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");
    // Save the workbook as a file
    XLSX.writeFile(workbook, "2023-sfctnc-registration.xlsx");
  }

  return (
    <div className="py-8 px-5">
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={exportToExcel}
      >
        Export to Excel
      </button>

      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[25, 50, 75, 100]}
        checkboxSelection
        className="list"
      />
    </div>
  );
}

export default RegistrationList;
