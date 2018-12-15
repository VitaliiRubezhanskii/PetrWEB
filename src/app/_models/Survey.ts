import {Question} from './question';

export class Survey {
  id: number;
  name: string;
  count: number;
  date: string;
  status: string;
  passed: boolean;
  questions: Question[];
}


