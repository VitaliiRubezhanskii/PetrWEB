import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../_services';
import {User} from '../../_models';
import {SurveyResult} from '../../_models/SurveyResult';
import {SurveyResultService} from '../../_services/surveyResult.service';
import {jqxTreeGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';
import {jqxMenuComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit {

  currentUser = true;
  paramID = this.getUserId();
  parameter = 0;
  params: number[] = []
  user: User = new User();
  users: any [] = [];
  // user: User;

  @ViewChild('myTreeGrid') myTreeGrid: jqxTreeGridComponent;
  @ViewChild('myMenu') myMenu: jqxMenuComponent;
  constructor(private userService: UserService) {
    this.parameter = this.getUserId();
  }

  ngOnInit() {

    // this.getUserId().subscribe(() => {console.log('this.user: ' + this.user)});
    // this.userService.getUsersStructure().subscribe(data => data.forEach(u => {
    //   this.users.push(u);
    // }));
    // console.log(this.users);
    // this.userService.getByUsername(localStorage.getItem('username')).subscribe((result) => {
    //   this.user = result;
    //   this.users.push(this.user);
    //   console.log(this.users[0]);
      // this.dataSourceURL = 'http://localhost:8080/scoring/users/' + this.user.id;
      // console.log(this.dataSourceURL);
    // });
  }

  public getUserId(): number {

     this.userService.getByUsername(localStorage.getItem('username')).pipe(map((u) => {
        console.log('user:' + u);
        this.user = u;
        this.paramID = u.id
       this.params.push(u.id);
        console.log('params: ' + this.params)
        console.log('userID:' + this.paramID);
      })).subscribe(() => {

        console.log('userID: ' + this.paramID);
        return this.paramID;
      });
    return this.paramID;

    // this.userService.getUsersStructure().subscribe(data => data.forEach(u => {
    //   this.users.push(u);
    // }));
    // console.log(this.users);
    // return this.users.then(er(u => u.username === localStorage.getItem('username'))[0].id;
  }

  source: any =
    {
      dataType: 'json',
      dataFields: [
        {name: 'id', type: 'number'},
        {name: 'parentId', type: 'number'},
        {name: 'name', type: 'string'},
        {name: 'middleName', type: 'string'},
        {name: 'surname', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'ownSurveysCount', type: 'number'},
        {name: 'countOfChildrensSurveys', type: 'number'},
        {name: 'totalScoreOfChildren', type: 'number'},
        {name: 'totalAccountedScoring', type: 'number'},
        {name: 'countOfGrandChildrensSurveys', type: 'number'},
        {name: 'totalScoreOfGrandChildren', type: 'number'},
      ],
      hierarchy:
        {
          keyDataField: {name: 'id'},
          parentDataField: {name: 'parentId'}
        },
      id: 'id',
      url: 'http://localhost:8080/scoring/users/' + this.paramID



    };

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '200%';
    }

    return 1100;
  }
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] =
    [ {text: 'id', dataField: 'id', editable: false, width: 200},
      {text: 'Имя', dataField: 'name', width: 200},
      {text: 'Отчество', dataField: 'middleName', width: 150},
      {text: 'Фамилия', dataField: 'surname', width: 160},
      {text: 'Телефон', dataField: 'phone', width: 120},
      {text: 'Email', dataField: 'email', width: 120},
      {text: 'Руководитель', dataField: 'parentId', width: 120},
      {text: 'Мои анкеты', dataField: 'ownSurveysCount', width: 120},
      {text: 'Анкеты 2 ур.', dataField: 'countOfChildrensSurveys', width: 120},
      {text: 'Анкеты 3 ур', dataField: 'countOfGrandChildrensSurveys', width: 120},
      {text: 'Баллы', dataField: 'totalAccountedScoring', width: 120},
      {text: 'Баллы 2 ур', dataField: 'totalScoreOfChildren', width: 120},
      {text: 'Баллы 3 ур', dataField: 'totalScoreOfGrandChildren', width: 120},

    ];

  ready = (): void => {
    this.myTreeGrid.expandRow(2);
    document.addEventListener('contextmenu', event => event.preventDefault());
  }

  myMenuOnItemClick(event: any): void {
    let args = event.args;
    let selection = this.myTreeGrid.getSelection();
    let rowid = selection[0].uid;
    if (args.innerHTML == 'Edit Selected Row') {
      this.myTreeGrid.beginRowEdit(rowid);
    } else {
      this.myTreeGrid.deleteRow(rowid);
    }
  };

  myTreeGridOnRowClick(event: any): boolean {
    let args = event.args;
    if (args.originalEvent.button == 2) {
      let scrollTop = window.scrollX;
      let scrollLeft = window.scrollY;
      this.myMenu.open(parseInt(event.args.originalEvent.clientX) + 5 + scrollLeft, parseInt(event.args.originalEvent.clientY) + 5 + scrollTop);
      return false;
    }
  };
  excelExportClick(): void {
    this.myTreeGrid.exportData('xls');
  };




}
