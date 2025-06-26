import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Payment {
  employeeId: string;
  employeeName: string;
  period: string;
  totalHours: number;
  overtimeHours: number;
  basePay: number;
  overtimePay: number;
  totalEarnings: number;
  status: 'Paid' | 'Pending' | 'Failed';
}

interface PaymentsTableProps {
  payments: Payment[];
}

const statusColors: Record<Payment['status'], string> = {
  Paid: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800/30 dark:text-green-300 dark:border-green-700',
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800/30 dark:text-yellow-300 dark:border-yellow-700',
  Failed: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-800/30 dark:text-red-300 dark:border-red-700',
};

export function PaymentsTable({ payments }: PaymentsTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Total Hours</TableHead>
            <TableHead className="text-right">Overtime Hours</TableHead>
            <TableHead className="text-right">Base Pay</TableHead>
            <TableHead className="text-right">Overtime Pay</TableHead>
            <TableHead className="text-right">Total Earnings</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={`${payment.employeeId}-${payment.period}`} className="hover:bg-muted/30">
              <TableCell className="font-medium text-foreground">{payment.employeeName}</TableCell>
              <TableCell className="text-muted-foreground">{payment.period}</TableCell>
              <TableCell className="text-right text-muted-foreground">{payment.totalHours.toFixed(2)}</TableCell>
              <TableCell className="text-right text-muted-foreground">{payment.overtimeHours.toFixed(2)}</TableCell>
              <TableCell className="text-right text-muted-foreground">${payment.basePay.toFixed(2)}</TableCell>
              <TableCell className="text-right text-muted-foreground">${payment.overtimePay.toFixed(2)}</TableCell>
              <TableCell className="text-right font-semibold text-primary">${payment.totalEarnings.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className={`${statusColors[payment.status]} text-xs`}>
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit Record
                    </DropdownMenuItem>
                    {payment.status === 'Pending' && (
                         <DropdownMenuItem className="text-green-600 focus:bg-green-100 focus:text-green-700">
                            Mark as Paid
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:bg-red-100 focus:text-destructive">
                      Delete Record
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
