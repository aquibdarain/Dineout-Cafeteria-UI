import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { constant } from 'src/assets/constant';
import { ActivatedRoute } from '@angular/router';
import { Obj } from '@popperjs/core';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {

  time = constant.time
  No_of_person = constant.No_of_person

  reservationForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required]),
    noOfPerson: new FormControl(null,[Validators.required]),
    date: new FormControl('',[Validators.required]),
    time: new FormControl(null,[Validators.required]),
  })

  data: Obj = {}

  constructor(private router: Router, private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe((success:any)=>{
      console.log(success);
      let data = JSON.parse(success.params)
      this.data = data
      console.log(this.data['productName']);
      
      
    })
  }


  ngOnInit(): void {
  }

}
