import { StatsCard } from '@/components/dsr/dashboard/stats-card';
import { ServicesChart } from '@/components/dsr/dashboard/services-chart';
import { TopEmployeesTable } from '@/components/dsr/dashboard/employees-table';
import { RecentDeliveriesTable } from '@/components/dsr/dashboard/recent-deliveries-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Truck, DollarSign, Users, ListChecks } from 'lucide-react';

const mockStats = {
  totalDeliveries: 1250,
  totalRevenue: 75600.50,
  activeEmployees: 25,
  pendingTasks: 15,
};

const mockRecentDeliveries = [
  { id: 'OM78901', client: 'Tech Solutions Inc.', date: '2024-07-28', status: 'Delivered', amount: 250.00 },
  { id: 'OM78902', client: 'Global Goods Co.', date: '2024-07-28', status: 'In Transit', amount: 180.50 },
  { id: 'OM78903', client: 'Innovate Ltd.', date: '2024-07-27', status: 'Delivered', amount: 320.75 },
  { id: 'OM78904', client: 'Alpha Corp', date: '2024-07-27', status: 'Pending', amount: 95.00 },
  { id: 'OM78905', client: 'Beta LLC', date: '2024-07-26', status: 'Delivered', amount: 450.20 },
];


export default function DashboardPage() {
  return (
    <div className="container mx-auto space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-foreground">Dashboard</h1>
      
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Deliveries" value={mockStats.totalDeliveries.toLocaleString()} icon={Truck} description="This month" />
        <StatsCard title="Total Revenue" value={`$${mockStats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={DollarSign} description="This month" />
        <StatsCard title="Active Employees" value={mockStats.activeEmployees.toString()} icon={Users} description="Currently working" />
        <StatsCard title="Pending Tasks" value={mockStats.pendingTasks.toString()} icon={ListChecks} description="Awaiting action" />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Most Common Services</CardTitle>
            <CardDescription>Breakdown of service types used this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ServicesChart />
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Top Performing Employees</CardTitle>
            <CardDescription>Employees with the most deliveries completed.</CardDescription>
          </CardHeader>
          <CardContent>
            <TopEmployeesTable />
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Recent Deliveries</CardTitle>
            <CardDescription>Overview of the latest delivery activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentDeliveriesTable deliveries={mockRecentDeliveries} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
