import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import isEmpty from "is-empty";

function FullTable({ fields, data, actions }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {fields.map(field => (
            <TableCell key={field.key} align={field.align}>
              {field.label}
            </TableCell>
          ))}
          <TableCell key={"actions"} align="right">
            Ações
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(data) &&
          data.map((data, index) => (
            <TableRow key={index}>
              {fields.map((field, index) => (
                <TableCell key={index} align={field.align}>
                  {field.map ? field.map[data[field.key]] : data[field.key]}
                </TableCell>
              ))}
              <TableCell key={`action-${index}`} align="right">
                {actions(data)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default FullTable;
