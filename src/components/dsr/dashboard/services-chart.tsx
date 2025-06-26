'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";


const chartData = [
  { service: 'Standard', deliveries: 186, fill: "var(--color-standard)" },
  { service: 'Express', deliveries: 305, fill: "var(--color-express)" },
  { service: 'Overnight', deliveries: 237, fill: "var(--color-overnight)" },
  { service: 'Same-Day', deliveries: 73, fill: "var(--color-sameday)" },
  { service: 'International', deliveries: 209, fill: "var(--color-international)" },
];

const chartConfig = {
  deliveries: {
    label: "Deliveries",
  },
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-1))",
  },
  express: {
    label: "Express",
    color: "hsl(var(--chart-2))",
  },
  overnight: {
    label: "Overnight",
    color: "hsl(var(--chart-3))",
  },
  sameday: {
    label: "Same-Day",
    color: "hsl(var(--chart-4))",
  },
  international: {
    label: "International",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ServicesChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="service" 
            tickLine={false} 
            axisLine={false} 
            tickMargin={8}
            fontSize={12}
            stroke="hsl(var(--foreground))"
          />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            tickMargin={8}
            fontSize={12}
            stroke="hsl(var(--foreground))"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="deliveries" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
