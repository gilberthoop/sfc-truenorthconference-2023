import { useEffect } from "react";
import { Action } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState, fetchRegistrations } from "@/store";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import { Participant } from "../../utils/types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import ListFilter from "./ListFilter";

function RegistrationList() {
  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();
  const { data: participants } = useSelector(
    (state: { registrations: { data: Participant[] } }) => state.registrations
  );
  const { isLoading } = useSelector((state: RootState) => state.registrations);

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  // Table information
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

  return (
    <div className="py-8 px-5">
      <header className="flex flex-row-reverse justify-between items-end">
        <ListFilter />
      </header>

      {isLoading ? (
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-center text-white text-2xl sm:text-4xl my-12">
            Loading data...
          </h1>
          <CircularProgress size={100} color="info" />
        </div>
      ) : participants.length <= 0 ? (
        <div>
          <h1 className="text-center text-white text-2xl sm:text-4xl my-12">
            No results found.
          </h1>
        </div>
      ) : (
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          pageSizeOptions={[50, 75, 100]}
          checkboxSelection
          className="list"
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          disableColumnFilter
        />
      )}
    </div>
  );
}

export default RegistrationList;
