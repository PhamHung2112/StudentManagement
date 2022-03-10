import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { City, Student } from 'models';
import { useState } from 'react';
import { capitalizeFirstLetter, getMarkColor } from 'utils';

export interface StudentListProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };

  onUpdate?: (formValues: Student) => void;
  onDelete?: (formValues: Student) => void;
}

export default function StudentList({
  studentList,
  cityMap,
  onUpdate,
  onDelete,
}: StudentListProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    onDelete?.(student);
    setOpen(false);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="student list">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight={500}>
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{capitalizeFirstLetter(student.gender)}</TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button color="primary" sx={{ mr: 1 }} onClick={() => onUpdate?.(student)}>
                    Edit
                  </Button>
                  <Button color="error" onClick={() => handleRemoveClick?.(student)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-diaglog-title"
        aria-describedby="delete-diaglog-desc"
      >
        <DialogTitle id="delete-diaglog-title">Remove a student</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-diaglog-desc">
            Are you sure to remove student named&nbsp;
            {
              <Typography color="error" variant="body1" component="span">
                {selectedStudent?.name}
              </Typography>
            }
            <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            color="error"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
