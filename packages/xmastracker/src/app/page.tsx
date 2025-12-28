'use client';

import { useState } from 'react';

type Category = 'Gifts' | 'Food' | 'Clothes' | 'Transport' | 'Entertainment' | 'Others';

interface Expense {
  id: string;
  amount: number;
  category: Category;
  timestamp: number;
}

const categories: Category[] = ['Gifts', 'Food', 'Clothes', 'Transport', 'Entertainment', 'Others'];

export default function BudgetTracker() {
  const [budget, setBudget] = useState<number>(0);
  const [budgetSet, setBudgetSet] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Gifts');

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = budget - totalSpent;
  const percentSpent = budget > 0 ? (totalSpent / budget) * 100 : 0;
  const isWarning = percentSpent >= 80;

  const handleSetBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).budget.value;
    const budgetAmount = parseFloat(input);
    if (budgetAmount > 0) {
      setBudget(budgetAmount);
      setBudgetSet(true);
    }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const expenseAmount = parseFloat(amount);
    if (expenseAmount > 0) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        amount: expenseAmount,
        category: selectedCategory,
        timestamp: Date.now(),
      };
      setExpenses([newExpense, ...expenses]);
      setAmount('');
    }
  };

  const Snowflake = ({ delay }: { delay: number }) => (
    <div 
      className="snowflake"
      style={{ 
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        fontSize: `${Math.random() * 10 + 10}px`
      }}
    >
      ❄
    </div>
  );

  if (!budgetSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-red-900 text-white p-4 relative overflow-hidden">
        {[...Array(15)].map((_, i) => <Snowflake key={i} delay={i * 0.5} />)}
        
        <div className="max-w-md mx-auto mt-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            🎄 Avoid Broke January 🎄
          </h1>
          <p className="text-center text-xl mb-8 text-red-200">
            Set your Christmas budget before it&apos;s too late!
          </p>
          
          <form onSubmit={handleSetBudget} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20">
            <label className="block text-lg mb-2 font-semibold">Total Christmas Budget</label>
            <input
              type="number"
              name="budget"
              step="0.01"
              placeholder="Enter amount (£)"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/60 text-xl font-bold focus:outline-none focus:border-green-400"
              required
            />
            <button
              type="submit"
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-xl transition-colors"
            >
              Lock It In! 🔒
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-red-900 text-white p-4 relative overflow-hidden">
      {[...Array(15)].map((_, i) => <Snowflake key={i} delay={i * 0.5} />)}
      
      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          🎄 Avoid Broke January 🎄
        </h1>

        {/* Budget Overview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border-2 border-white/20">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-white/80">Total Budget</p>
              <p className="text-2xl font-bold">£{budget.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-white/80">Total Spent</p>
              <p className="text-2xl font-bold text-red-300">£{totalSpent.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="mb-2">
            <p className="text-sm text-white/80 mb-1">Remaining</p>
            <p className={`text-3xl font-bold ${remaining < 0 ? 'text-red-400' : 'text-green-300'}`}>
              £{remaining.toFixed(2)}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-6 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  percentSpent >= 100 ? 'bg-red-600' : percentSpent >= 80 ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(percentSpent, 100)}%` }}
              />
            </div>
            <p className="text-center mt-2 text-sm">{percentSpent.toFixed(0)}% spent</p>
          </div>

          {isWarning && remaining > 0 && (
            <div className="mt-4 bg-red-600/80 border-2 border-red-400 rounded-lg p-3 animate-pulse">
              <p className="text-center font-bold text-lg">
                ⚠️ Slow down! January is coming! ⚠️
              </p>
            </div>
          )}

          {remaining < 0 && (
            <div className="mt-4 bg-red-700/90 border-2 border-red-400 rounded-lg p-3">
              <p className="text-center font-bold text-lg">
                🚨 OVER BUDGET! January will be rough! 🚨
              </p>
            </div>
          )}
        </div>

        {/* Add Expense Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border-2 border-white/20">
          <h2 className="text-xl font-bold mb-4">Log Expense</h2>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Amount (£)</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-green-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-green-900">{cat}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Add Expense
            </button>
          </form>
        </div>

        {/* Expenses List */}
        {expenses.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20">
            <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {expenses.map(expense => (
                <div key={expense.id} className="bg-white/10 rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{expense.category}</p>
                    <p className="text-xs text-white/70">
                      {new Date(expense.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-red-300">£{expense.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

