const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async (req, res) => {
  const apiKey = "yxIGO1sJoAjA8pqy3YJ1CpPhdks56EOO";
  const symbols = ["AAPL", "MSFT", "JPM", "GOOGL", "META"];
  const results = [];

  for (const symbol of symbols) {
    let epsActual = null;
    let epsEstimate = null;
    let revenueActual = null;
    let revenueEstimate = null;

    // Fetch EPS data
    try {
      const epsUrl = `https://financialmodelingprep.com/api/v3/earnings-surprises/${symbol}?limit=1&apikey=${apiKey}`;
      const epsResponse = await fetch(epsUrl);
      const epsData = await epsResponse.json();
      const epsItem = epsData[0];
      if (epsItem) {
        epsActual = epsItem.actualEarnings;
        epsEstimate = epsItem.estimatedEarnings;
      }
    } catch (e) {
      console.error(`EPS fetch failed for ${symbol}`, e);
    }

    // Fetch Revenue data
    try {
      const revUrl = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=1&apikey=${apiKey}`;
      const revResponse = await fetch(revUrl);
      const revData = await revResponse.json();
      const revItem = revData[0];
      if (revItem) {
        revenueActual = revItem.revenue;
      }
    } catch (e) {
      console.error(`Revenue fetch failed for ${symbol}`, e);
    }

    results.push({
      ticker: symbol,
      epsActual,
      epsEstimate,
      revenueActual,
      revenueEstimate // Still null — estimates not available
    });
  }

  res.status(200).json(results);
};
