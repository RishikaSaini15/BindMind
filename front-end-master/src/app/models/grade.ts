import {User} from './user';
import {Assignment} from './assignment';

export class Grade {
    id: number;
    user: User;
    grade: string="";
    assignment: Assignment;
}
