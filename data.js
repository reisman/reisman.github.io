const initChart = (name, title, labels, values) => {
    const options = {
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
    };

    const data = {
        labels: labels,
        datasets: [{
            data: values,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const canvas = document.createElement('canvas');

    const canvasDiv = document.createElement('div');
    canvasDiv.className = 'chart-container';
    canvasDiv.appendChild(canvas);

    const container = document.getElementById('charts');
    container.appendChild(canvasDiv);

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        options: options,
        data: data
    });
};

const loadData = async () => {
    /*
    const [sensorTempHum, sensorAir] = await axios.all([
        axios.get('https://data.sensor.community/airrohr/v1/sensor/71551/'),
        axios.get('https://data.sensor.community/airrohr/v1/sensor/71550/')
    ]);
    
    const humidity = sensorTempHum.data.map(d => d.sensordatavalues[0].value);
    const temperature = sensorTempHum.data.map(d => d.sensordatavalues[1].value);
    const timestamps = sensorTempHum.data.map(d => d.timestamp);
 
    const fineParticles25 = sensorAir.data.map(d => d.sensordatavalues[0].value);
    const fineParticles100 = sensorAir.data.map(d => d.sensordatavalues[1].value);
    const fineParticlesTimestamps = sensorAir.data.map(d => d.timestamp);
    */

    const humidity = [11, 12, 14, 9]
    const temperature = [11, 12, 14, 9]
    const timestamps = [1, 2, 3, 4]

    const fineParticles25 = [11, 12, 14, 9]
    const fineParticles100 = [11, 12, 14, 9]
    const fineParticlesTimestamps = [1, 2, 3, 4]

    initChart('humidityChart', 'Humidity', timestamps, humidity);
    initChart('temperatureChart', 'Temperature', timestamps, temperature);
    initChart('fineParticles25Chart', 'Particles 2.5', fineParticlesTimestamps, fineParticles25);
    initChart('fineParticles100Chart', 'Particles 10', fineParticlesTimestamps, fineParticles100);

    document.getElementById('overlay').style.display = 'None';
};