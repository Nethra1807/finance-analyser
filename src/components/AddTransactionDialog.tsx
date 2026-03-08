"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

interface AddTransactionDialogProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const AddTransactionDialog = ({ onAddTransaction }: AddTransactionDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    amount: "",
    category: "food",
    type: "expense" as "income" | "expense"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      category: formData.category,
      amount: formData.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      date: new Date().toLocaleString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: formData.type
    };

    onAddTransaction(newTransaction);
    showSuccess("Transaction added successfully!");
    setOpen(false);
    setFormData({ name: "", amount: "", category: "food", type: "expense" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg hover:shadow-xl transition-all gap-2">
          <PlusCircle className="w-4 h-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Enter the details of your new transaction in INR.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: "income" | "expense") => setFormData({...formData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense (Debit)</SelectItem>
                  <SelectItem value="income">Income (Credit)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Swiggy, Rent, Salary" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="0" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food & Drink</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="bills">Bills & Utilities</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">Save Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;