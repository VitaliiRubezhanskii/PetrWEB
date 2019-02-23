import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SurveyResultService} from '../../../../_services/surveyResult.service';
import {UserService} from '../../../../_services';
import {User} from '../../../../_models';
import {SurveyResult} from '../../../../_models/SurveyResult';
import {Answer, Question} from '../../../../_models/question';
import {jqxTreeGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';
import {jqxMenuComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {

  user: User = new User();
  answers: Answer[] = [];
  surveyResults: SurveyResult[];
  constructor(private http: HttpClient,
              private surveyResultService: SurveyResultService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getByUsername(localStorage.getItem('username')).subscribe(result => {
      this.user = result;
    });
  }
  @ViewChild('TreeGrid') treeGrid: jqxTreeGridComponent
  getWidth() : any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }
  data: any[] = [
    {
      'id': '1', 'name': 'Corporate Headquarters', 'budget': '1230000', 'location': 'Las Vegas',
      'children':
        [
          {
            'id': '2', 'name': 'Finance Division', 'budget': '423000', 'location': 'San Antonio',
            'children':
              [
                { 'id': '3', 'name': 'Accounting Department', 'budget': '113000', 'location': 'San Antonio' },
                {
                  'id': '4', 'name': 'Investment Department', 'budget': '310000', 'location': 'San Antonio',
                  'children':
                    [
                      { 'id': '5', 'name': 'Banking Office', 'budget': '240000', 'location': 'San Antonio' },
                      { 'id': '6', 'name': 'Bonds Office', 'budget': '70000', 'location': 'San Antonio' },
                    ]
                }
              ]
          },
          {
            'id': '7', 'name': 'Operations Division', 'budget': '600000', 'location': 'Miami',
            'children':
              [
                { 'id': '8', 'name': 'Manufacturing Department', 'budget': '300000', 'location': 'Miami' },
                { 'id': '9', 'name': 'Public Relations Department', 'budget': '200000', 'location': 'Miami' },
                { 'id': '10', 'name': 'Sales Department', 'budget': '100000', 'location': 'Miami' }
              ]
          },
          { 'id': '11', 'name': 'Research Division', 'budget': '200000', 'location': 'Boston' }
        ]
    }
  ];
  source: any =
    {
      dataType: 'json',
      dataFields: [
        { name: 'userFullName', type: 'string' },
        { name: 'surveyName', type: 'string'},
        { name: 'surveySubmissionDate', type: 'string' },
        { name: 'questionResultDtos', type: 'array' },
        { name: 'questionText', type: 'string' },
        { name: 'responseOption', type: 'string' },
      ],
      hierarchy:
        {
          root: 'questionResultDtos'
        },
      // localData: this.data,
      id: 'id',
      url: 'http://localhost:8080/scoring/users/responses'
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] = [
    { text: "ФИО", align: "center", dataField: "userFullName", width: 350 },
    { text: "Анкета", cellsAlign: "center", align: "center", dataField: "surveyName", cellsFormat: "c2", width: 300 },
    { text: "Отправлен", dataField: "surveySubmissionDate", cellsAlign: "center", align: "center" }
  ];
  ready(): void {
    this.treeGrid.expandRow(1);
    this.treeGrid.expandRow(2);
  }
  excelExportClick(): void {
    this.treeGrid.exportData('xls');
  };
}
