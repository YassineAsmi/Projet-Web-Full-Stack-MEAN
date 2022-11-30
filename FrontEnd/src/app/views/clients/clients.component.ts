import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Client } from './client-data';
import { ClientService } from '../../_Services/client.service';

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
  client: any = [];
  @Input() clientGet: Client = {};
  constructor(private modalService: NgbModal,private clientService:ClientService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.getAllClients();
    }
  }
  newUser(): void {
    this.submitted = false;
    this.client = {
      username: null,
      email: null,
      password: null
    };
  }

  // Add new client
  saveClient(): void {
    const { last_name,name,tel,adresse } = this.client;
    this.clientService.createClient(last_name,name,tel,adresse).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.isClientAddFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isClientAddFailed = true;
      });
  }
//get all clients
getAllClients(): void {
  this.clientService.getAllClients()
    .subscribe(
      data => {
        this.clientGet = data;
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
  this.clientService.updateClient(id, this.clientGet)

    .subscribe(
      response => {
        console.log(response);
        this.getAllClients();
      },
      error => {
        console.log(error);
      });
}
//refresh list
refreshList(): void {
  this.getAllClients();
  this.currentIndex = -1;
}
// set Active client
setActiveClient(client: Client, index: number): void {
  this.clientGet = client;
  this.currentIndex = index;
}
// for modal open
open(modalAddClient : any) {
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
