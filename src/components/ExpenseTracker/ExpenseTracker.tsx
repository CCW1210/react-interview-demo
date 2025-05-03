import "./ExpenseTracker.scss";
import "../../styles/common.scss";

import type { JSX } from "react";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import type { AppDispatch, RootState } from "../../store";
import {
  addExpense,
  ExpenseItem,
  removeExpense,
  setFilterCategory,
} from "../../store/expenseSlice";

// 類別圖標映射
const categoryIcons: Record<string, string> = {
  餐飲: "🍲",
  交通: "🚌",
  購物: "🛍️",
  娛樂: "🎬",
  醫療: "💊",
  住宿: "🏠",
  旅遊: "✈️",
  教育: "📚",
  其他: "📋",
};

// 獲取類別圖標
const getCategoryIcon = (category: string): string => {
  return categoryIcons[category] || "💼";
};

// 格式化金額
const formatAmount = (amount: number): string => {
  return amount.toLocaleString("zh-TW");
};

// 格式化日期
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-TW", {
    month: "short",
    day: "numeric",
  });
};

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
  const [formError, setFormError] = useState<string | null>(null);

  function handleAdd(e: React.FormEvent): void {
    e.preventDefault();

    if (!description) {
      setFormError("請輸入描述");
      return;
    }

    if (amount <= 0) {
      setFormError("金額必須大於0");
      return;
    }

    if (!category) {
      setFormError("請選擇或輸入類別");
      return;
    }

    setFormError(null);
    dispatch(addExpense({ description, amount, category, date }));

    // 重置表單
    setDescription("");
    setAmount(0);
    setCategory("");
    setDate(new Date().toISOString().slice(0, 10));
  }

  function handleRemove(id: string): void {
    dispatch(removeExpense(id));
  }

  const categories = Array.from(new Set(list.map((exp) => exp.category)));
  const filtered = useMemo(
    () =>
      filterCategory === "all"
        ? list
        : list.filter((exp) => exp.category === filterCategory),
    [list, filterCategory]
  );

  const total = useMemo(
    () => filtered.reduce((sum, exp) => sum + exp.amount, 0),
    [filtered]
  );

  const commonCategories = useMemo(
    () => [
      "餐飲",
      "交通",
      "購物",
      "娛樂",
      "醫療",
      "住宿",
      "旅遊",
      "教育",
      "其他",
    ],
    []
  );

  return (
    <div className="expense-page page-container">
      <Link to="/" className="back-home-button" aria-label="返回首頁" />

      <div className="page-header">
        <h1>收支管理</h1>
        <p className="page-subtitle">記錄並管理您的日常支出</p>
      </div>

      <div className="expense-dashboard">
        <div className="expense-summary-card">
          <h3>支出總計</h3>
          <div className="expense-amount">{formatAmount(total)} 元</div>
          <div className="expense-filter">
            <label htmlFor="expense-filter">
              當前篩選：
              <select
                id="expense-filter"
                value={filterCategory}
                onChange={(e) => dispatch(setFilterCategory(e.target.value))}
              >
                <option value="all">全部類別</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="expense-add-card">
          <h3>新增支出</h3>
          <form className="expense-form" onSubmit={handleAdd}>
            {formError && <div className="form-error">{formError}</div>}

            <div className="form-group">
              <label htmlFor="expense-date">日期</label>
              <input
                id="expense-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expense-description">描述</label>
              <input
                id="expense-description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="例如：午餐、交通費"
              />
            </div>

            <div className="form-group">
              <label htmlFor="expense-amount">金額</label>
              <input
                id="expense-amount"
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="請輸入金額"
              />
            </div>

            <div className="form-group">
              <label htmlFor="expense-category">類別</label>
              <div className="category-input-group">
                <input
                  id="expense-category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="例如：餐飲、交通"
                  list="common-categories"
                />
                <datalist id="common-categories">
                  {commonCategories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>
              <div className="category-shortcuts">
                {commonCategories.slice(0, 5).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    className={category === cat ? "active" : ""}
                    onClick={() => setCategory(cat)}
                    aria-label={`選擇${cat}類別`}
                  >
                    {getCategoryIcon(cat)} {cat}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="submit-button">
              新增支出
            </button>
          </form>
        </div>
      </div>

      <div className="expense-list-container">
        <h3>支出明細</h3>

        {filtered.length === 0 ? (
          <div className="empty-list">
            <p>
              目前沒有
              {filterCategory !== "all" ? `「${filterCategory}」類別的` : ""}
              支出記錄
            </p>
            <p>添加一筆新支出來開始記錄吧！</p>
          </div>
        ) : (
          <div className="expense-list">
            {filtered.map((exp: ExpenseItem) => (
              <div key={exp.id} className="expense-item">
                <div className="expense-icon">
                  {getCategoryIcon(exp.category)}
                </div>
                <div className="expense-content">
                  <div className="expense-details">
                    <span className="expense-desc">{exp.description}</span>
                    <span className="expense-category">{exp.category}</span>
                  </div>
                  <div className="expense-meta">
                    <span className="expense-date">{formatDate(exp.date)}</span>
                    <span className="expense-amount">
                      {formatAmount(exp.amount)} 元
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="expense-remove"
                  onClick={() => handleRemove(exp.id)}
                  aria-label="刪除支出"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
