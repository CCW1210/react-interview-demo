import "./CommodityMonitor.scss";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

interface Quote {
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

interface CommodityInfo {
  GCUSD: { name: string; color: string; icon: string };
  SIUSD: { name: string; color: string; icon: string };
  CLUSD: { name: string; color: string; icon: string };
}

// 將 commodityInfo 移到組件外部，這樣它不會在每次渲染時重新創建
const commodityInfo: CommodityInfo = {
  GCUSD: {
    name: "黃金",
    color: "rgba(255, 215, 0, 0.7)",
    icon: "⚜️",
  },
  SIUSD: {
    name: "白銀",
    color: "rgba(192, 192, 192, 0.7)",
    icon: "🔘",
  },
  CLUSD: {
    name: "原油",
    color: "rgba(139, 69, 19, 0.7)",
    icon: "🛢️",
  },
};

export default function CommodityMonitor() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [historicalData, setHistoricalData] = useState<{
    [key: string]: { date: string; price: number }[];
  }>({});
  const [selectedSymbol, setSelectedSymbol] = useState<string>("GCUSD");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const symbols = useMemo(() => Object.keys(commodityInfo), []);

  const fetchLatestQuotes = useCallback(async () => {
    try {
      setRefreshing(true);
      const apiKey = import.meta.env.VITE_FMP_API_KEY;
      const url = `https://financialmodelingprep.com/api/v3/quote/${symbols.join(",")}?apikey=${apiKey}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("資料獲取失敗");

      const data = await response.json();

      const mapped: Quote[] = data.map((d: Record<string, unknown>) => ({
        symbol: d.symbol as string,
        price: d.price as number,
        timestamp: d.timestamp as number,
        change: d.change as number,
        changePercent: d.changesPercentage as number,
        previousClose: d.previousClose as number,
        dayHigh: d.dayHigh as number,
        dayLow: d.dayLow as number,
        name: commodityInfo[d.symbol as keyof CommodityInfo].name,
      }));

      setQuotes(mapped);
      setError(null);
    } catch (err) {
      setError("無法獲取最新報價，請稍後再試");
      // 記錄錯誤但不在生產環境顯示
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [symbols]);

  const fetchHistoricalData = useCallback(async () => {
    try {
      const apiKey = import.meta.env.VITE_FMP_API_KEY;
      const results: { [key: string]: { date: string; price: number }[] } = {};

      // 使用 Promise.all 避免在循環中使用 await
      const promises = symbols.map(async (symbol) => {
        const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=7&apikey=${apiKey}`;
        try {
          const response = await fetch(url);
          if (!response.ok) return;

          const data = await response.json();
          if (data.historical && Array.isArray(data.historical)) {
            results[symbol] = data.historical
              .map((item: Record<string, unknown>) => ({
                date: item.date as string,
                price: item.close as number,
              }))
              .reverse();
          }
        } catch (err) {
          // 記錄個別符號的錯誤但繼續處理其他符號
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.error(`Error fetching data for ${symbol}:`, err);
          }
        }
      });

      await Promise.all(promises);
      setHistoricalData(results);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("獲取歷史數據失敗:", err);
      }
    }
  }, [symbols]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchLatestQuotes();
      await fetchHistoricalData();
    };

    fetchData();

    // 每60秒自動更新一次最新報價
    const intervalId = setInterval(() => {
      fetchLatestQuotes();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [fetchLatestQuotes, fetchHistoricalData]);

  const handleRefresh = useCallback(() => {
    fetchLatestQuotes();
  }, [fetchLatestQuotes]);

  const selectedQuote = quotes.find((q) => q.symbol === selectedSymbol);

  const chartData = useMemo(() => {
    if (!historicalData[selectedSymbol]) return null;

    const data = historicalData[selectedSymbol];
    const info = commodityInfo[selectedSymbol as keyof CommodityInfo];

    return {
      labels: data.map((d) => d.date),
      datasets: [
        {
          label: `${info.name} (${selectedSymbol})`,
          data: data.map((d) => d.price),
          borderColor: info.color,
          backgroundColor: `${info.color.slice(0, -4)}0.2)`,
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: info.color,
          fill: true,
        },
      ],
    };
  }, [historicalData, selectedSymbol]); // 移除 commodityInfo 依賴，因為它現在是靜態的

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        bodyFont: {
          size: 13,
        },
        titleFont: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          // 修正類型問題，調整回調函數的參數類型
          callback(this: unknown, value: string | number) {
            if (typeof value !== "number") return value;
            return value.toLocaleString("zh-TW", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const getChangeColor = (change?: number) => {
    if (!change) return "text-gray-500";
    return change > 0 ? "text-green-500" : "text-red-500";
  };

  const formatPrice = (price?: number) => {
    if (!price) return "-";
    return price.toLocaleString("zh-TW", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="commodity-monitor">
      <div className="monitor-header">
        <h2 className="monitor-title">大宗商品即時報價</h2>
        <button
          className="refresh-button"
          onClick={handleRefresh}
          disabled={refreshing}
          type="button"
          aria-label="更新報價"
        >
          <span
            className={refreshing ? "refresh-icon spinning" : "refresh-icon"}
          >
            ↻
          </span>
          更新報價
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="commodity-cards">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="spinner" />
            <p>正在載入商品報價...</p>
          </div>
        ) : (
          quotes.map((quote) => (
            <div
              key={quote.symbol}
              className={`commodity-card ${selectedSymbol === quote.symbol ? "selected" : ""}`}
              onClick={() => setSelectedSymbol(quote.symbol)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedSymbol(quote.symbol);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={selectedSymbol === quote.symbol}
            >
              <div className="card-icon">
                <span>
                  {commodityInfo[quote.symbol as keyof CommodityInfo].icon}
                </span>
              </div>
              <div className="card-content">
                <h3>
                  {commodityInfo[quote.symbol as keyof CommodityInfo].name}
                </h3>
                <div className="price">{formatPrice(quote.price)}</div>
                <div className={`change ${getChangeColor(quote.change)}`}>
                  <span className="change-arrow">
                    {quote.change && quote.change > 0 ? "▲" : "▼"}
                  </span>
                  <span>
                    {quote.change?.toFixed(2)} (
                    {quote.changePercent?.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedQuote && (
        <div className="selected-details">
          <div className="detail-item">
            <span className="detail-label">今日高點</span>
            <span className="detail-value">
              {formatPrice(selectedQuote.dayHigh)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">今日低點</span>
            <span className="detail-value">
              {formatPrice(selectedQuote.dayLow)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">昨收價</span>
            <span className="detail-value">
              {formatPrice(selectedQuote.previousClose)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">最後更新</span>
            <span className="detail-value">
              {selectedQuote.timestamp
                ? new Date(selectedQuote.timestamp * 1000).toLocaleString(
                    "zh-TW"
                  )
                : "-"}
            </span>
          </div>
        </div>
      )}

      <div className="chart-container">
        {chartData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="chart-loading">
            <p>正在載入歷史數據圖表...</p>
          </div>
        )}
      </div>
    </div>
  );
}
