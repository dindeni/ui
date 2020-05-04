import PieChart from './PieChart';

const pieChartWrapper = document.querySelector('.js-pie-chart');

if (pieChartWrapper) {
  const pieChart = new PieChart(pieChartWrapper);
  pieChart.loadChart();
}
