import React, { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { addTodo, editTodo, removeTodo } from "../../services";

const ActionBar = ({ todos, setTodos, selectedTodoIndex }) => {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState({});
  const [todoDate, setTodoDate] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpenEdit = () => {
    setSelectedTodo(todos[selectedTodoIndex]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTodo({});
  };

  const handleSave = () => {
    if (Object.keys(selectedTodo).length) {
      editTodo(
        { ...todo, isDone: selectedTodo.isDone },
        selectedTodoIndex,
        todos,
        setTodos
      );
      setSelectedTodo({});
    } else {
      addTodo({ ...todo, isDone: false }, todos, setTodos);
      setTodoDate(null);
    }
    handleClose();
  };

  const handleDelete = () => {
    removeTodo(selectedTodoIndex, todos, setTodos);
  };

  return (
    <div>
      <Box
        sx={{
          marginTop: 5,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button variant="contained" onClick={handleClickOpen}>
          Add item
        </Button>
        {!!todos.length && (
          <>
            <Button variant="contained" onClick={handleOpenEdit}>
              Edit item
            </Button>
            <Button variant="contained" onClick={handleDelete}>
              Remove item
            </Button>
          </>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>
          {Object.keys(selectedTodo).length ? "Edit todo" : "Add new todo"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 10,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Title"
              variant="outlined"
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              sx={{ marginBottom: 5 }}
              defaultValue={
                Object.keys(selectedTodo).length ? selectedTodo.title : ""
              }
            />
            <TextField
              label="Description"
              variant="outlined"
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
              sx={{ marginBottom: 5 }}
              defaultValue={
                Object.keys(selectedTodo).length ? selectedTodo.description : ""
              }
              multiline
              rows={2}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Deadline"
                value={
                  Object.keys(selectedTodo).length
                    ? selectedTodo.deadline
                    : todoDate
                }
                onChange={(newDate) => {
                  setTodoDate(newDate);
                  setTodo({ ...todo, deadline: newDate });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActionBar;
