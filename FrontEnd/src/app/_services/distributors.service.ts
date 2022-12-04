import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const DISTRIBUTER_API = 'http://localhost:5050/api/distributors/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DistributorsService {

  constructor(private http: HttpClient) { }
  
  getAllDistibutor(): Observable<any> {
    return this.http.get(DISTRIBUTER_API, httpOptions);
  }
  getOneDistibutor(id:any): Observable<any> {
    return this.http.get(`${DISTRIBUTER_API}/${id}`,httpOptions);
  }
  deleteDistibutor(id:any):Observable<any>{
    return this.http.delete( `${DISTRIBUTER_API}/${id}`,httpOptions);
  }
  updateDistibutor(id:any, data:any):Observable<any>{
    return this.http.put(`${DISTRIBUTER_API}/${id}`,data,httpOptions);
  }
  createDistibutor(last_name:string,name:string,tel:string,address:string):Observable<any>{
    return this.http.post(DISTRIBUTER_API,{last_name,name,tel,address},httpOptions);
  }
}
