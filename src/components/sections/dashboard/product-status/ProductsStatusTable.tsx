import { useState, useEffect } from 'react';
import { format } from 'date-fns';
//import { ordersStatusData } from 'data/ordersStatusData';
import { SelectChangeEvent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import StatusChip from 'components/chips/StatusChip';
import IconifyIcon from 'components/base/IconifyIcon';
import DataGridFooter from 'components/common/DataGridFooter';
import { productsInventoryData } from 'data/productsStatusData';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridApi,
  GridColDef,
  GridActionsCellItem,
  GridRenderEditCellParams,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  useGridApiRef,
} from '@mui/x-data-grid';

interface ProductsStatusTableProps {
  searchText: string;
}

const OrdersStatusTable = ({ searchText }: ProductsStatusTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
  const [rows, setRows] = useState(productsInventoryData);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Code',
      minWidth: 80,
      flex: 1,
      resizable: false,
    },
    {
      field: 'product',
      headerName: 'Product',
      flex: 2,
      minWidth: 180,
      resizable: false,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.75}>
          <IconifyIcon icon="mingcute:user-2-fill" color="neutral.main" fontSize="body2.fontSize" />
          <Typography variant="caption" mt={0.25} letterSpacing={0.5}>
            Products
          </Typography>
        </Stack>
      ),
      valueGetter: (params: { name: string; category: string }) => {
        return `${params.name} ${params.category}`;
      },
      renderCell: (params) => {
        return (
          <Stack direction="column" alignSelf="center" justifyContent="center" sx={{ height: 1 }}>
            <Typography variant="subtitle1" fontSize="caption.fontSize">
              {params.row.product.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" fontSize="caption.fontSize">
              {params.row.product.category}
            </Typography>
          </Stack>
        );
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: 'volume',
      headerName: 'Volume',
      sortable: false,
      flex: 1,
      minWidth: 120,
      resizable: false,
      editable: true,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.75}>
          <IconifyIcon
            icon="healthicons:high-level-negative"
            color="neutral.main"
            fontSize="h7.fontSize"
          />
          <Typography mt={0.175} variant="caption" letterSpacing={0.5}>
            Volume
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'lastRestocked',
      type: 'date',
      headerName: 'Last Restocked',
      editable: true,
      minWidth: 100,
      flex: 1,
      resizable: false,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.75}>
          <IconifyIcon icon="mdi:calendar" color="neutral.main" fontSize="body1.fontSize" />
          <Typography mt={0.175} variant="caption" letterSpacing={0.5}>
          Last Restocked
          </Typography>
        </Stack>
      ),
      renderCell: (params) => format(new Date(params.value), 'MMM dd, yyyy'),
    },
    {
      field: 'stockStatus',
      headerName: 'Status',
      sortable: false,
      minWidth: 120,
      flex: 1,
      resizable: false,
      renderHeader: () => (
        <Stack alignItems="center" gap={0.875}>
          <IconifyIcon
            icon="carbon:checkbox-checked-filled"
            color="neutral.main"
            fontSize="body1.fontSize"
          />
          <Typography mt={0.175} variant="caption" letterSpacing={0.5}>
            Status
          </Typography>
        </Stack>
      ),
      renderCell: (params) => {
        return (
          <Stack direction="column" alignSelf="center" justifyContent="center" sx={{ height: 1 }}>
            <StatusChip status={params.value} />
          </Stack>
        );
      },
      renderEditCell: (params: GridRenderEditCellParams) => {
        const handleChange = (event: SelectChangeEvent<string>) => {
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: event.target.value,
          });
        };
        return (
          <Select value={params.value} onChange={handleChange} fullWidth>
            <MenuItem value="in_stock">In Stock</MenuItem>
            <MenuItem value="low_stock">Low stock</MenuItem>
            <MenuItem value="out_of_stock">Out of stock</MenuItem>
          </Select>
        );
      },
      editable: true,
    },
    
    {
      field: 'price',
      headerName: 'Price',
      headerAlign: 'right',
      align: 'right',
      sortable: false,
      minWidth: 120,
      editable: true,
      flex: 1,
      resizable: false,
      
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      minWidth: 120,
      flex: 1,
      cellClassName: 'actions',
      resizable: false,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <IconifyIcon
                  color="primary.main"
                  icon="mdi:content-save"
                  sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
                />
              }
              label="Save"
              onClick={handleSaveClick(id)}
              size="small"
            />,
            <GridActionsCellItem
              icon={
                <IconifyIcon
                  color="text.secondary"
                  icon="iconamoon:sign-times-duotone"
                  sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
                />
              }
              label="Cancel"
              onClick={handleCancelClick(id)}
              size="small"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <IconifyIcon
                icon="fluent:edit-32-filled"
                color="text.secondary"
                sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
              />
            }
            label="Edit"
            onClick={handleEditClick(id)}
            size="small"
          />,
          <GridActionsCellItem
            icon={
              <IconifyIcon
                icon="mingcute:delete-3-fill"
                color="text.secondary"
                sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
              />
            }
            label="Delete"
            onClick={handleDeleteClick(id)}
            size="small"
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      apiRef={apiRef}
      rows={rows}
      columns={columns}
      rowHeight={80}
      editMode="row"
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 6,
          },
        },
      }}
      checkboxSelection
      pageSizeOptions={[6]}
      disableColumnMenu
      disableVirtualization
      disableRowSelectionOnClick
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        pagination: DataGridFooter,
      }}
      slotProps={{
        toolbar: { setRows, setRowModesModel },
      }}
    />
  );
};

export default OrdersStatusTable;
