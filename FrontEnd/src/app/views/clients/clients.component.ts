import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Client } from './client-data';
import { ClientService } from '../../_Services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  closeResult = '';
  submitted = false;
  isClientAddFailed = false;
  errorMessage = '';
  currentIndex = -1;
  @Input() viewMode = false;
  editForm!: FormGroup;
  @Input()  currentclient: Client = {
    _id: '',
    last_name: '',
    name: '',
    tel: '',
    email: '',
    address: ''
  };
  client: any = [];
 @Input() clientEdit: Client = {
    _id: '',
    last_name: '',
    name: '',
    tel: '',
    email: '',
    address: ''
  };
  @Input() clientGet: Client = {};
  constructor(private modalService: NgbModal,private clientService:ClientService,private fb: FormBuilder) { }

  ngOnInit(): void {

    if (!this.viewMode) {
      this.getAllClients();
    }
    this.editForm = this.fb.group({
      _id: [''],
      last_name: ['', Validators.required],
      name: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });

    console.log("this is client edit az",this.clientEdit);
  }


  newUser(): void {
    this.submitted = false;
    this.client = {
      last_name: null,
      name: null,
      tel: null,
      email: null,
      address: null
    };
  }

  // Add new client
  saveClient(): void {
    const { last_name,name,tel,email,address } = this.client;
    console.log("this is address ",address);
    this.clientService.createClient(last_name,name,tel,email,address).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.isClientAddFailed = false;
        this.getAllClients();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isClientAddFailed = true;
      });
  }
  setActiveClient(clients: Client, index: number): void {
    this.currentclient = clients;
    this.currentIndex = index;
  }
//get all clients
getAllClients(): void {
  this.clientService.getAllClients()
    .subscribe(
      data => {
        this.clientGet = data;
        this.currentclient = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}
//delete client
deleteClient(id: any): void {
  this.clientService.deleteClient(id)
    .subscribe(
      response => {
        console.log(response);
        this.getAllClients();
      },
      error => {
        console.log(error);
      });
}
//update client
updateClient(id:any): void {
  this.clientService.updateClient(id, this.clientEdit)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.getAllClients();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      });
}
//refresh list
refreshList(): void {
  this.getAllClients();
  this.currentIndex = -1;
}
// for modal open edit client
openEdit(modalEditClient : any,cle:any) {

  this.clientEdit=cle;

  console.log("this is client edit ",this.clientEdit);
 this.modalService.open(modalEditClient, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }
  , (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  }
  );
  this.editForm.patchValue({
    _id: this.clientEdit._id,
    last_name: this.clientEdit.last_name,
    name: this.clientEdit.name,
    tel: this.clientEdit.tel,
    email: this.clientEdit.email,
    address: this.clientEdit.address
  });
}
// for modal open add client
open(modalAddClient : any,) {
  this.modalService.open(modalAddClient, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
      this.newUser();
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );

}
//for modal dismiss
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
