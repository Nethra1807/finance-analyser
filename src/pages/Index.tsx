"use client";

import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, LogOut } from 'lucide-react';
import StatCard from '@/components/StatCard';
import SpendingChart from '@/components/SpendingChart';
import TransactionList from '@/components/TransactionList';
import AddTransactionDialog, { Transaction } from '@/components/AddTransactionDialog';
import SetBalanceDialog from '@/components/SetBalanceDialog';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

const Index = () => {
  const { token, user, logout } = useAuth();
  const [initialBalance, setInitialBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        // Fetch user for initial balance
        const userRes = await fetch('http://localhost:7777/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setInitialBalance(userData.initial_balance || 0);
        }

        // Fetch transactions
        const transRes = await fetch('http://localhost:7777/api/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (transRes.ok) {
          const transData = await transRes.json();
          setTransactions(transData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load your financial data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleAddTransaction = async (newTransaction: Transaction) => {
    try {
      const res = await fetch('http://localhost:7777/api/transactions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTransaction)
      });
      
      if (res.ok) {
        const savedTransaction = await res.json();
        setTransactions([savedTransaction, ...transactions]);
        toast.success("Transaction added!");
      } else {
        toast.error("Failed to save transaction.");
      }
    } catch (err) {
      toast.error("Server error while adding transaction.");
    }
  };

  const handleSetBalance = async (amount: number) => {
    try {
      const res = await fetch('http://localhost:7777/api/user/balance', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ balance: amount })
      });
      
      if (res.ok) {
        setInitialBalance(amount);
        toast.success("Initial balance updated!");
      } else {
        toast.error("Failed to update balance.");
      }
    } catch (err) {
      toast.error("Server error while updating balance.");
    }
  };

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const currentBalance = initialBalance + transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -Math.abs(t.amount)), 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading your finance dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Finance Analyzer</h1>
              <p className="text-slate-500 mt-1">Namaste, {user?.name}! Track your wealth in INR.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SetBalanceDialog onSetBalance={handleSetBalance} />
            <AddTransactionDialog onAddTransaction={handleAddTransaction} />
            <Button variant="outline" size="icon" onClick={logout} title="Logout">
              <LogOut className="w-4 h-4" />
            </Button>
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