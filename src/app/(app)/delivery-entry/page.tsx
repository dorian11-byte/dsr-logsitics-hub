import { DeliveryEntryForm } from '@/components/dsr/delivery/delivery-entry-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardPlus } from 'lucide-react';

export default function DeliveryEntryPage() {
  return (
    <div className="container mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-semibold text-foreground">New Delivery Record</h1>
        <ClipboardPlus className="h-8 w-8 text-primary" />
      </div>
      
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Enter Delivery Details</CardTitle>
          <CardDescription>Please fill out all fields accurately for the new delivery.</CardDescription>
        </CardHeader>
        <CardContent>
          <DeliveryEntryForm />
        </CardContent>
      </Card>
    </div>
  );
}
