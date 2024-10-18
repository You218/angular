import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  setValue : boolean = false;
  cards = [{title:"Evaluation Report",
    tableHeaders: ["performance review", "goals", "feedback"]
  },
   {
    title : "Payroll report",
    tableHeaders: ["salary", "bonouses", "deduction", "overtime"],
   } ,
   {
    title : "Training & Development Report",
    tableHeaders: ["Training Program", "Certification", "skill assesments"],
   },
   {
    title : "Promotion date",
    tableHeaders: ["promotion Date", "Job title Change", "overtime"],
   } ,
  ]

  
  onClick(head : any){
    this.setValue = true;
    console.log(this.setValue);
  }
}
