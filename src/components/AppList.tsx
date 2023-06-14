import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Participant } from "@/utils/types";

interface ListProp {
  data: Participant[];
}

function AppList({ data }: ListProp) {
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
  const tableData = data.map((data, index) => ({
    id: index + 1,
    firstname: data.firstname,
    lastname: data.lastname,
    phone: data.phone,
    email: data.email,
    region: data.region,
    area: data.area,
    sfcRole: data.sfcRole,
    coupleCoordinators: data.coupleCoordinators,
    arrivalDetails: `${data.origin} ${data.arrivalDateTime}`,
    departureDetails: `${data.destination} ${data.departureDateTime}`,
    needsAccommodation: data.accommodationNeeded,
    fieldOfWork: data.fieldOfWork,
    shirtSize: data.shirtSize,
    allergies: data.allergies,
    emergencyContact: data.emergencyContact,
    mediaConsent: data.mediaConsent ? "Yes" : "No",
  }));

  return (
    <section>
      {data?.length > 0 ? (
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
      ) : (
        <div>
          <h1 className="text-center text-white text-2xl sm:text-4xl my-12">
            No results found.
          </h1>
        </div>
      )}
    </section>
  );
}

export default AppList;
