import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ColorConstants } from "src/constants/ColorConstants";
import MenuItemComponent from "src/components/Input/Others/MenuItemComponent";

const MuiTableComponet = ({ columns, rows,onView }) => {
  return (
    <Paper sx={{ width: '95%', overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ borderSpacing: '3px' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: ColorConstants.lightBlue,
                  }}
                >
                  <span className="font-bold">{column.label}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>  
          <TableBody >
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? <MenuItemComponent viewOnclick={onView} /> : value }
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MuiTableComponet;
