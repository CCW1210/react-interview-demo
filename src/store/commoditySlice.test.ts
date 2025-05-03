import { AnyAction } from "@reduxjs/toolkit";

import reducer, {
  CommodityState,
  fetchCommodityQuotes,
} from "./commoditySlice";

describe("commoditySlice", () => {
  const initial: CommodityState = {
    quotes: [],
    historicalData: {},
    selectedSymbol: "GCUSD",
    loading: false,
    error: null,
  };

  it("should handle pending", () => {
    const action = { type: fetchCommodityQuotes.pending.type } as AnyAction;
    const state = reducer(initial, action);
    expect(state.loading).toBe(true);
  });

  it("should handle fulfilled", () => {
    const prices = [{ symbol: "GOLD", price: 100, timestamp: Date.now() }];
    const action = {
      type: fetchCommodityQuotes.fulfilled.type,
      payload: prices,
    } as AnyAction;
    const state = reducer(initial, action);
    expect(state.quotes).toEqual(prices);
    expect(state.loading).toBe(false);
  });

  it("should handle rejected", () => {
    const action = {
      type: fetchCommodityQuotes.rejected.type,
      error: { message: "err" },
    } as AnyAction;
    const state = reducer(initial, action);
    expect(state.error).toBe("err");
    expect(state.loading).toBe(false);
  });
});
