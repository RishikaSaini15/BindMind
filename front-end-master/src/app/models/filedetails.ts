import {Assignment} from './assignment';
import {User} from './user';
export class FileDetails {
    id: number;
    date: Date;
    uploadedBy: User;
    file: string="";
    assignment: Assignment;
}
