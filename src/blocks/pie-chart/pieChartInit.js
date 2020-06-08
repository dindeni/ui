import PieChart from './PieChart';

const pieChartElements = document.querySelectorAll('.js-pie-chart');

[...pieChartElements].forEach((pieChartWrapper) => {
  const pieChart = new PieChart(pieChartWrapper);
  pieChart.loadChart();
});
