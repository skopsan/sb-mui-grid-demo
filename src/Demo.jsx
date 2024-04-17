import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  DataGridPro,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid-pro";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  randomCreatedDate,
  randomPrice,
  randomCurrency,
  randomCountry,
  randomCity,
  randomEmail,
  randomInt,
  randomAddress,
} from "@mui/x-data-grid-generator";

function DetailPanelContent({ row: rowProp }) {
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };
  const handleDeleteClick = () => () => {
    // NOOP
  };

  return (
    <Stack
      sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
      direction="column"
    >
      <DataGridPro
        density="compact"
        sx={{ flex: 1, mx: "auto", width: "90%" }}
        columns={[
          {
            field: "name",
            headerName: "Product",
            flex: 1,
            editable: true,
            type: "singleSelect",
            valueOptions: productNames,
          },
          {
            field: "quantity",
            headerName: "Quantity",
            align: "center",
            type: "number",
            editable: true,
          },
          { field: "unitPrice", headerName: "Unit Price", type: "number" },
          {
            field: "total",
            headerName: "Total",
            type: "number",
            valueGetter: (value, row) => row.quantity * row.unitPrice,
          },
          {
            width: 100,
            field: "actions",
            type: "actions",
            headerName: "Actions",
            getActions: ({ id }) => {
              const isInEditMode =
                rowModesModel[id]?.mode === GridRowModes.Edit;

              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    key={`save-${id}`}
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                      color: "primary.main",
                    }}
                    onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    key={`cancel-${id}`}
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                  />,
                ];
              }
              return [
                <GridActionsCellItem
                  key={`edit-${id}`}
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  key={`delete-${id}`}
                  label="Delete"
                  icon={<DeleteIcon />}
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ];
            },
          },
        ]}
        rows={rowProp.products}
        rowModesModel={rowModesModel}
        hideFooter
      />
    </Stack>
  );
}

const columns = [
  { field: "id", headerName: "Order ID" },
  { field: "customer", headerName: "Customer", width: 200 },
  { field: "date", type: "date", headerName: "Placed at" },
  { field: "currency", headerName: "Currency" },
  {
    field: "total",
    type: "number",
    headerName: "Total",
    valueGetter: (value, row) => {
      const subtotal = row.products.reduce(
        (acc, product) => product.unitPrice * product.quantity,
        0
      );
      const taxes = subtotal * 0.05;
      return subtotal + taxes;
    },
  },
];

const productNames = new Array(10)
  .fill(0)
  .map((_, index) => `Product ${index}`);

function generateProducts() {
  const quantity = randomInt(1, 5);
  return [...Array(quantity)].map((_, index) => ({
    id: index,
    name: productNames[randomInt(0, productNames.length)],
    quantity: randomInt(1, 5),
    unitPrice: randomPrice(1, 1000),
  }));
}

const rows = [
  {
    id: 1,
    customer: "Matheus",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 2,
    customer: "Olivier",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 3,
    customer: "Flavien",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 4,
    customer: "Danail",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 5,
    customer: "Alexandre",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
];

export default function BasicDetailPanels() {
  const getDetailPanelContent = React.useCallback(
    ({ row }) => <DetailPanelContent row={row} />,
    []
  );
  const getDetailPanelHeight = React.useCallback(() => "auto", []);

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <DataGridPro
        columns={columns}
        rows={rows}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
      />
    </Box>
  );
}
