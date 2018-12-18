import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import {AddQuestionModalComponent} from '../questionary/add-question-modal/add-question-modal.component';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class QuestionService {

    constructor(public dialog: MatDialog,
                private http: HttpClient) {

    }

    public addQuestion() {
        return this.openQuestion({});
    }

    public editQuestion(data) {
        return this.openQuestion(data);
    }

    private openQuestion(data?) {
        const config: MatDialogConfig = {
            width: '750px',
            data: {

            }
        };
        const dialogRef = this.dialog.open(AddQuestionModalComponent, config);

        return dialogRef.afterClosed();
    }

    public deleteQuestion(questionId){
      this.http.delete(`http://localhost:8080/questions/delete/question/` + questionId);
    }

}
