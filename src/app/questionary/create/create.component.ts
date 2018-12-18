import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../_services/question.service';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {Question} from '../../_models/question';
import {Survey} from '../../_models/Survey';



@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.less']
})

export class CreateComponent implements OnInit {
    public survey: Survey = new Survey();
    public questions: Question[] = [];
    public name: string;
    public description: string;

    constructor(public questionService: QuestionService, private questionnaireService: QuestionnaireService) { }

    ngOnInit() { }

    addQuestion() {
        this.questionService
            .addQuestion()
            .subscribe(result => result && this.questions.push(result));
    }

    save(questions: Question[]) {
      console.log(questions)
        this.questionnaireService
            .create(this.name, questions, 50).subscribe(r => {});
    }
}
