import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Participant } from "../../utils/types";

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

  const headers = [
    "#",
    "First Name",
    "Last Name",
    "Phone",
    "Email",
    "Region",
    "Area",
    "SFC Role",
    "Couple Coordinators",
    "Arrival Details",
    "Departure Details",
    "Needs accommodation",
    "Field of Work",
    "Shirt Size",
    "Allergies",
    "Emergency Contact",
    "Media Consent",
  ];

  const tableData = participants.map((participant, index) => ({
    "#": index + 1,
    "First name": participant.firstname,
    "Last name": participant.lastname,
    Phone: participant.phone,
    Email: participant.email,
    Region: participant.region,
    Area: participant.area,
    "SFC Role": participant.sfcRole,
    "Couple Coordinators": participant.coupleCoordinators,
    "Arrival Details": `${participant.origin}\n${participant.arrivalDateTime}`,
    "Departure Details": `${participant.destination}\n${participant.departureDateTime}`,
    "Needs accommodation": participant.accommodationNeeded,
    "Field of Work": participant.fieldOfWork,
    "Shirt Size": participant.shirtSize,
    Allergies: participant.allergies,
    "Emergency Contact": participant.emergencyContact,
    "Media Consent": participant.mediaConsent ? "Yes" : "No",
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
      <table className="mt-8 w-full divide-y divide-gray-200">
        <thead className="bg-gray-500">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((data, index) => (
            <tr key={index}>
              {Object.values(data).map((cell, index) => (
                <td
                  key={index}
                  className="px-6 py-4 whitespace-nowrap text-sm text-black"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistrationList;
