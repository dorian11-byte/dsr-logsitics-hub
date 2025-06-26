"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AlertTriangle, CalendarIcon, Loader2, Save } from "lucide-react";
import { format } from "date-fns";
import { isFirebaseConfigured, firestore, storage } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_FILES = 5;
const deliveryEntrySchema = z.object({
  serviceType: z.string().min(1, "Service type is required."),
  hours: z.coerce.number().min(0, "Hours must be positive."),
  client: z.string().min(1, "Client name is required."),
  date: z.date({ required_error: "Delivery date is required." }),
  executive: z.string().min(1, "Executive name is required."),
  omNumber: z.string().min(1, "OM# is required."),
  overtime: z.boolean().default(false),
  overtimeHours: z.coerce.number().min(0).default(0),
  price: z.coerce.number().min(0, "Price must be positive."),
  status: z.string().min(1, "Status is required."),
  podFiles: z.custom<FileList>()
    .refine((files) => !files || files.length <= MAX_FILES, `Maximum ${MAX_FILES} files are allowed.`)
    .optional(),
}).refine(data => !data.overtime || data.overtimeHours > 0, {
  message: "If overtime is checked, overtime hours must be greater than 0.",
  path: ["overtimeHours"],
});


type DeliveryEntryFormValues = z.infer<typeof deliveryEntrySchema>;

const serviceTypes = [
  "FLETE",
  "RENTA",
  "ESTADiA",
  "FLETE EN FALSO"
];
const executives = [
  "CARLOS",
  "EVELYN",
  "GALILEA",
  "KARINA",
  "ROMAN"
];
const statuses = [
  "PENDIENTE DE EVIDENCIA",
  "EVIDENCIA CARGADA",
  "FACTURADO",
  "FACTURA CARGADA"
];

export function DeliveryEntryForm() {
  const { toast } = useToast();
  const form = useForm<DeliveryEntryFormValues>({
    resolver: zodResolver(deliveryEntrySchema),
    defaultValues: {
      serviceType: "",
      hours: 0,
      client: "",
      executive: "",
      omNumber: "",
      overtime: false,
      overtimeHours: 0,
      price: 0,
      status: "Pending",
    },
  });

  async function onSubmit(values: DeliveryEntryFormValues) {
    if (!firestore || !storage) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Firestore or Storage is not configured. Please check environment variables.",
      });
      return;
    }

    try {
      const fileUrls: string[] = [];
      if (values.podFiles && values.podFiles.length > 0) {
        for (const file of Array.from(values.podFiles)) {
          const storageRef = ref(storage, `deliveries/${values.omNumber}/${Date.now()}-${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          fileUrls.push(downloadURL);
        }
      }

      const deliveryData: { [key: string]: any } = {
        serviceType: values.serviceType,
        hours: values.hours,
        client: values.client,
        date: Timestamp.fromDate(values.date),
        executive: values.executive,
        omNumber: values.omNumber,
        overtime: values.overtime,
        price: values.price,
        status: values.status,
        fileUrls: fileUrls,
        createdAt: serverTimestamp(),
      };

      if (values.overtime) {
        deliveryData.overtimeHours = values.overtimeHours;
      }
      
      await addDoc(collection(firestore, "deliveries"), deliveryData);
      
      toast({
        title: "Delivery Record Saved",
        description: `OM# ${values.omNumber} for ${values.client} has been successfully saved.`,
      });
      form.reset();
    } catch (error: any) {
      console.error("Error adding document: ", error);
      
      let description = "An unexpected error occurred while saving.";
      if (error.code === 'permission-denied') {
          description = "Save failed due to security rules. Please ensure you are logged in and your Firestore security rules are correctly configured to allow writes.";
      } else if (error.code) {
          description = `Save failed. Error code: ${error.code}. Please check your form data and Firebase project configuration.`;
      } else if (error.message) {
          description = `Save failed: ${error.message}`;
      }

      toast({
          variant: "destructive",
          title: "Save Failed",
          description: description,
      });
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
              Firebase is not configured. Please add your Firebase credentials to the .env file to enable saving delivery records.
          </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {serviceTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Delivery Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="executive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Executive</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an executive" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {executives.map(exe => (
                      <SelectItem key={exe} value={exe}>{exe}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="omNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OM# (Order Manifest Number)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter OM number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 150.75" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="podFiles"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>POD Files (Max 5)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      multiple 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload proof of delivery (PDF, JPG, or PNG).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
           <div className="space-y-2">
            <FormField
              control={form.control}
              name="overtime"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Overtime Applicable</FormLabel>
                    <FormDescription>
                      Check if overtime hours were involved.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {form.watch("overtime") && (
              <FormField
                control={form.control}
                name="overtimeHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overtime Hours</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 1.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={form.formState.isSubmitting}
          >
             {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Delivery Record
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
