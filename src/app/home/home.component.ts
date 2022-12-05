import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  newGoal: string;
  currentDate: string;
  goalstoday = [] as string [];
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  constructor(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = today.getMonth()
    var yyyy = today.getFullYear();

    this.currentDate = dd + ' , ' + this.monthNames[mm];
  }

ngOnInit(){
  document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        console.log("ADDED-GOAL")
    }
});
}

addGoal() {
  
  console.log("ADDED-GOAL-IN-ADD-GOAL")
}
}
