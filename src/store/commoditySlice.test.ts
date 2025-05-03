import { AnyAction } from "@reduxjs/toolkit";

import type { CommodityPrice } from "../api/commodity";
import reducer, { CommodityState, getCommodityPrices } from "./commoditySlice";

describe("commoditySlice", () => {
  const initial: CommodityState = { data: [], status: "idle", error: null };

  it("should handle pending", () => {
    const action = { type: getCommodityPrices.pending.type } as AnyAction;
    const state = reducer(initial, action);
    expect(state.status).toBe("loading");
  });

  it("should handle fulfilled", () => {
    const prices: CommodityPrice[] = [
      { symbol: "GOLD", price: 100, timestamp: "t1" },
    ];
    const action = {
      type: getCommodityPrices.fulfilled.type,
      payload: prices,
    } as AnyAction;
    const state = reducer(initial, action);
    expect(state.data).toEqual(prices);
    expect(state.status).toBe("idle");
  });

  it("should handle rejected", () => {
    const action = {
      type: getCommodityPrices.rejected.type,
      error: { message: "err" },
    } as AnyAction;
    const state = reducer(initial, action);
    expect(state.error).toBe("err");
    expect(state.status).toBe("failed");
  });
});
