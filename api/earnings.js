module.exports = async (req, res) => {
  const apiKey = "yxIGO1sJoAjA8pqy3YJ1CpPhdks56EOO";
  const symbols = ["AAPL", "MSFT", "JPM", "GOOGL", "META"];
  const results = [];

  for (const symbol of symbols) {
    let epsActual = null;
    let epsEstimate = null;
    let revenueActual = null;

    try {
      // Fetch EPS from earnings-surprises
      const epsUrl = `https://financialmodelingprep.com/api/v3/earnings-surprises/${symbol}?limit=1&apikey=${apiKey}`;
      const epsRes = await fetch(epsUrl);
      const epsData = await epsRes.json();

      if (Array.isArray(epsData) && epsData.length > 0) {
        const eps = epsData[0];
        epsActual = typeof eps.actualEarnings === "number" ? eps.actualEarnings : null;
        epsEstimate = typeof eps.estimatedEarnings === "number" ? eps.estimatedEarnings : null;
      }
    } catch (err) {
      console.error(`EPS fetch failed for ${symbol}:`, err);
    }

    try {
      // Fetch revenue from income-statement
      const revUrl = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=1&apikey=${apiKey}`;
      const revRes = await fetch(revUrl);
      const revData = await revRes.json();

      if (Array.isArray(revData) && revData.length > 0) {
        const rev = revData[0];
        revenueActual = typeof rev.revenue === "number" ? rev.revenue : null;
      }
    } catch (err) {
      console.error(`Revenue fetch failed for ${symbol}:`, err);
    }

    results.push({
      ticker: symbol,
      epsActual,
      epsEstimate,
      revenueActual,
      revenueEstimate: null // not available from free APIs
    });
  }

  res.status(200).json(results);
};
