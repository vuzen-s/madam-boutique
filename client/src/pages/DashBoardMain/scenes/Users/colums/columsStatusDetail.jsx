

export const columsStatusDetail = [
  {
    field: "id",
    headerAlign: "left",
    align: "left",
    headerName: "ID",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "level",
    headerName: "Level",
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => {
      let levelName = "";
      let color = "";
      let backgroundColor = "";
      switch (params.value) {
        case 1:
          levelName = "Admin Master";
          backgroundColor = "#FF0000";
          color = "white"
          break;
        case 2:
          levelName = "Admin Manager";
          backgroundColor = "#6666FF";
          color = "white"
          break;
        case 3:
          levelName = "Admin Editor";
          backgroundColor = "#00FF00";
          break;
        case 4:
          levelName = "Member";
          backgroundColor = "#DDDDDD";
          break;
        default:
          levelName = "Unknown";
          color = "black";
          backgroundColor = "white";
      }
      return (
        <div
          style={{
            backgroundColor,
            color,
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {levelName}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    // headerAlign: "left",
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => {
      let color = "";
      let backgroundColor = "";
      if (params.value === "Hidden") {
        backgroundColor = "#152b2b";
        color = "white";
      } else {
        backgroundColor = "white";
      }
      return (
        <div style={{ backgroundColor, width: "70px", textAlign: "center", color, padding: "5px", borderRadius: "5px" }}>
          {params.value}
        </div>
      );
    },
  },
  {
    field: "edit",
    headerName: "Action",
    align: "center",
    headerAlign: "center",
    flex: 1,
  }
];