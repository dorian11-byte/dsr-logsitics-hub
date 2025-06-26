import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, FileArchive, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

interface Pod {
  id: string;
  omNumber: string;
  client: string;
  date: string;
  amount: number;
  fileUrl: string;
  status: 'Verified' | 'Pending Review' | 'Missing';
}

interface PodItemProps {
  pod: Pod;
}

const statusConfig = {
  'Verified': { icon: CheckCircle, color: 'bg-green-500 hover:bg-green-600', textColor: 'text-green-700 dark:text-green-400', borderColor: 'border-green-500/50' },
  'Pending Review': { icon: Clock, color: 'bg-yellow-500 hover:bg-yellow-600', textColor: 'text-yellow-700 dark:text-yellow-400', borderColor: 'border-yellow-500/50' },
  'Missing': { icon: AlertTriangle, color: 'bg-red-500 hover:bg-red-600', textColor: 'text-red-700 dark:text-red-400', borderColor: 'border-red-500/50' },
};


export function PodItem({ pod }: PodItemProps) {
  const currentStatus = statusConfig[pod.status];
  const StatusIcon = currentStatus.icon;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-headline text-lg text-primary">{pod.omNumber}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">POD ID: {pod.id}</CardDescription>
          </div>
          <Checkbox aria-label={`Select POD ${pod.id}`} className="mt-1" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="relative mb-3 aspect-[8/11] w-full overflow-hidden rounded-md border border-muted bg-muted/50">
          <Image 
            src={pod.fileUrl} 
            alt={`POD for ${pod.omNumber}`} 
            layout="fill" 
            objectFit="contain" 
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="document scan"
          />
           <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <Button variant="outline" size="sm" asChild className="bg-background/80 hover:bg-background text-foreground">
                <Link href={pod.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" /> View Full
                </Link>
             </Button>
           </div>
        </div>
        
        <div className="space-y-1 text-sm">
          <p><strong className="text-foreground">Client:</strong> <span className="text-muted-foreground">{pod.client}</span></p>
          <p><strong className="text-foreground">Date:</strong> <span className="text-muted-foreground">{new Date(pod.date).toLocaleDateString()}</span></p>
          <p><strong className="text-foreground">Amount:</strong> <span className="text-muted-foreground">${pod.amount.toFixed(2)}</span></p>
        </div>
        <Badge variant="outline" className={`mt-3 w-full justify-center ${currentStatus.textColor} ${currentStatus.borderColor}`}>
          <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
          {pod.status}
        </Badge>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0 border-t mt-auto">
        <Button variant="outline" size="sm" asChild>
            <Link href={pod.fileUrl} download={`POD_${pod.omNumber}.png`}>
                <Download className="mr-2 h-4 w-4" /> Download
            </Link>
        </Button>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <FileArchive className="mr-2 h-4 w-4" /> Assemble
        </Button>
      </CardFooter>
    </Card>
  );
}

export type { Pod };