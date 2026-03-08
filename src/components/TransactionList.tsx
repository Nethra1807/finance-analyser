"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Coffee, Home, Car, ArrowUpRight, Smartphone, Utensils } from 'lucide-react';
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: 1,
    name: "Zomato Order",
    category: "Food & Drink",
    amount: -450.00,
    date: "Today, 1:15 PM",
    icon: <Utensils className="w-4 h-4" />,
    color: "bg-red-100 text-red-600"
  },
  {
    id: 2,
    name: "Salary Credit",
    category: "Income",
    amount: 85000.00,
    date: "Yesterday",
    icon: <ArrowUpRight className="w-4 h-4" />,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 3,
    name: "Jio Recharge",
    category: "Bills",
    amount: -749.00,
    date: "Oct 24, 2023",
    icon: <Smartphone className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 4,
    name: "Apartment Rent",
    category: "Housing",
    amount: -22000.00,
    date: "Oct 20, 2023",
    icon: <Home className="w-4 h-4" />,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 5,
    name: "Uber Auto",
    category: "Transport",
    amount: -120.00,
    date: "Oct 18, 2023",
    icon: <Car className="w-4 h-4" />,
    color: "bg-slate-100 text-slate-600"
  }
];

const TransactionList = () => {
  return (
    <Card className="col-span-full lg:col-span-3 border-none shadow-md bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("p-2 rounded-full", transaction.color)}>
                  {transaction.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{transaction.date}</p>
                </div>
              </div>
              <div className={cn(
                "text-sm font-bold",
                transaction.amount > 0 ? "text-emerald-600" : "text-slate-900"
              )}>
                {transaction.amount > 0 ? "+" : ""}{transaction.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;