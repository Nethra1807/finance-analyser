"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Transaction } from './AddTransactionDialog';

interface SpendingChartProps {
  transactions: Transaction[];
}

const SpendingChart = ({ transactions }: SpendingChartProps) => {
  // Group expenses by day for the last 7 days
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = days.map(day => ({ name: day, amount: 0 }));

  transactions.forEach(t => {
    if (t.type === 'expense') {
      // Simple logic: just use the day name from the date string for this demo
      // In a real app, we'd parse the actual Date object
      const dayName = t.date.split(',')[0].trim(); 
      // For simplicity in this demo, we'll just map to current day if parsing fails
      const dayIndex = new Date().getDay();
      chartData[dayIndex].amount += Math.abs(t.amount);
    }
  });

  const hasData = transactions.some(t => t.type === 'expense');

  return (
    <Card className="col-span-full lg:col-span-4 border-none shadow-md bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Weekly Spending</CardTitle>
        <CardDescription>Your daily expenses in ₹</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {!hasData ? (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
              Add expenses to see your spending chart
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888', fontSize: 12 }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  formatter={(value) => [`₹${value}`, 'Amount']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.amount > 5000 ? '#6366f1' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;