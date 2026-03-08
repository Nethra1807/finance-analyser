"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', amount: 1200 },
  { name: 'Tue', amount: 850 },
  { name: 'Wed', amount: 2400 },
  { name: 'Thu', amount: 600 },
  { name: 'Fri', amount: 4500 },
  { name: 'Sat', amount: 3200 },
  { name: 'Sun', amount: 1500 },
];

const SpendingChart = () => {
  return (
    <Card className="col-span-full lg:col-span-4 border-none shadow-md bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Weekly Spending</CardTitle>
        <CardDescription>Your daily expenses in ₹ for the current week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.amount > 3000 ? '#6366f1' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;