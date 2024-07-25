import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const initialTransactions = [
  { id: 1, date: '2024-03-01', amount: 250, type: 'expense', category: 'Nike' },
  { id: 2, date: '2024-03-05', amount: 300, type: 'income', category: 'Adidas' },
  { id: 3, date: '2024-03-10', amount: 180, type: 'expense', category: 'Puma' },
];

const SneakerAccounting = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    amount: '',
    type: '',
    category: '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const addTransaction = () => {
    if (newTransaction.date && newTransaction.amount && newTransaction.type && newTransaction.category) {
      setTransactions(prev => [...prev, { ...newTransaction, id: Date.now(), amount: parseFloat(newTransaction.amount) }]);
      setNewTransaction({ date: '', amount: '', type: '', category: '' });
      toast.success("Transaction added successfully!");
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  const startEditing = (transaction) => {
    setEditingId(transaction.id);
    setNewTransaction(transaction);
  };

  const saveEdit = () => {
    setTransactions(prev => prev.map(t => t.id === editingId ? { ...newTransaction, amount: parseFloat(newTransaction.amount) } : t));
    setEditingId(null);
    setNewTransaction({ date: '', amount: '', type: '', category: '' });
    toast.success("Transaction updated successfully!");
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast.success("Transaction deleted successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sneaker Side-Hustle Accounting</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" name="date" value={newTransaction.date} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input type="number" id="amount" name="amount" value={newTransaction.amount} onChange={handleInputChange} placeholder="Amount" />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select name="type" value={newTransaction.type} onValueChange={(value) => handleSelectChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Brand</Label>
          <Select name="category" value={newTransaction.category} onValueChange={(value) => handleSelectChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nike">Nike</SelectItem>
              <SelectItem value="Adidas">Adidas</SelectItem>
              <SelectItem value="Puma">Puma</SelectItem>
              <SelectItem value="Reebok">Reebok</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button onClick={editingId !== null ? saveEdit : addTransaction}>
        {editingId !== null ? 'Save Edit' : 'Add Transaction'}
      </Button>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => startEditing(transaction)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SneakerAccounting;
