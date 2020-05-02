/* eslint-disable no-new */
import Chart from 'chart.js';

class PieChart {
  constructor({ elementInner, elementOuter }) {
    this.chartElement = elementInner;
    this.chartOuterElement = elementOuter;
  }

  loadChart() {
    this._setGradient();
    this._setChartOuter();
    this._setChartInner();
    PieChart._setLegend();
  }

  _setGradient() {
    const chartElement = this.chartElement.getContext('2d');

    this.gradientPurple = chartElement.createLinearGradient(0, 0, 0, 400);
    this.gradientPurple.addColorStop(0, '#BC9CFF');
    this.gradientPurple.addColorStop(1, '#8BA4F9');

    this.gradientGreen = chartElement.createLinearGradient(0, 0, 0, 400);
    this.gradientGreen.addColorStop(0, '#6FCF97');
    this.gradientGreen.addColorStop(1, '#66D2EA');

    this.gradientOrange = chartElement.createLinearGradient(0, 0, 0, 400);
    this.gradientOrange.addColorStop(0, '#FFE39C');
    this.gradientOrange.addColorStop(1, '#FFBA9C');
  }

  _setChartOuter() {
    new Chart(this.chartOuterElement, {
      type: 'doughnut',
      data: {
        labels: ['Удовлетворительно', 'Хорошо', 'Великолепно'],
        datasets: [{
          label: '# of Votes',
          data: [25, 25, 50],
          backgroundColor: [this.gradientPurple, 'transparent', 'transparent'],
          borderWidth: [0, 2, 2],
          borderColor: [this.gradientPurple, '#ffffff', '#ffffff'],
        },
        ],
      },
      options: {
        cutoutPercentage: 85,
        responsive: false,
        legend: {
          display: false,
        },
      },

    });
  }

  _setChartInner() {
    new Chart(this.chartElement, {
      type: 'doughnut',
      data: {
        labels: ['Удовлетворительно', 'Хорошо', 'Великолепно'],
        datasets: [{
          label: '# of Votes',
          data: [25, 25, 50],
          backgroundColor: ['transparent', this.gradientGreen, this.gradientOrange],
          borderWidth: [0, 2, 2],
          borderColor: ['transparent', '#ffffff', '#ffffff'],
        },
        ],

      },
      options: {
        cutoutPercentage: 90,
        responsive: false,
        legend: {
          display: false,
        },
      },
    });
  }

  static _setLegend() {
    Chart.pluginService.register({
      beforeDatasetDraw: (chart) => {
        const { width } = chart.chart;
        const { ctx } = chart.chart;

        ctx.restore();
        ctx.font = '24px bold Montserrat, Arial, sans-serif';
        ctx.textBaseline = 'middle';
        const textNumber = '260';
        const textVotes = 'голосов';
        const textY = 60;
        ctx.fillStyle = '#BC9CFF';
        ctx.fillText(textNumber, width / 2, textY);
        ctx.font = '12px bold Montserrat, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(textVotes.toUpperCase(), width / 2, textY + 21);
        ctx.save();
      },
    });
  }
}

export default PieChart;
