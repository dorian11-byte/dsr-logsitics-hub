import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const mockEmployees = [
  { id: 1, name: 'Alice Wonderland', deliveries: 152, avatar: 'https://placehold.co/40x40/AABBCC/FFFFFF.png', initials: 'AW', status: 'Active' },
  { id: 2, name: 'Bob The Builder', deliveries: 135, avatar: 'https://placehold.co/40x40/CCAABB/FFFFFF.png', initials: 'BB', status: 'Active' },
  { id: 3, name: 'Charlie Brown', deliveries: 120, avatar: 'https://placehold.co/40x40/BBCCAA/FFFFFF.png', initials: 'CB', status: 'On Leave' },
  { id: 4, name: 'Diana Prince', deliveries: 110, avatar: 'https://placehold.co/40x40/AAACCC/FFFFFF.png', initials: 'DP', status: 'Active' },
  { id: 5, name: 'Edward Scissorhands', deliveries: 98, avatar: 'https://placehold.co/40x40/CCAAAC/FFFFFF.png', initials: 'ES', status: 'Active' },
];

export function TopEmployeesTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Deliveries</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="employee avatar" />
                  <AvatarFallback>{employee.initials}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-foreground">{employee.name}</TableCell>
              <TableCell className="text-right text-muted-foreground">{employee.deliveries}</TableCell>
              <TableCell className="text-center">
                <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'} 
                       className={employee.status === 'Active' ? 'bg-green-500/20 text-green-700 border-green-500/30' : 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'}>
                  {employee.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
