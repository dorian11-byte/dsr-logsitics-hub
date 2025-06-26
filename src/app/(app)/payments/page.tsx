import { PaymentsTable } from '@/components/dsr/payments/payments-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const mockPayments = [
  { employeeId: 'EMP001', employeeName: 'Alice Wonderland', period: 'July 2024', totalHours: 160, overtimeHours: 10, basePay: 3200, overtimePay: 300, totalEarnings: 3500, status: 'Paid' },
  { employeeId: 'EMP002', employeeName: 'Bob The Builder', period: 'July 2024', totalHours: 155, overtimeHours: 5, basePay: 3100, overtimePay: 150, totalEarnings: 3250, status: 'Paid' },
  { employeeId: 'EMP003', employeeName: 'Charlie Brown', period: 'July 2024', totalHours: 140, overtimeHours: 0, basePay: 2800, overtimePay: 0, totalEarnings: 2800, status: 'Pending' },
  { employeeId: 'EMP004', employeeName: 'Diana Prince', period: 'July 2024', totalHours: 168, overtimeHours: 8, basePay: 3360, overtimePay: 240, totalEarnings: 3600, status: 'Paid' },
  { employeeId: 'EMP001', employeeName: 'Alice Wonderland', period: 'June 2024', totalHours: 150, overtimeHours: 5, basePay: 3000, overtimePay: 150, totalEarnings: 3150, status: 'Paid' },
];

export default function PaymentsPage() {
  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-headline font-semibold text-foreground">Employee Payments</h1>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
        </div>
      </div>
      
      <Card className="shadow-xl">
        <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <CardTitle className="font-headline">Payment Records</CardTitle>
                    <CardDescription>View and manage employee earnings and payment statuses.</CardDescription>
                </div>
                <div className="flex gap-2 flex-col sm:flex-row">
                    <Input placeholder="Search by employee name or ID..." className="w-full sm:w-auto bg-background focus-visible:ring-primary" />
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px] bg-background focus-visible:ring-primary">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <PaymentsTable payments={mockPayments} />
        </CardContent>
      </Card>
    </div>
  );
}
