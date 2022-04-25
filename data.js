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

const addChart = title => {
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

const updateChart = (chart, labels, values) => {
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

class DataContainer {
    constructor() {
        this.data = [];
        this.labels = [];
    }

    append(newData) {
        const lastLabel = this.labels[this.labels.length - 1];
        const dataToAdd = newData
            .filter(d => !lastLabel || new Date(d.time) > new Date(lastLabel))
            .sort((a, b) => new Date(a.time) - new Date(b.time));
        this.data.push(...dataToAdd.map(d => d.data));
        this.labels.push(...dataToAdd.map(d => d.time));
    }
}

const loadData = async () => {
    const [humChart, humData] = [addChart('Humidity'), new DataContainer()];
    const [tempChart, tempData] = [addChart('Temperature'), new DataContainer()];
    const [part1Chart, part1Data] = [addChart('Particles 2.5'), new DataContainer()];
    const [part2Chart, part2Data] = [addChart('Particles 10'), new DataContainer()];

    const update = async(url, dataA, chartA, dataB, chartB) => {
        const sensor = await axios.get(url);
        dataA.append(sensor.data.map(d => ({data:d.sensordatavalues[0].value, time:d.timestamp})));   
        dataB.append(sensor.data.map(d => ({data:d.sensordatavalues[1].value, time:d.timestamp}))); 

        updateChart(chartA, dataA.labels, dataA.data);
        updateChart(chartB, dataB.labels, dataB.data);
        document.getElementById('overlay').style.display = 'None';
    };

    const updateHumAndTemp = () => update('https://data.sensor.community/airrohr/v1/sensor/71551/', humData, humChart, tempData, tempChart);
    const updateParticles = () => update('https://data.sensor.community/airrohr/v1/sensor/71550/', part1Data, part1Chart, part2Data, part2Chart);

    updateHumAndTemp();
    updateParticles();
    setInterval(updateHumAndTemp, 60000);
    setInterval(updateParticles, 60000);
};