/**
 * Todo ?�別
 */
export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

/**
 * 泛用 loadItem (localStorage)
 */
export function loadItem<T>(key: string): T | undefined {
  try {
    const json = localStorage.getItem(key);
    if (json) {
      return JSON.parse(json) as T;
    }
  } catch {
    // 忽略�???�誤
  }
  return undefined;
}

/**
 * 泛用 saveItem (localStorage)
 */
export function saveItem<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // 忽略存入?�誤
  }
}

/**
 * 載入?�??Todo
 */
export function loadTodos(): Todo[] {
  return loadItem<Todo[]>("todos") ?? [];
}

/**
 * ?��??�??Todo
 */
export function saveTodos(todos: Todo[]): void {
  saveItem<Todo[]>("todos", todos);
}
