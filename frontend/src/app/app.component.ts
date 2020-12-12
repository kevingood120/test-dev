import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Task } from './app.interface'
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.findAll()
  }

  taskForm = new FormGroup({
    desc: new FormControl('', Validators.required),
    done: new FormControl(false),
    id: new FormControl(null)
  })

  tasks: Task[] = []

  save() {
    if(this.taskForm.valid) {
      const id = this.taskForm.value.id
      this.appService[id ? 'update' : 'create'](this.taskForm.value).subscribe(task => {
        this.findAll()
        this.taskForm.reset()
      })
    }
    else {
      this.validateAllFormFields(this.taskForm)
    }
  }

  edit(item: Task) {
    this.taskForm.setValue(item)
  }

  remove(id: number | undefined) {
    if(id) {
      this.appService.remove(id).subscribe(task => {
        this.findAll()
      })
    }
  }

  clear() {
    this.taskForm.reset()
  }

  findAll() {
    this.appService.findAll().subscribe(tasks => {
      this.tasks = tasks
    })
  }


  get requiredDesc() {
    const descControl = this.taskForm.get('desc')
    return descControl?.hasError('required') && descControl.touched
  }

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {          
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {       
        this.validateAllFormFields(control);            
      }
    });
  }

}
