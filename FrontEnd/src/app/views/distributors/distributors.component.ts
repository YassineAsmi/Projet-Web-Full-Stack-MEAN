import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Distributor } from './distributor-data';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DistributorsService } from '../../_Services/distributors.service';
@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.scss']
})
export class DistributorsComponent implements OnInit {
  submitted = false;
  isDistributorAddFailed = false;
  currentIndex = -1;
  errorMessage = '';
  @Input() viewMode = false;
  editForm!: FormGroup;
  @Input()  currentDistributor: Distributor = {
    id: '',
    last_name: '',
    name: '',
    tel: '',
    address: ''
  };
  Distributor: any = [];
  @Input() DistributorEdit: Distributor = {
    id: '',
    last_name: '',
    name: '',
    tel: '',
    address: ''
  };
  @Input() distributorGet: Distributor = {};
  closeResult = '';
  constructor(private modalService: NgbModal,private distributorService:DistributorsService,private fb: FormBuilder) { }
  
  setActiveDist(Distributors: Distributor, index: number): void {
    this.currentDistributor = Distributors;
    this.currentIndex = index;
  }
  ngOnInit(): void {
    
    if (!this.viewMode) {
      this.getDistibutors();
    }
    this.editForm = this.fb.group({
      id: [''],
      last_name: ['', Validators.required],
      name: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required]
    });
  }
  //get all clients
  getDistibutors(): void {
    this.distributorService.getAllDistibutor()
    .subscribe(
      (data:any)=> {
        this.distributorGet = data;
        this.currentDistributor = data;
        console.log(data);
      },
      (      error: any) => {
        console.log(error);
      });
    }
// Add new Distibutor  
saveDistrib(): void {
  const data = {
    last_name: this.Distributor.last_name,
    name: this.Distributor.name,
    tel: this.Distributor.tel,
    address: this.Distributor.address
  }= this.Distributor
  this.distributorService.createDistibutor(data.last_name, data.name, data.tel, data.address)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
}
  //delete Distributor
  deleteDistrib(id: any): void {
    console.log(id) ;
    this.distributorService.deleteDistibutor(id)
      .subscribe(
        response => {
          console.log(response);
          this.getDistibutors();
        },
        error => {
          console.log(error);
        });
  }
  //update client
updateDistrib(id:any): void {
  this.distributorService.updateDistibutor(id, this.DistributorEdit)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.getDistibutors();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      });
}
// for modal open edit Distributors
openEdit(modalEditDistributor : any,cle:any) {

  this.DistributorEdit=cle;

  console.log("this is client edit ",this.DistributorEdit);
 this.modalService.open(modalEditDistributor, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }
  , (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  }
  );
  this.editForm.patchValue({
    _id: this.DistributorEdit.id,
    last_name: this.DistributorEdit.last_name,
    name: this.DistributorEdit.name,
    tel: this.DistributorEdit.tel,
    address: this.DistributorEdit.address
  });
}
  // for modal open add client
  open(modalAddDistributor : any,) {
    this.modalService.open(modalAddDistributor, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        
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

function subscribe(arg0: (Response: any) => void, arg1: (error: any) => void) {
  throw new Error('Function not implemented.');
}

