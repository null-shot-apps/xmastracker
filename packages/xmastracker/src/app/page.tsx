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
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-red-900 text-white p-6 md:p-8 relative overflow-hidden flex items-center justify-center">
        {[...Array(15)].map((_, i) => <Snowflake key={i} delay={i * 0.5} />)}
        
        <div className="w-full max-w-xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 drop-shadow-lg">
            🎄 Avoid Broke January 🎄
          </h1>
          <p className="text-center text-xl md:text-2xl mb-12 text-red-200 font-medium">
            Set your Christmas budget before it&apos;s too late!
          </p>
          
          <form onSubmit={handleSetBudget} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border-2 border-white/20 shadow-2xl">
            <label className="block text-xl md:text-2xl mb-4 font-semibold">Total Christmas Budget</label>
            <input
              type="number"
              name="budget"
              step="0.01"
              placeholder="Enter amount (£)"
              className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 text-2xl md:text-3xl font-bold focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all"
              required
            />
            <button
              type="submit"
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-xl md:text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Lock It In! 🔒
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-red-900 text-white p-6 md:p-8 lg:p-12 relative overflow-hidden">
      {[...Array(15)].map((_, i) => <Snowflake key={i} delay={i * 0.5} />)}
      
      <div className="max-w-4xl mx-auto relative z-10 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 drop-shadow-lg">
          🎄 Avoid Broke January 🎄
        </h1>

        {/* Budget Overview */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 mb-8 border-2 border-white/20 shadow-2xl">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center md:text-left">
              <p className="text-base md:text-lg text-white/80 mb-2">Total Budget</p>
              <p className="text-3xl md:text-4xl font-bold">£{budget.toFixed(2)}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-base md:text-lg text-white/80 mb-2">Total Spent</p>
              <p className="text-3xl md:text-4xl font-bold text-red-300">£{totalSpent.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="mb-6 text-center">
            <p className="text-lg md:text-xl text-white/80 mb-2">Remaining</p>
            <p className={`text-5xl md:text-6xl font-bold ${remaining < 0 ? 'text-red-400' : 'text-green-300'}`}>
              £{remaining.toFixed(2)}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-white/20 rounded-full h-8 overflow-hidden shadow-inner">
              <div 
                className={`h-full transition-all duration-500 ${
                  percentSpent >= 100 ? 'bg-red-600' : percentSpent >= 80 ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(percentSpent, 100)}%` }}
              />
            </div>
            <p className="text-center mt-3 text-lg font-semibold">{percentSpent.toFixed(0)}% spent</p>
          </div>

          {isWarning && remaining > 0 && (
            <div className="mt-6 bg-red-600/80 border-2 border-red-400 rounded-xl p-5 animate-pulse shadow-lg">
              <p className="text-center font-bold text-xl md:text-2xl">
                ⚠️ Slow down! January is coming! ⚠️
              </p>
            </div>
          )}

          {remaining < 0 && (
            <div className="mt-6 bg-red-700/90 border-2 border-red-400 rounded-xl p-5 shadow-lg">
              <p className="text-center font-bold text-xl md:text-2xl">
                🚨 OVER BUDGET! January will be rough! 🚨
              </p>
            </div>
          )}
        </div>

        {/* Add Expense Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 mb-8 border-2 border-white/20 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Log Expense</h2>
          <form onSubmit={handleAddExpense} className="space-y-6">
            <div>
              <label className="block text-lg md:text-xl mb-3 font-semibold">Amount (£)</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 text-xl md:text-2xl font-bold focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-lg md:text-xl mb-3 font-semibold">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
                className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white text-lg md:text-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-green-900">{cat}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-xl md:text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Add Expense
            </button>
          </form>
        </div>

        {/* Expenses List */}
        {expenses.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border-2 border-white/20 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Recent Expenses</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {expenses.map(expense => (
                <div key={expense.id} className="bg-white/10 rounded-xl p-5 flex justify-between items-center hover:bg-white/20 transition-colors">
                  <div>
                    <p className="font-semibold text-lg md:text-xl">{expense.category}</p>
                    <p className="text-sm md:text-base text-white/70">
                      {new Date(expense.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-red-300">£{expense.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



