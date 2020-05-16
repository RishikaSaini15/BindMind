import {Module} from './modules';

export class Assignment {
    id: number;
    name: string="";
    description: string="";
    startDate: Date;
    endDate: Date;
    module: Module;
    file: string;
}
