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
    "Transportation Origin",
    "Transportation Destination",
    "Arrival Date and Time",
    "Needs accommodation",
    "Field of Work",
    "Shirt Size",
    "Allergies",
    "Emergency Contact",
    "Media Consent",
  ];

  function convertBoolToYesOrNo(
    participants: Participant[],
    propNames: string[]
  ): Participant[] {
    return participants.map((item) => ({
      ...item,
      ...propNames.reduce(
        (acc, propName) => ({
          ...acc,
          [propName]: item[propName] ? "Yes" : "No",
        }),
        {}
      ),
    }));
  }

  function exportToExcel() {
    const data = convertBoolToYesOrNo(participants, [
      "accommodationNeed",
      "mediaConsent",
    ]);

    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
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
          {participants.map((participant, index) => (
            <tr key={participant.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.firstname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.lastname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.region}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.area}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.sfcRole}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.coupleCoordinators}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.origin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.destination}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.arrivalDateTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.accommodationNeeded ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.fieldOfWork}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.shirtSize}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.allergies}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.emergencyContact}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {participant.mediaConsent ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistrationList;
