"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { suggestDeliveryService, SuggestDeliveryServiceOutput } from "@/ai/flows/suggest-delivery-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const suggestorFormSchema = z.object({
  origin: z.string().min(3, { message: "Origin must be at least 3 characters." }),
  destination: z.string().min(3, { message: "Destination must be at least 3 characters." }),
});

type SuggestorFormValues = z.infer<typeof suggestorFormSchema>;

export function AIServiceSuggestorForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestDeliveryServiceOutput | null>(null);

  const form = useForm<SuggestorFormValues>({
    resolver: zodResolver(suggestorFormSchema),
    defaultValues: {
      origin: "",
      destination: "",
    },
  });

  async function onSubmit(values: SuggestorFormValues) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestDeliveryService({
        origin: values.origin,
        destination: values.destination,
      });
      setSuggestion(result);
      toast({
        title: "Suggestion Ready!",
        description: "AI has provided a service suggestion.",
      });
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      toast({
        variant: "destructive",
        title: "Error Getting Suggestion",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origin (City, State/Country)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., New York, USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination (City, State/Country)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., London, UK" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Suggestion...
              </>
            ) : (
              <>
                <SendHorizonal className="mr-2 h-4 w-4" /> Get Suggestion
              </>
            )}
          </Button>
        </form>
      </Form>

      {suggestion && (
        <Card className="mt-8 bg-accent/30 border-accent shadow-md animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline text-lg text-primary">AI Suggestion</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-foreground">Suggested Service Type:</h4>
              <p className="text-lg font-medium text-accent-foreground bg-primary/10 p-2 rounded-md">
                {suggestion.serviceType}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Reason:</h4>
              <p className="text-muted-foreground whitespace-pre-wrap">{suggestion.reason}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
