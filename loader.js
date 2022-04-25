import { DataContainer } from './datastore.js'
import { addChart, updateChart } from './charthandling.js'

export const loadData = async () => {
    const [humChart, humData] = [addChart('Humidity'), new DataContainer()];
    const [tempChart, tempData] = [addChart('Temperature'), new DataContainer()];
    const [part1Chart, part1Data] = [addChart('Particles 2.5'), new DataContainer()];
    const [part2Chart, part2Data] = [addChart('Particles 10'), new DataContainer()];

    const baseUrl = 'https://data.sensor.community/airrohr/v1/sensor/';
    const updateHumAndTemp = () => update(`${baseUrl}71551/`, humData, humChart, tempData, tempChart);
    updateHumAndTemp();
    setInterval(updateHumAndTemp, 60000);

    const updateParticles = () => update(`${baseUrl}71550/`, part1Data, part1Chart, part2Data, part2Chart);
    updateParticles();
    setInterval(updateParticles, 60000);
};

const update = async(url, dataA, chartA, dataB, chartB) => {
    const sensor = await axios.get(url);
    dataA.append(sensor.data.map(d => ({data:d.sensordatavalues[0].value, time:d.timestamp})));   
    dataB.append(sensor.data.map(d => ({data:d.sensordatavalues[1].value, time:d.timestamp}))); 

    updateChart(chartA, dataA.labels, dataA.data);
    updateChart(chartB, dataB.labels, dataB.data);
    document.getElementById('overlay').style.display = 'None';
};