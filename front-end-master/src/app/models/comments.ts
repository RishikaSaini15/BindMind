import {User} from './user';

export class Comments {
    postId: string;
    commentID: number;
    body: string="";
    timestamp: number;
    userID: User;
}
