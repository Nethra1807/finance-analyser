"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Coffee, Home, Car, ArrowUpRight, Smartphone, Utensils, CreditCard, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Transaction } from './AddTransactionDialog';

interface TransactionListProps {
  transactions: Transaction[];
}

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food': return <Utensils className="w-4 h-4" />;
    case 'transport': return <Car className="w-4 h-4" />;
    case 'housing': return <Home className="w-4 h-4" />;
    case 'bills': return <Smartphone className="w-4 h-4" />;
    case 'shopping': return <ShoppingBag className="w-4 h-4" />;
    case 'income': return <ArrowUpRight className="w-4 h-4" />;
    default: return <CreditCard className="w-4 h-4" />;
  }
};

const getColor = (type: string) => {
  return type === 'income' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600";
};

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <Card className="col-span-full lg:col-span-3 border-none shadow-md bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-3 bg-slate-100 rounded-full mb-4">
              <Plus className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-500">No transactions yet</p>
            <p className="text-xs text-slate-400 mt-1">Add your first spending or income</p>
          </div>
        ) : (
          <div className="space-y-6">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-full", getColor(transaction.type))}>
                    {getIcon(transaction.category)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none">{transaction.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{transaction.date}</p>
                  </div>
                </div>
                <div className={cn(
                  "text-sm font-bold",
                  transaction.type === 'income' ? "text-emerald-600" : "text-slate-900"
                )}>
                  {transaction.type === 'income' ? "+" : ""}{transaction.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;