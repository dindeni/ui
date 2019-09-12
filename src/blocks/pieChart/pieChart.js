import Chart from 'chart.js'

const pieChartElement = document.querySelector('.pie-chart__inner');
const pieChartOuterElement = document.querySelector('.pie-chart__outer');

if (pieChartElement){
    const chartElement = pieChartElement.getContext('2d');
    const chartElementOuter = pieChartOuterElement.getContext('2d');

    const gradientPurple = chartElement.createLinearGradient(0, 0, 0, 400);
    gradientPurple.addColorStop(0, '#BC9CFF');
    gradientPurple.addColorStop(1, '#8BA4F9');

    const gradientGreen = chartElement.createLinearGradient(0, 0, 0, 400);
    gradientGreen.addColorStop(0, '#6FCF97');
    gradientGreen.addColorStop(1, '#66D2EA');

    const gradientOrange = chartElement.createLinearGradient(0, 0, 0, 400);
    gradientOrange.addColorStop(0, '#FFE39C');
    gradientOrange.addColorStop(1, '#FFBA9C');

    Chart.pluginService.register({
        beforeDatasetDraw: (chart)=>{
            const width = chart.chart.width;
            const ctx = chart.chart.ctx;

            ctx.restore();
            ctx.font = `24px bold Montserrat-regular, sans-serif`;
            ctx.textBaseline = "middle";
            const textNumber = '260';
            const textVotes = 'голосов';
            const textY = 60;
            ctx.fillStyle = '#BC9CFF';
            ctx.fillText(textNumber, width/2, textY);
            ctx.font = `12px bold Montserrat-regular, sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(textVotes.toUpperCase(), width/2, textY + 21);
            ctx.save();
        }
    });

    new Chart(chartElementOuter, {
        type: 'doughnut',
        data: {
            labels: ['Удовлетворительно', 'Хорошо', 'Великолепно'],
            datasets: [{
                label: '# of Votes',
                data: [25, 25, 50],
                backgroundColor: [gradientPurple, 'transparent', 'transparent'],
                borderWidth: [0, 2, 2],
                borderColor: [gradientPurple ,'#ffffff', '#ffffff'],
            },
            ],
        },
        options: {
            cutoutPercentage: 85,
            responsive: false,
            legend: {
                display: false
            },
        },

    });

    new Chart(chartElement, {
        type: 'doughnut',
        data: {
            labels: ['Удовлетворительно', 'Хорошо', 'Великолепно'],
            datasets: [{
                label: '# of Votes',
                data: [25, 25, 50],
                backgroundColor: ['transparent', gradientGreen, gradientOrange],
                borderWidth: [0, 2, 2],
                borderColor: ['transparent' ,'#ffffff', '#ffffff'],
            },
            ],

        },
        options: {
            cutoutPercentage: 90,
            responsive: false,
            legend: {
                display: false
            },
        },

    });
}




