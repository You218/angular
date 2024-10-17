import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { idTakenValidator } from './id-validator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  deleteIcon = '../../assets/icons8-delete.svg'
  registrationForm: FormGroup;
  registeredData: any[] = [];
  idValid : boolean = false;
  constructor(private fb: FormBuilder, private apiService: ApiserviceService) {
    this.registrationForm = this.fb.group({
      id: [null, [Validators.required, idTakenValidator] ],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.apiService.registeredData$.subscribe(data => {
      this.registeredData = Array.isArray(data) ? data : [];
      console.log('Registered Data:', this.registeredData);
    });

    this.apiService.getUserData().subscribe(
      data => {
        this.apiService.updateRegisteredData(data);
      },
      error => console.error('Error fetching user data:', error)
    );
  }

  deleteReg(data : any){
    this.apiService.deleteRecordById(data.id);
    //console.log(data)
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;
      const isIdTaken = this.isIdAlreadyTaken(formValue.id);
      if (isIdTaken) {
        //alert('This ID is already taken or has been deleted. Please choose a different ID.');
        this.idValid = true;
        return;
      }
      const newUser = {
        id: formValue.id,
        name: formValue.name,
        email: formValue.email,
        address: {
          street: formValue.address,
          suite: '',
          city: '',
          zipcode: ''
        }
      };
      console.log('New user data:', newUser);


      this.apiService.updateRegisteredData([...this.registeredData, newUser]);

      this.registrationForm.reset();
    }
  }

  isIdAlreadyTaken(id: string): boolean {
    const isRegistered = this.registeredData.some(item => item.id === id);
    const isDeleted = this.apiService.getDeletedIds().includes(id);
    return isRegistered || isDeleted;
  }
  getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : '', obj);
  }
}
