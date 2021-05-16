import { Component, OnInit } from '@angular/core';
import {FormControl,Validators,FormGroup,FormBuilder} from '@angular/forms'
import { EmployeeService } from '../appServices/employee.service';
import { HttpClient } from '@angular/common/http';
// import { Employee } from '../appModels/employee.model';
import{Employee} from "../appModals/employee.model"

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
empForm:FormGroup;
showModal:number=0;
// editMode:boolean=false;
editMode:number=0;
employees:Employee[];

  constructor(private fb:FormBuilder,
     private empService:EmployeeService,
     private http: HttpClient ,) { 
    this.empForm=this.fb.group({
      _id:[''],
      name:['Ex.Divyek Sisodiya',Validators.required],
      position:['Full Stack',Validators.required],
      dept:['Development']
    })
  } 


  ngOnInit(): void {
    this.getEmployees();  
  }
  get name() {
    return this.empForm.get('name');
  }
  get position() {
    return this.empForm.get('position');
  }

  getEmployees()
  {
    this.empService.getEmployeeList().subscribe((res:Employee[])=>{
      console.log(res);
      this.employees=res;
    })
  }

  onDeleteEmployee(id)
  {
    if(confirm('Do you want to delete this employee?')){
      this.empService.deleteEmployee(id).subscribe(
        (res)=>{
          console.log("delete employee");
          this.getEmployees(); 
        },
        (err)=>{
          console.log(err);
        },
      
      );
    }
    
  }

  onEditEmployee(emp)
  {
    this.showModal++;
    this.editMode++;
    this.empForm.patchValue(emp);

  }

  onEmpSubmit(){
    console.log("yes");
    if(this.empForm.valid)
    {
      if(this.editMode==1)
      {
        this.empService.updateEmployee(this.empForm.value).subscribe(
          (res)=>{
            console.log(res);
            this.getEmployees();  
          },
          (err)=>{
            console.log(err);
          },
        
        );
      }
      else{
        console.log(this.empForm.value);
      this.empService.addEmployee(this.empForm.value).subscribe(
        (res)=>{
          console.log(res);
          this.getEmployees();  
        },
        (err)=>{
          console.log(err);
        },
      
      );
     

      }
       
      this.empForm.reset({
        name:"Divyek ",
        position:"full Stack",
        dept:"Delelopment"


      });
      this.onCloseModal();
    }
   
  }

  onAddEmployee()
  
  {
    this.showModal++;
    console.log("joo");
  }

  onCloseModal()
  {
    this.showModal=0;
    this.editMode++;
  }

}
