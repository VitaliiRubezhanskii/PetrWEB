import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.css']
})
export class LimitComponent implements OnInit {

   public regions = ['Харьковская область', 'Херсонская область', 'Тернопольская область'];
   public gender = ['Мужской', 'Женский'];
   public ageGroups = ['15 - 25', '25 - 35', '35 - 45', '45 - 55', '55 - 65', '65 - 75'];
   public limitForm: FormGroup;
   constructor(private formBuilder: FormBuilder) { }

   ngOnInit() {
     this.limitForm = this.formBuilder.group({region: '', gender: '', ageGroup: '', surveysCount: ''});
   }

   public groupChosen(ageGroup: string){
     console.log(ageGroup);
   }

   public saveLimits(){

   }

}
