module.exports = async (req, res) => {
  const apiKey = "yxIGO1sJoAjA8pqy3YJ1CpPhdks56EOO";
  const symbols = ["AAPL", "MSFT", "JPM", "GOOGL", "META"];
  const results = [];

  for (const symbol of symbols) {
    let epsActual = null;
    let epsEstimate = null;
    let revenueActual = null;

    try {
      // EPS from earnings-surprises
      const epsUrl = `https://financialmodelingprep.com/api/v3/earnings-surprises/${symbol}?limit=1&apikey=${apiKey}`;
      const epsResponse = await fetch(epsUrl);
      const epsData = await epsResponse.json();
      if (Array.isArray(epsData) && epsData.length > 0) {
        epsActual = epsData[0].actualEarnings ?? null;
        epsEstimate = epsData[0].estimatedEarnings ?? null;
      }
    } catch (err) {
      console.error(`EPS fetch failed for ${symbol}`, err);
    }

    try {
      // Revenue from income-statement
      const revUrl = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=1&apikey=${apiKey}`;
      const revResponse = await fetch(revUrl);
      const revData = await revResponse.json();
      if (Array.isArray(revData) && revData.length > 0) {
        revenueActual = revData[0].revenue ?? null;
      }
    } catch (err) {
      console.error(`Revenue fetch failed for ${symbol}`, err);
    }

    results.push({
      ticker: symbol,
      epsActual,
      epsEstimate,
      revenueActual,
      revenueEstimate: null // not provided
    });
  }

  res.status(200).json(results);
};
