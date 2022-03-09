import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { City } from 'models';

export interface CityTableProps {
  cityList: City[];
}

export default function CityTable({ cityList }: CityTableProps) {
  return (
    <TableContainer>
      <Table aria-label="city table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cityList.map((city, idx) => (
            <TableRow key={city.code}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{city.code}</TableCell>
              <TableCell>{city.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
