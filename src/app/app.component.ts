import { Component, VERSION } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //email: FormControl; //nombre del formControl que representa un control individual

  buyTicketForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    /*Crear múltiples formularios usando FormGroup y FormControl puede ser muy largo y repetitivo
     this.buyTicketForm = new FormGroup({
      emailControl: new FormControl(null, [Validators.required]),
      phoneControl: new FormControl(null),
      address: new FormGroup({
        streetControl: new FormControl(),
        postalcodeControl: new FormControl(),
      }),
    }); */
    //refactorizar
    this.buyTicketForm = this.fb.group({
      emailControl: [null, [Validators.required]],
      phoneControl: [null],
      address: this.fb.group({
        streetControl: [],
        postalcodeControl: [],
      }),
      tickets: this.fb.array([this.createTicket()], Validators.required),
    });
  }

  buyTickets() {
    console.log('aqui');
    if (this.buyTicketForm.status == 'VALID') {
      console.log(this.buyTicketForm.value);
    }
  }

  createTicket(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      age: [null, Validators.required],
    });
  }

  get tickets(): FormArray {
    return <FormArray>this.buyTicketForm.get('tickets');
  }

  addTicket() {
    this.tickets.push(this.createTicket());
  }
}
//https://www.telerik.com/blogs/angular-basics-creating-dynamic-forms-using-formarray-angular
