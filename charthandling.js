const getChartOptions = title => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            stacked: true,
            grid: {
                display: true,
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    },
    plugins: {
        title: {
            display: true,
            text: title,
            font: {
                size: 20
            }
        },
        legend: {
            display: false,
        }
    }
});

export const addChart = title => {
    const canvas = document.createElement('canvas');

    const canvasDiv = document.createElement('div');
    canvasDiv.className = 'chart-container';
    canvasDiv.appendChild(canvas);

    document
        .getElementById('charts')
        .appendChild(canvasDiv);

    const ctx = canvas.getContext('2d');
    const options = getChartOptions(title);
    return new Chart(ctx, {
        type: 'line',
        options: options
    });
}

export const updateChart = (chart, labels, values) => {
    const data = {
        labels: labels,
        datasets: [{
            data: values,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    chart.data = data;
    chart.update();
};