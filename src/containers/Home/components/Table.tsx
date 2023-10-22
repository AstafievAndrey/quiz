import { Progress } from "@/components";
import { QuizResult } from "@/lib/types/QuizResult";
import { Box, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { FC } from "react";

interface Props {
  rows: QuizResult[];
}
export const Table: FC<Props> = ({ rows }) => {
  const columns = [
    {
      field: "date",
      headerName: "Дата и время завершения",
      width: 200,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.date).toLocaleString(),
    },
    {
      field: "questionCount",
      headerName: "Кол-во вопросов",
      sortable: false,
    },
    {
      field: "errorCount",
      headerName: "Кол-во ошибок",
      sortable: false,
    },
    {
      field: "answerCount",
      headerName: "Результат",
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: "block", width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <Progress
                  count={params.row.questionCount}
                  answerCount={params.row.answerCount}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >{`${Math.round(
                  (100 / params.row.questionCount) * params.row.answerCount
                )}%`}</Typography>
              </Box>
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(_row) => {
          return Math.random();
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
