import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from '../../_services';
import { MatSort, MatPaginator } from '@angular/material';
import { User} from '../../_models';
import { jqxTreeGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';
import {jqxWindowComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';
import {jqxInputComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxinput';
import {jqxDateTimeInputComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import {Address} from '../../_models/address';


@Component({
  selector: 'app-admin',
  templateUrl: './orgstructure.component.html',
  styleUrls: ['./orgstructure.component.css']
})
export class OrgstructureComponent implements OnInit {
  @ViewChild('editUserForm')
  editUserFormRef: TemplateRef<any>
  users: any [] = [];
  user: User;
   userDto: User = new User();
   addressDto: Address = new Address();
  types: string[] = ['photo', 'inn', 'pass_first', 'pass_second', 'pass_last'];
  type: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myTreeGrid') myTreeGrid: jqxTreeGridComponent;
  @ViewChild('jqxWindow') jqxWindow: jqxWindowComponent;
  @ViewChild('id') id: jqxInputComponent;
  @ViewChild('Name') name: jqxInputComponent;
  @ViewChild('MiddleName') middleName: jqxInputComponent;
  @ViewChild('Surname') surname: jqxInputComponent;
  @ViewChild('Email') email: jqxInputComponent;
  @ViewChild('Phone') phone: jqxInputComponent;
  @ViewChild('Status') status: jqxInputComponent;
  @ViewChild('Oblast') oblast: jqxInputComponent;
  @ViewChild('City') city: jqxInputComponent;
  @ViewChild('Street') street: jqxInputComponent;
  @ViewChild('BuildingNum') building: jqxInputComponent;
  @ViewChild('ApartmentNum') apartment: jqxInputComponent;
  @ViewChild('Address') address: jqxInputComponent;
  @ViewChild('BirthDate') birthDate: jqxDateTimeInputComponent;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsersStructure().subscribe(data => data.forEach(u => {
      this.users.push(u);
    }));
    console.log(this.users);
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
        {name: 'oblast', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'street', type: 'string'},
        {name: 'building', type: 'string'},
        {name: 'apartment', type: 'string'},
      ],
      hierarchy:
        {
          keyDataField: {name: 'id'},
          parentDataField: {name: 'parentId'}
        },
      id: 'id',
      url: 'http://localhost:8080/users/all/structure'


    };

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '200%';
    }

    return 1100;
  }

  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] =
    [{text: 'id', dataField: 'id', editable: false, width: 200},
      {text: 'Имя', dataField: 'name', width: 200},
      {text: 'Отчество', dataField: 'middleName', width: 150},
      {text: 'Фамилия', dataField: 'surname', width: 160},
      {text: 'Телефон', dataField: 'phone', width: 120},
      {text: 'Email', dataField: 'email', width: 120},
      {text: 'Область', dataField: 'oblast', width: 120},
      {text: 'Город', dataField: 'city', width: 120},
      {text: 'Улица', dataField: 'street', width: 120},
      {text: 'Дом', dataField: 'building', width: 120},
      {text: 'Квартира', dataField: 'apartment', width: 120},
      {text: 'Руководитель', dataField: 'parentId', width: 120},

    ];

  ready = (): void => {
    this.myTreeGrid.expandRow(2);
  };

  dataRow: any = null;
  rowDoubleClick(event: any): void {
    console.log(event);
    let args = event.args;
    let key = args.key;
    let row = args.row;
    this.jqxWindow.setTitle('Edit Row: ' + row.id);
    this.jqxWindow.open();
    this.dataRow = key;
    this.id.val(row.id);
    this.name.val(row.name);
    this.middleName.val(row.middleName);
    this.surname.val(row.surname);
    this.email.val(row.email);
    this.phone.val(row.phone);
    this.status.val(row.status);
    this.birthDate.val(row.birthDate);
    this.oblast.val(row.oblast);
    this.city.val(row.city);
    this.street.val(row.street);
    this.building.val(row.building);
    this.apartment.val(row.apartment);
    this.myTreeGrid.disabled(true);
  };

  clickCancel(): void {
    this.jqxWindow.close();
  }

  clickSave(): void {
    this.jqxWindow.close();

    this.userDto.id = this.id.val();
    this.userDto.name = this.name.val();
    this.userDto.middleName = this.middleName.val();
    this.userDto.surname = this.surname.val();
    this.userDto.email = this.email.val();
    this.userDto.phone = this.phone.val();
    this.userDto.deleted = this.status.val();
    this.userDto.birthDate = this.birthDate.val();
    this.addressDto.oblast = this.oblast.val();
    this.addressDto.city = this.city.val();
    this.addressDto.street = this.street.val();
    this.addressDto.buildingNum = this.building.val();
    this.addressDto.apartmentNum = this.apartment.val();
    this.user.address = this.addressDto;
    this.userService.editUser(this.userDto).subscribe(() => {
      console.log('editing user');
    });
  }

  windowClose(): void {
    this.myTreeGrid.disabled(false);
  }

  excelExportClick(): void {
    this.myTreeGrid.exportData('xls');
  };

}



