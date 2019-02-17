import {Component, OnInit, ViewChild} from '@angular/core';
import {SurveyResultService} from '../../_services/surveyResult.service';
import {SurveyResult} from '../../_models/SurveyResult';
import {User} from '../../_models';
import {jqxTreeGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';

@Component({
  selector: 'app-network-statistics',
  templateUrl: './network-statistics.component.html',
  styleUrls: ['./network-statistics.component.css']
})
export class NetworkStatisticsComponent implements OnInit {

  surveyResults: SurveyResult[] = [];
  @ViewChild('myTreeGrid') myTreeGrid: jqxTreeGridComponent;

  constructor(private surveyResultService: SurveyResultService ) { }

  ngOnInit() {
    this.surveyResultService.getSurveyResultsOfAll().subscribe(result => result.forEach(r => this.surveyResults.push(r)));
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
      ],
      hierarchy:
        {
          keyDataField: {name: 'id'},
          parentDataField: {name: 'parentId'}
        },
      id: 'id',
      url: 'http://localhost:8080/users/all/structure'


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

    ];

  ready = (): void => {
    this.myTreeGrid.expandRow(2);
  };

}
