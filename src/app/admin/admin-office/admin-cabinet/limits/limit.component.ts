import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SurveyService} from '../../../../_services/survey.service';
import {Survey} from '../../../../_models/Survey';
import {Limit, LimitDTO} from '../../../../_models/limits';

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.css']
})
export class LimitComponent implements OnInit {

   public regions = ['Харьковская область', 'Херсонская область', 'Тернопольская область'];
   public gender = ['Мужской', 'Женский'];
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
   constructor(private formBuilder: FormBuilder,
               private surveyService: SurveyService) { }
   ngOnInit() {
     this.limitForm = this.formBuilder.group({anketa: '', region: '', gender: '', ageGroup: '', surveysCount: ''});
     this.surveyService.getList().subscribe(result => this.surveys = result);
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
     this.surveyLimit.survey = this.limitForm.controls.anketa.value
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

   }

}
