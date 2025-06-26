'use client';

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
import { Download } from 'lucide-react';
import type { DeliveryRecord } from '@/app/(app)/pod-view/page';

interface DeliveryRecordsTableProps {
  deliveries: DeliveryRecord[];
}

const statusColors: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800/30 dark:text-green-300 dark:border-green-700',
  'In Transit': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800/30 dark:text-blue-300 dark:border-blue-700',
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800/30 dark:text-yellow-300 dark:border-yellow-700',
  Cancelled: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-800/30 dark:text-red-300 dark:border-red-700',
};

export function DeliveryRecordsTable({ deliveries }: DeliveryRecordsTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>OM#</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Executive</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Extra Hours</TableHead>
            <TableHead>POD Files</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell className="font-medium text-primary">{delivery.omNumber}</TableCell>
              <TableCell className="text-muted-foreground">{delivery.serviceType}</TableCell>
              <TableCell className="text-muted-foreground">{delivery.hours}</TableCell>
              <TableCell className="text-foreground">{delivery.client}</TableCell>
              <TableCell className="text-muted-foreground">
                {delivery.date ? delivery.date.toDate().toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell className="text-muted-foreground">{delivery.executive}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className={`${statusColors[delivery.status] ?? 'bg-gray-100 text-gray-800'} text-xs`}>
                  {delivery.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center text-muted-foreground">${delivery.price.toFixed(2)}</TableCell>
              <TableCell className="text-center text-muted-foreground">
                {delivery.overtime ? (
                  <span className="text-xs">{delivery.overtimeHours ?? 0} hrs</span>
                ) : (
                  <span className="text-xs text-muted-foreground">N/A</span>
                )}
              </TableCell>
              <TableCell>
                {delivery.fileUrls && delivery.fileUrls.length > 0 ? (
                  <div className="flex flex-col items-start gap-1">
                    {delivery.fileUrls.map((url, index) => (
                      <Button key={index} variant="link" asChild className="h-auto p-0 justify-start">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs inline-flex items-center">
                          <Download className="mr-1.5 h-3 w-3" />
                          File {index + 1}
                        </a>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">No files</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DeliveryRecordsTable;
