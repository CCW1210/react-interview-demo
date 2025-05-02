// src/components/ExpenseTracker/ExpenseTracker.tsx

import "./ExpenseTracker.scss";

import type { JSX } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import type { AppDispatch, RootState } from "../../store";
import {
  addExpense,
  Expense,
  removeExpense,
  setFilterCategory,
} from "../../store/expenseSlice";

export default function ExpenseTracker(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { list, filterCategory } = useSelector(
    (state: RootState) => state.expenses
  );

  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  function handleAdd(e: React.FormEvent): void {
    e.preventDefault();
    if (!description || amount <= 0 || !category) {
      return;
    }

    dispatch(addExpense({ description, amount, category, date }));

    setDescription("");
    setAmount(0);
    setCategory("");
    setDate(new Date().toISOString().slice(0, 10));
  }

  function handleRemove(id: string): void {
    dispatch(removeExpense(id));
  }

  const categories = Array.from(new Set(list.map((exp) => exp.category)));
  const filtered =
    filterCategory === "all"
      ? list
      : list.filter((exp) => exp.category === filterCategory);
  const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <section className="expense-tracker">
      <Link to="/" className="back-home-link">
        ← 返回首頁
      </Link>

      <h2 className="expense-tracker-title">收支管理</h2>

      <form className="expense-tracker-form" onSubmit={handleAdd}>
        <input
          type="date"
          className="expense-tracker-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          className="expense-tracker-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="描述"
        />
        <input
          type="number"
          className="expense-tracker-input"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="金額"
        />
        <input
          type="text"
          className="expense-tracker-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="類別"
        />
        <button type="submit" className="expense-tracker-button">
          新增
        </button>
      </form>

      <div className="expense-tracker-filter">
        <label
          htmlFor="expense-filter"
          className="expense-tracker-filter-label"
        >
          篩選類別：
          <select
            id="expense-filter"
            className="expense-tracker-filter-select"
            value={filterCategory}
            onChange={(e) => dispatch(setFilterCategory(e.target.value))}
          >
            <option value="all">全部</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="expense-tracker-summary">
        <span>合計：{total} 元</span>
      </div>

      <ul className="expense-tracker-list">
        {filtered.map((exp: Expense) => (
          <li key={exp.id} className="expense-tracker-item">
            <span className="expense-tracker-date">{exp.date}</span>
            <span className="expense-tracker-desc">{exp.description}</span>
            <span className="expense-tracker-amount">{exp.amount} 元</span>
            <span className="expense-tracker-category">{exp.category}</span>
            <button
              type="button"
              className="expense-tracker-remove"
              onClick={() => handleRemove(exp.id)}
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
