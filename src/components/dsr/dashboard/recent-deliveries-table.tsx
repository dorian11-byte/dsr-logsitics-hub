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
import { Eye } from 'lucide-react';
import Link from 'next/link';

interface Delivery {
  id: string;
  client: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Pending' | 'Cancelled';
  amount: number;
}

interface RecentDeliveriesTableProps {
  deliveries: Delivery[];
}

const statusColors: Record<Delivery['status'], string> = {
  Delivered: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800/30 dark:text-green-300 dark:border-green-700',
  'In Transit': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800/30 dark:text-blue-300 dark:border-blue-700',
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800/30 dark:text-yellow-300 dark:border-yellow-700',
  Cancelled: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-800/30 dark:text-red-300 dark:border-red-700',
};

export function RecentDeliveriesTable({ deliveries }: RecentDeliveriesTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OM#</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell className="font-medium text-primary">{delivery.id}</TableCell>
              <TableCell className="text-foreground">{delivery.client}</TableCell>
              <TableCell className="text-muted-foreground">{new Date(delivery.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className={`${statusColors[delivery.status]} text-xs`}>
                  {delivery.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                ${delivery.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/pod-view/${delivery.id}`}>
                    <Eye className="h-4 w-4 text-primary" />
                    <span className="sr-only">View Details</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
