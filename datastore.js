export class DataContainer {
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