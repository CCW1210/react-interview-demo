import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Quote {
  symbol: string;
  price: number;
  timestamp: number;
  change?: number;
  changePercent?: number;
  previousClose?: number;
  dayHigh?: number;
  dayLow?: number;
  name?: string;
}

export interface CommodityState {
  quotes: Quote[];
  historicalData: Record<string, { date: string; price: number }[]>;
  selectedSymbol: string;
  loading: boolean;
  error: string | null;
}

// ?�步 thunk 行�??�建??
export const fetchCommodityQuotes = createAsyncThunk(
  "commodity/fetchQuotes",
  async (symbols: string[]) => {
    const apiKey = import.meta.env.VITE_FMP_API_KEY;
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbols.join(",")}?apikey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch commodity quotes");
    }
    // ?�接返�? promise 結�?，避?��?餘�? await
    return response.json();
  }
);

export const fetchHistoricalData = createAsyncThunk(
  "commodity/fetchHistorical",
  async ({ symbol, days }: { symbol: string; days: number }) => {
    const apiKey = import.meta.env.VITE_FMP_API_KEY;
    const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=${days}&apikey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch historical data for ${symbol}`);
    }
    const data = await response.json();
    return { symbol, data };
  }
);

const initialState: CommodityState = {
  quotes: [],
  historicalData: {},
  selectedSymbol: "GCUSD",
  loading: false,
  error: null,
};

const commoditySlice = createSlice({
  name: "commodity",
  initialState,
  reducers: {
    setSelectedSymbol(state, action: PayloadAction<string>) {
      state.selectedSymbol = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ?��??��??��??�價
      .addCase(fetchCommodityQuotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommodityQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes = action.payload;
      })
      .addCase(fetchCommodityQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch commodity quotes";
      })
      // ?��??��?歷史?��?
      .addCase(fetchHistoricalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.loading = false;
        const { symbol, data } = action.payload;
        if (data.historical && Array.isArray(data.historical)) {
          state.historicalData[symbol] = data.historical
            .map((item: Record<string, unknown>) => ({
              date: item.date as string,
              price: item.close as number,
            }))
            .reverse();
        }
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch historical data";
      });
  },
});

export const { setSelectedSymbol, clearError } = commoditySlice.actions;
export default commoditySlice.reducer;
