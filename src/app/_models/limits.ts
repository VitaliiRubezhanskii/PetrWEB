import {Survey} from './Survey';

export class Limit {
  region: string;
  survey: number;
  gender: string;
  ageGroup: string;
  countOfSurveys: number;
}


export class LimitDTO {
    region: string;
    survey: number;
    gender: string[];
    ageGroup: string[];
  countOfSurveys: number;
}
