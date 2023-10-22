import { Progress, ProgressPercent } from "@/components";
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
          <ProgressPercent
            count={params.row.questionCount}
            answerCount={params.row.answerCount}
          />
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
