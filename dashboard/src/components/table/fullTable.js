import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from "@material-ui/core";
import isEmpty from "is-empty";

function FullTable({ fields, data, actions }) {
  return (
    <Table>
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
                  {data[field.key]}
                </TableCell>
              ))}
              <TableCell key={`action-${index}`} align="right">
                {actions.map(action => (
                  <IconButton
                    aria-label={action.label}
                    onClick={() => action.action && action.action(data)}
                  >
                    <action.icon />
                  </IconButton>
                ))}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default FullTable;
