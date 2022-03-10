import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { PathEnum } from 'constants/path';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/Common/StudentForm';

export default function AddEditPage() {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        toast.error((error as Error).message);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.create(formValues);
    }

    toast.success('Save student successfully');

    history.push(PathEnum.STUDENT_LIST);
  };

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <Box margin="100px 30px 0 30px">
      <Box>
        <Typography variant="h5" fontWeight={500} marginBottom="5px">
          Student
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit">Home</Typography>
          <Typography
            color="text.primary"
            onClick={() => history.push(PathEnum.STUDENT_LIST)}
            sx={{ cursor: 'pointer' }}
          >
            Student
          </Typography>
          <Typography color="primary" fontWeight={500}>
            {isEdit ? 'Update student information' : 'Add new student'}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box marginTop="30px">
        <Button
          color="error"
          startIcon={<ArrowBack />}
          onClick={() => history.push(PathEnum.STUDENT_LIST)}
        >
          Back to student list
        </Button>
      </Box>

      <Typography variant="h5" margin="15px 0 0 30px" sx={{ textDecoration: 'underline' }}>
        {isEdit ? 'Update student information' : 'Add new student'}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box padding="15px 30px 30px">
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
