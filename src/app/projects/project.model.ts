export class Project {
    public name: string;
    public description: string;
    public startTime: any;
    public endTime: string;
    public seconds: number;
    public dateTracked: string;
    public totalTime: string;

    constructor(name: string, description: string, startTime: string, endTime: string, seconds: number, dateTracked: string, totalTime: string) {
        this.name = name;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.seconds = seconds;
        this.dateTracked = dateTracked;
        this.totalTime = totalTime;
    }
}