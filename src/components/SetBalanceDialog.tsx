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
import { Wallet } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface SetBalanceDialogProps {
  onSetBalance: (amount: number) => void;
}

const SetBalanceDialog = ({ onSetBalance }: SetBalanceDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount)) {
      onSetBalance(numAmount);
      showSuccess(`Initial balance set to ₹${numAmount.toLocaleString('en-IN')}`);
      setOpen(false);
      setAmount("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full gap-2 border-primary/20 hover:bg-primary/5">
          <Wallet className="w-4 h-4" />
          Set Balance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Set Initial Balance</DialogTitle>
            <DialogDescription>
              Enter your current total balance to start tracking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="balance">Current Balance (₹)</Label>
              <Input 
                id="balance" 
                type="number" 
                placeholder="0" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">Confirm Balance</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SetBalanceDialog;