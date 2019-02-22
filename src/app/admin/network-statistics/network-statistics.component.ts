import {Component, OnInit, ViewChild} from '@angular/core';
import {SurveyResultService} from '../../_services/surveyResult.service';
import {SurveyResult, SurveyResultDto} from '../../_models/SurveyResult';
import {User} from '../../_models';
import {jqxTreeGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';
import {jqxMenuComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';

@Component({
  selector: 'app-network-statistics',
  templateUrl: './network-statistics.component.html',
  styleUrls: ['./network-statistics.component.css']
})
export class NetworkStatisticsComponent implements OnInit {

  surveyDto: SurveyResultDto = new SurveyResultDto();
  surveyDtoS: SurveyResultDto[] = [];
  @ViewChild('myTreeGrid') myTreeGrid: jqxTreeGridComponent;
  @ViewChild('myMenu') myMenu: jqxMenuComponent;
  constructor(private surveyResultService: SurveyResultService ) { }

  ngOnInit() {
    // this.surveyResultService.getSurveyResultsOfAll().subscribe(result => result.forEach(r => {
    //   this.surveyDto.id = r.id;
    //   this.surveyDto.parentId = r.user.parentId;
    //   this.surveyDto.name = r.user.name;
    //   this.surveyDto.middleName = r.user.middleName;
    //   this.surveyDto.surname = r.user.surname;
    //   this.surveyDto.phone = r.user.phone;
    //   this.surveyDto.email = r.user.email;
    //   this.surveyDto.count = r.count;
    //   this.surveyDto.sum = r.bonus;
    //   this.surveyDtoS.push(this.surveyDto);
    // }));
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
        {name: 'totalAccountedScoring', type: 'number'}
      ],
      hierarchy:
        {
          keyDataField: {name: 'id'},
          parentDataField: {name: 'parentId'}
        },
      id: 'id',
      url: 'http://localhost:8080/scoring/users'


    };

  getWidth(): any{
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
      // {text: 'Анкеты 2 ур.', dataField: '', width: 120},
      // {text: 'Анкеты 3 ур', dataField: '', width: 120},
      {text: 'Баллы', dataField: 'totalAccountedScoring', width: 120}

    ];

  ready = (): void => {
    this.myTreeGrid.expandRow(2);
    document.addEventListener('contextmenu', event => event.preventDefault());
  };

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

}
