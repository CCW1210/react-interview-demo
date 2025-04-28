// src/api/storage.ts

/** Todo 型別定義 */
export interface Todo {
    id: number;
    text: string;
    done: boolean;
  }
  
  const STORAGE_KEY = 'todo-list';
  
  /** 從 localStorage 載入 Todo 陣列 */
  export function loadTodos(): Todo[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) as Todo[] : [];
    } catch (err) {
      console.error('loadTodos error:', err);
      return [];
    }
  }
  
  /** 將 Todo 陣列存回 localStorage */
  export function saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
      console.error('saveTodos error:', err);
    }
  }
  