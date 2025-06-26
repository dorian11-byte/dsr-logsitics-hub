import { AIServiceSuggestorForm } from '@/components/dsr/ai/ai-service-suggestor-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export default function AIServiceSuggestorPage() {
  return (
    <div className="container mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-semibold text-foreground">AI Service Suggestor</h1>
        <BrainCircuit className="h-8 w-8 text-primary" />
      </div>
      
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Get Delivery Service Suggestion</CardTitle>
          <CardDescription>
            Enter the origin and destination details, and our AI will suggest the most appropriate delivery service type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AIServiceSuggestorForm />
        </CardContent>
      </Card>
    </div>
  );
}
