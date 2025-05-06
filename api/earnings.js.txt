export default async function handler(req, res) {
  const apiKey = "yxIGO1sJoAjA8pqy3YJ1CpPhdks56EOO";
  const symbols = ["AAPL", "MSFT", "JPM", "GOOGL", "META"];
  const results = [];

  for (const symbol of symbols) {
    const url = `https://financialmodelingprep.com/api/v3/earnings-surprises/${symbol}?limit=1&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const item = data[0];

    if (item) {
      results.push({
        ticker: symbol,
        epsActual: item.actualEarnings,
        epsEstimate: item.estimatedEarnings,
        revenueActual: item.revenue || 0,
        revenueEstimate: item.revenueEstimated || 0,
      });
    }
  }

  res.status(200).json(results);
}
