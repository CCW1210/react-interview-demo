import axios from "axios";

export interface CommodityPrice {
  symbol: string;
  price: number;
  timestamp: string;
}

/**
 * 從第三方 API 取得某項商品的歷史價格陣列
 */
export async function fetchCommodityPrices(
  symbol: string
): Promise<CommodityPrice[]> {
  const resp = await axios.get(`/api/commodities/${symbol}`);
  return resp.data;
}
