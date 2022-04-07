export const MainNav = [
  {
    id:'home',
    icon: "lnr-home",
    label: "Home",
    to: "#/dashboards",
  },

];
export const ReturnANav = [
  {
    icon: "lnr-chart-bars",
    label: "Dashboard",
    to: "#/returnReport/returndashboard",
  },
];
export const InventoryANav = [
  {
    icon: "lnr-chart-bars",
    label: "Inventory Ageing",
    content: [
      {
        label: "Overview",
        to: "#/widgets/overview",
      },
      {
        label: "Report",
        to: "#/widgets/report",
      },
    ],
  },
  {
    icon: "pe-7s-graph1",
    label: "Dead Stock Simulation",
    content: [
      {
        label: "Dashboard",
        to: "#/widgets/deadstockdashboard",
      },
    ],
  },
  {
    icon: "pe-7s-graph2",
    label: "Inventory Profiling",
    content: [
      {
        label: "Report",
        to: "#/widgets/iprofilingreport",
      },
      {
        label: "Dashboard",
        to: "#/widgets/iprofilingreport",
      },
    ],
  },
  {
    icon: "lnr-chart-bars",
    label: "Demand Profiling",
    content: [
      {
        label: "Report",
        to: "#/widgets/idemandreport",
      },
      {
        label: "Dashboard",
        to: "#/widgets/idemanddashboard",
      },
    ],
  },
];
export const AdminitrationNav = [
  {
    icon: "lnr-database",
    label: "Admin",
    content: [
      {
        label: "Add New Company",
        to: "#/admin/addnewcompany",
      },
      {
        label: "Add New Report Form",
        to: "#/admin/addnewreport",
      },
      {
        label: "Add New User",
        to: "#/admin/addnewuser",
      },
      {
        label: "Refresh User Data",
        to: "#/admin/",
      },
      {
        label: "Table Management",
        to: "#/admin/",
      },
    ],
  },

];


