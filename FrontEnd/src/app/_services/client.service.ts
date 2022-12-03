import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const CLIENT_API = 'http://localhost:5050/api/clients/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any> {
    return this.http.get(CLIENT_API, httpOptions);
  }
  getOneClient(id:any): Observable<any> {
    return this.http.get(`${CLIENT_API}/${id}`,httpOptions);
  }
  deleteClient(id:any):Observable<any>{
    return this.http.delete( `${CLIENT_API}/${id}`,httpOptions);
  }
  updateClient(id:any, data:any):Observable<any>{
    return this.http.put(`${CLIENT_API}/${id}`,data,httpOptions);
  }
  createClient(last_name:string,name:string,tel:string,email:string,address:string):Observable<any>{
    return this.http.post(CLIENT_API,{last_name,name,tel,email,address},httpOptions);
  }
}
