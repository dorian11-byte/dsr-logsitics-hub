'use client';

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { firestore, isFirebaseConfigured } from '@/lib/firebase';
import { DeliveryRecordsTable } from '@/components/dsr/pod/delivery-records-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export interface DeliveryRecord {
  id: string;
  serviceType: string;
  hours: number;
  client: string;
  date: { toDate: () => Date }; // Firestore timestamp
  executive: string;
  omNumber: string;
  overtime: boolean;
  overtimeHours?: number;
  price: number;
  status: string;
  fileUrls?: string[];
  createdAt: any;
}

export default function PodViewPage() {
  const [deliveries, setDeliveries] = useState<DeliveryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) {
      setLoading(false);
      return;
    }

    const q = query(collection(firestore, 'deliveries'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const deliveriesData: DeliveryRecord[] = [];
      querySnapshot.forEach((doc) => {
        deliveriesData.push({ id: doc.id, ...doc.data() } as DeliveryRecord);
      });
      setDeliveries(deliveriesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching deliveries: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex items-center gap-2">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-headline font-semibold text-foreground">Delivery Records</h1>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">All Delivery Entries</CardTitle>
          <CardDescription>A real-time list of all saved delivery records.</CardDescription>
        </CardHeader>
        <CardContent>
          {!isFirebaseConfigured ? (
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Firebase Not Configured</AlertTitle>
                <AlertDescription>
                    Please configure your Firebase credentials in .env to view delivery records.
                </AlertDescription>
            </Alert>
          ) : loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4 text-muted-foreground">Loading records...</p>
            </div>
          ) : deliveries.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold text-foreground">No Records Found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No delivery records have been saved yet. Go to Delivery Entry to add one.
              </p>
            </div>
          ) : (
            <DeliveryRecordsTable deliveries={deliveries} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
