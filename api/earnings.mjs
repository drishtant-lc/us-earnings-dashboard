import { fetch } from 'undici';

export default async function handler(req, res) {
  const apiKey = "yxIGO1sJoAjA8pqy3YJ1CpPhdks56EOO";
  const symbols = ["AAPL", "MSFT", "GOOGL", "META", "JPM"];
  const results = [];

  for (const symbol of symbols) {
    let epsActual = null;
    let epsEstimate = null;
    let revenueActual = null;

    try {
      const epsRes = await fetch(`https://financialmodelingprep.com/api/v3/earnings-surprises/${symbol}?limit=1&apikey=${apiKey}`);
      const epsData = await epsRes.json();
      if (Array.isArray(epsData) && epsData.length > 0) {
        epsActual = epsData[0].actualEarnings ?? null;
        epsEstimate = epsData[0].estimatedEarnings ?? null;
      }
    } catch (err) {
      console.error(`EPS fetch failed for ${symbol}:`, err);
    }

    try {
      const revRes = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=1&apikey=${apiKey}`);
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

  return res.status(200).json(results);
}