import {User} from './user';

export class Conversation {
    id: number;
    topic: string="";
    firstmessage: string="";
    user: User;
    timestamp: number;
    recep: User;
}
