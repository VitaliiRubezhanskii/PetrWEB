import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SurveyService} from '../../../../_services/survey.service';
import {Survey} from '../../../../_models/Survey';
import {Limit, LimitDTO} from '../../../../_models/limits';
import {LimitService} from '../../../../_services/limit.service';
import {User} from '../../../../_models';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PagerService} from '../../../../_services/pager.service';

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.css']
})
export class LimitComponent implements OnInit, AfterViewInit {

   public regions = ['Харьковская область', 'Херсонская область', 'Тернопольская область'];
   public gender = ['MALE', 'FEMALE'];
   public ageGroups = ['15 - 25', '25 - 35', '35 - 45', '45 - 55', '55 - 65', '65 - 75'];
   public selectedOption: string;
   public isChecked = false;
   public limitForm: FormGroup;
   public gendersChosen: string[] = [];
   public ageGroupsChosen: string[] = [];
   public surveyOption: Survey = new Survey();
   public surveyChosen: string;
   public regionChosen: string;
   public surveys: Survey[] = [];
   public surveyLimit: LimitDTO = new LimitDTO();
   public limit: Limit = new Limit();
   public limits: Limit[] = [];
   public pager: any = {};
   public pagedItems: any[];
   public allItems: any[];
   public displayedColumns = ['id', 'region', 'surveyName', 'gender', 'ageRange', 'count', 'matchedUsersCount', 'delete'];
   public dataSource = new MatTableDataSource<User>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   constructor(private formBuilder: FormBuilder,
               private pagerService: PagerService,
               private surveyService: SurveyService,
               private limitsService: LimitService) { }
   ngOnInit() {
     this.limitForm = this.formBuilder.group({anketa: '', region: '', gender: '', ageGroup: '', surveysCount: ''});
     this.surveyService.getList().subscribe(result => this.surveys = result);
     this.getAllLimits();
   }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   public groupChosen(ageGroup: string, event) {
     console.log(ageGroup);
     if (event.target.checked) {
       this.isChecked = true;
     } else {
       this.isChecked = false;
     }
     console.log(this.isChecked);
   }

   getAllLimits() {
     this.limitsService.getAllLimits().subscribe(
       data => {
         this.dataSource.data = data;
       }
     );
   }

   public getRegionChosen(region: string) {
    this.regionChosen = region;
    console.log(this.regionChosen);
   }
   public getSurveyChosen(survey: string) {
    this.surveyChosen = survey;
    console.log(survey);
  }

   public getGenderChosen(gender: string, event) {

     if (event.target.checked) {
       this.gendersChosen.push(gender);
       console.log(this.gendersChosen);
     } else {
       this.gendersChosen.splice(this.gendersChosen.indexOf(gender), 1);
       console.log(this.gendersChosen);
     }

   }
   public getAgeGroupsChosen(ageGroup: string, event) {
     if (event.target.checked) {
       this.ageGroupsChosen.push(ageGroup);
       console.log(this.ageGroupsChosen);
     } else {
       this.ageGroupsChosen.splice(this.ageGroupsChosen.indexOf(ageGroup), 1);
       console.log(this.ageGroupsChosen);
     }
   }

   public saveLimits() {
     console.log(this.limitForm.controls.anketa.value);
     this.surveyLimit.survey = this.limitForm.controls.anketa.value;
     this.surveyLimit.region = this.limitForm.controls.region.value;
     this.surveyLimit.gender = this.gendersChosen;
     this.surveyLimit.ageGroup = this.ageGroupsChosen;
     this.surveyLimit.countOfSurveys = this.limitForm.controls.surveysCount.value;
     console.log(this.surveyLimit);

     this.surveyLimit.gender.forEach(gender => {
       this.limit.region = this.surveyLimit.region;
       this.limit.survey = this.surveyLimit.survey
       this.limit.gender = gender;
       this.limits.push(this.limit);
     });

     this.surveyLimit.ageGroup.forEach(group => {
       this.limit.region = this.surveyLimit.region;
       // this.limit.survey = this.surveyLimit.survey
       // this.limit.gender = gender;
       this.limits.push(this.limit);
     });
     this.limitsService.saveLimits(this.surveyLimit, this.limitForm.controls.anketa.value).subscribe(() => {this.getAllLimits()});

   }
  public redirectToDetails = (id: string) => {
    console.log('Hello from details');

  }

  public redirectToUpdate = (id: string) => {
    console.log('Hello from update');
  }

  public redirectToDelete = (id: number) => {
    this.limitsService.deleteLimitForRegionAndSurvey(id).subscribe(() => {this.getAllLimits()});

  }
  setPage(page: number) {
    console.log(page)
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}
