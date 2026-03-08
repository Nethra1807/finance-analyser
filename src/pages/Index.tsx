"use client";

import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Bell } from 'lucide-react';
import StatCard from '@/components/StatCard';
import SpendingChart from '@/components/SpendingChart';
import TransactionList from '@/components/TransactionList';
import AddTransactionDialog, { Transaction } from '@/components/AddTransactionDialog';
import SetBalanceDialog from '@/components/SetBalanceDialog';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';

const Index = () => {
  const [initialBalance, setInitialBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('finance_balance');
    const savedTransactions = localStorage.getItem('finance_transactions');
    
    if (savedBalance) setInitialBalance(parseFloat(savedBalance));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('finance_balance', initialBalance.toString());
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [initialBalance, transactions]);

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleSetBalance = (amount: number) => {
    setInitialBalance(amount);
  };

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const currentBalance = initialBalance + transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Finance Analyzer</h1>
            <p className="text-slate-500 mt-1">Namaste! Track your wealth in INR.</p>
          </div>
          <div className="flex items-center gap-3">
            <SetBalanceDialog onSetBalance={handleSetBalance} />
            <AddTransactionDialog onAddTransaction={handleAddTransaction} />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Current Balance" 
            value={`₹${currentBalance.toLocaleString('en-IN')}`} 
            description="Available funds"
            icon={<Wallet className="w-4 h-4" />}
          />
          <StatCard 
            title="Total Income" 
            value={`₹${totalIncome.toLocaleString('en-IN')}`} 
            description="All time earnings"
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <StatCard 
            title="Total Expenses" 
            value={`₹${totalExpenses.toLocaleString('en-IN')}`} 
            description="All time spending"
            icon={<TrendingDown className="w-4 h-4" />}
          />
          <StatCard 
            title="Initial Balance" 
            value={`₹${initialBalance.toLocaleString('en-IN')}`} 
            description="Starting point"
            icon={<PiggyBank className="w-4 h-4" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <SpendingChart transactions={transactions} />
          <TransactionList transactions={transactions} />
        </div>

        <footer className="pt-8 border-t border-slate-200">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;