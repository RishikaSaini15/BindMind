import {User} from './user';
export class Course {
  id: number;
  name: string="";
  description: string="";
  moduleCount: number=0;
  instructor: User;
}
