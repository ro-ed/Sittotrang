import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  newGoal: string;
  currentDate: string;
  goalstoday = [] as string[];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  today: any;
  activeDay: any;
  month: any;
  year: any;
  calendar: any;
  date: any;
  daysContainer: any;
  prev: any;
  next: any;

  constructor() {}

  ngOnInit() {
    document.addEventListener('keypress', function onEvent(event) {
      if (event.key === 'Enter') {
        console.log('ADDED-GOAL');
      }
    });

    this.today = new Date();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
    this.calendar = document.querySelector('.calendar');
    this.date = document.querySelector('.date') as Element;
    this.daysContainer = document.querySelector('.days');
    this.prev = document.querySelector('.prev');
    this.next = document.querySelector('.next');

    this.initCalendar(this.year, this.month, this.date);
  }

  addGoal() {
    console.log('ADDED-GOAL-IN-ADD-GOAL');
  }

  initCalendar(year: number, month: number, date: Element) {
    //to get prev month days and current month all days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //update date top of calendar
    date.innerHTML = this.months[month] + ' ' + year;

    //adding days on dom

    let days = '';

    //prev month days

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      //if day is today add class today
      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
      ) {
        days += `<div class="day today">${i}</div>`;

        //add remain as it is
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
    console.log('LAST DAY', lastDay.getDay());
    console.log('NEXT DAYS', nextDays);
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }

    this.daysContainer.innerHTML = days;
  }
}
