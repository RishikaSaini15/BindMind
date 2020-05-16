import {User} from './user';

export class Messages {
    id: number;
    text: string="";
    user: User;
    timestamp: number;
    recep: User;
    cid: number;
}
