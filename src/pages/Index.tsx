"use client";

import React from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Bell } from 'lucide-react';
import StatCard from '@/components/StatCard';
import SpendingChart from '@/components/SpendingChart';
import TransactionList from '@/components/TransactionList';
import AddTransactionDialog from '@/components/AddTransactionDialog';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Finance Analyzer</h1>
            <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your money.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full bg-white border-none shadow-sm">
              <Bell className="w-4 h-4" />
            </Button>
            <AddTransactionDialog />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Balance" 
            value="$12,450.80" 
            description="from last month"
            icon={<Wallet className="w-4 h-4" />}
            trend={{ value: "12%", isPositive: true }}
          />
          <StatCard 
            title="Monthly Income" 
            value="$5,200.00" 
            description="this month"
            icon={<TrendingUp className="w-4 h-4" />}
            trend={{ value: "8%", isPositive: true }}
          />
          <StatCard 
            title="Monthly Expenses" 
            value="$2,840.50" 
            description="this month"
            icon={<TrendingDown className="w-4 h-4" />}
            trend={{ value: "4%", isPositive: false }}
          />
          <StatCard 
            title="Total Savings" 
            value="$4,410.30" 
            description="target: $5,000"
            icon={<PiggyBank className="w-4 h-4" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <SpendingChart />
          <TransactionList />
        </div>

        <footer className="pt-8 border-t border-slate-200">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;