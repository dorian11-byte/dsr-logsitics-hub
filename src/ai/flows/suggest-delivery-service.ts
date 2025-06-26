'use server';

/**
 * @fileOverview Suggests the appropriate type of delivery service based on the origin and destination.
 *
 * @param {SuggestDeliveryServiceInput} input - The input for suggesting a delivery service.
 * @returns {Promise<SuggestDeliveryServiceOutput>} - A promise that resolves with the suggested delivery service.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDeliveryServiceInputSchema = z.object({
  origin: z.string().describe('The origin of the delivery.'),
  destination: z.string().describe('The destination of the delivery.'),
});

export type SuggestDeliveryServiceInput = z.infer<
  typeof SuggestDeliveryServiceInputSchema
>;

const SuggestDeliveryServiceOutputSchema = z.object({
  serviceType: z
    .string()
    .describe('The suggested type of delivery service.'),
  reason: z
    .string()
    .describe('The reason for suggesting this delivery service.'),
});

export type SuggestDeliveryServiceOutput = z.infer<
  typeof SuggestDeliveryServiceOutputSchema
>;

export async function suggestDeliveryService(
  input: SuggestDeliveryServiceInput
): Promise<SuggestDeliveryServiceOutput> {
  return suggestDeliveryServiceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDeliveryServicePrompt',
  input: {schema: SuggestDeliveryServiceInputSchema},
  output: {schema: SuggestDeliveryServiceOutputSchema},
  prompt: `You are an expert in delivery services.

  Based on the origin and destination, suggest the most appropriate type of delivery service.

  Origin: {{{origin}}}
  Destination: {{{destination}}}
  \n  Respond with the suggested service type and a brief explanation of why it is appropriate for this delivery.
  `,
});

const suggestDeliveryServiceFlow = ai.defineFlow(
  {
    name: 'suggestDeliveryServiceFlow',
    inputSchema: SuggestDeliveryServiceInputSchema,
    outputSchema: SuggestDeliveryServiceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
