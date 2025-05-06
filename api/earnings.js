const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const apiKey = "yxIGO1sJoAjA8pqy3YJ1CpPhdks56EOO";
  const symbols = ["AAPL", "MSFT", "JPM", "GOOGL", "META"];
  const results = [];

  for (const symbol of symbols) {
    let epsActual = null;
    let epsEstimate = null;
    let revenueActual = null;

    try {
      const epsUrl = `https://financialmodelingprep.com/api/v3/earnings-surprises/${symbol}?limit=1&apikey=${apiKey}`;
      const epsRes = await fetch(epsUrl);
      const epsData = await epsRes.json();

      if (Array.isArray(epsData) && epsData.length > 0) {
        const eps = epsData[0];
        epsActual = eps.actualEarnings ?? null;
        epsEstimate = eps.estimatedEarnings ?? null;
      }
    } catch (err) {
      console.error(`EPS fetch failed for ${symbol}:`, err);
    }

    try {
      const revUrl = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=1&apikey=${apiKey}`;
      const revRes = await fetch(revUrl);
      const revData = await revRes.json();

      if (Array.isArray(revData) && revData.length > 0) {
        revenueActual = revData[0].revenue ?? null;
      }
    } catch (err) {
      console.error(`Revenue fetch failed for ${symbol}:`, err);
    }

    results.push({
      ticker: symbol,
      epsActual,
      epsEstimate,
      revenueActual,
      revenueEstimate: null
    });
  }

  res.status(200).json(results);
};
