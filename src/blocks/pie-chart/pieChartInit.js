import PieChart from './PieChart';

const pieChartElement = document.querySelector('.js-pie-chart__inner');
const pieChartOuterElement = document.querySelector('.js-pie-chart__outer');

const isExistChartElements = pieChartElement && pieChartOuterElement;
if (isExistChartElements) {
  const pieChart = new PieChart({
    elementInner: pieChartElement,
    elementOuter: pieChartOuterElement,
  });
  pieChart.loadChart();
}
