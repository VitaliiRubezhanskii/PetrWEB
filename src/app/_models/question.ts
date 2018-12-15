import {Survey} from './Survey';

export class QuestionValue {
    value: string;
    answer: string;

    constructor(value, answer) {
        this.value = value;
        this.answer = answer;
    }
}
export class Answer {
  id: number;
  text: number;
  status: string;
  date: string;
  question: Question;

}
enum QuestionType {
  BOOLEAN,
  MULTI_CHOICE_SINGLE,
  MULTI_CHOICE_MULTI,
  DATE_TYPE,
  SHORT_ANSWER,
  LONG_ANSWER,
  NUMERICAL
}

export class Question {
    id: number;
    text: string;
    type: string;
    values: Array<any>;
    status: string;
    date: string;
    survey: Survey;
    answer: Answer;


    constructor(type, text, values) {
        this.type = type;
        this.text = text;
        this.values = values;
    }
}
