const form = document.getElementById("calc-form");
const initialTotalEl = document.getElementById("initialTotal");
const monthlyProfitEl = document.getElementById("monthlyProfit");
const breakEvenEl = document.getElementById("breakEven");
const periodProfitEl = document.getElementById("periodProfit");
const resultNoteEl = document.getElementById("resultNote");

const formatYen = (value) =>
  `¥${Math.round(value).toLocaleString("ja-JP")}`;

const readNumber = (name) => {
  const value = Number(form.elements[name].value);
  return Number.isFinite(value) ? value : 0;
};

const calculate = () => {
  const deviceCost = readNumber("deviceCost");
  const setupCost = readNumber("setupCost");
  const maintenance = readNumber("maintenance");
  const variableCost = readNumber("variableCost");
  const price = readNumber("price");
  const volume = readNumber("volume");
  const months = Math.max(1, readNumber("months"));

  const initialTotal = deviceCost + setupCost;
  const monthlyRevenue = price * volume;
  const monthlyVariable = variableCost * volume;
  const monthlyProfit = monthlyRevenue - monthlyVariable - maintenance;
  const breakEven = monthlyProfit > 0 ? initialTotal / monthlyProfit : null;
  const periodProfit = monthlyProfit * months - initialTotal;

  initialTotalEl.textContent = formatYen(initialTotal);
  monthlyProfitEl.textContent = formatYen(monthlyProfit);
  breakEvenEl.textContent = breakEven
    ? `${breakEven.toFixed(1)} ヶ月`
    : "回収不可";
  periodProfitEl.textContent = formatYen(periodProfit);

  if (monthlyProfit <= 0) {
    resultNoteEl.textContent =
      "月次利益がマイナスのため、検査単価や件数の見直しが必要です。";
  } else if (breakEven && breakEven > months) {
    resultNoteEl.textContent =
      "回収期間内に初期投資を回収できない見込みです。計画の再検討を推奨します。";
  } else {
    resultNoteEl.textContent =
      "回収期間内での採算が期待できます。稼働率の変化も想定しましょう。";
  }
};

form.addEventListener("input", calculate);

calculate();
