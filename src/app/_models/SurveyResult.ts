import {Survey} from './Survey';
import {User} from './user';

export class SurveyResult {

  id: number;
  survey: Survey;
  user: User;
  date: Date;
  bonus: number;

}
