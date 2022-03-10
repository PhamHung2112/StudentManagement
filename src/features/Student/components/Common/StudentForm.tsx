import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components';
import { RadioGroupField } from 'components/FormFields/RadioGroupField';
import { selectCityOptions } from 'features/City/citySlice';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your full name')
    .test('two words', 'Please enter at least two words', (value) => {
      if (!value) return true;
      const parts = value ? value?.split(' ') : [];
      return parts.filter((x) => !!x).length >= 2;
    }),
  age: yup
    .number()
    .positive('Please enter a positive number')
    .min(18, 'Min is 18')
    .max(60, 'Max is 60')
    .integer('Please enter an integer number')
    .required('Please enter your age')
    .typeError('Please enter a valid number'),
  mark: yup
    .number()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .required('Please enter your mark')
    .typeError('Please enter a valid number'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please select either male or female')
    .required('Please select your gender'),
  city: yup.string().required('Please select your city'),
});

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Box maxWidth="400px">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}&nbsp; Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
