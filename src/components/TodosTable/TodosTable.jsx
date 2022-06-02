import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { format } from "date-fns";
import { uuid } from "uuidv4";

import { changeTodoStatus } from "../../services";

const TodosTable = ({
  todos,
  setTodos,
  selectedTodoIndex,
  setSelectedTodoIndex,
}) => {
  const handleChange = (e) => {
    setSelectedTodoIndex(e.target.value);
  };

  return (
    <FormControl
      sx={{
        width: "100%",
      }}
    >
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={selectedTodoIndex}
        onChange={handleChange}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: "80%",
            margin: "auto",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell align="right">To do</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Deadline</TableCell>
                <TableCell align="right">Done</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {todos.map((todo, ind) => (
                <TableRow
                  key={uuid()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <FormControlLabel
                      value={ind}
                      control={<Radio />}
                      label=""
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {todo.title}
                  </TableCell>
                  <TableCell align="right">{todo.description}</TableCell>
                  <TableCell align="right">
                    {format(todo.deadline, "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox
                      checked={todo.isDone}
                      onChange={() =>
                        changeTodoStatus(ind, todos, !todo.isDone, setTodos)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </RadioGroup>
    </FormControl>
  );
};

export default TodosTable;
