import { HttpClient } from '@angular/common/http';
import { Projet,Details ,Geomprojetdetails ,Geomid } from '../models/projet';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'


import { Nameproejet } from '../models/allprojet';
@Injectable({
  providedIn: 'root'
})
export class ProjetService {
urlgeom="http://localhost:5171/api/GeomProjet?nom="
urldetailsgeom="http://localhost:5171/api/Projet/api/Projet/Geomdetails"
urlpost ="http://localhost:5171/api/Projet/api/Projet/Saveprojet";
urlget="http://localhost:5171/api/Projet";
projetdet="http://localhost:5171/api/Projet/api/Projet/ProjetDetails";
urprojet ="http://localhost:5171/api/Projet/api/Projet/GetTnomprojet/"
urrlidgeom="http://localhost:5171/api/Projet/api/Projet/Geomiddetail"
private isMapInitialized: boolean = false;


  constructor( private http : HttpClient) { }

  GeomId(id : number) :Observable<Geomid>{
    return this.http.get<Geomid>(this.urrlidgeom+'/'+id);
  }

  Geomprojet(nom :string):Observable<any>{
    this.urlgeom=this.urlgeom+nom
    return this.http.post<any>(this.urlgeom,'');
  }

  Geomdetails(nom : string):Observable<Geomprojetdetails[]>{
    return this.http.get<Geomprojetdetails[]>(this.urldetailsgeom+'/'+nom)
  }


  getprojet() : Observable<Projet[]> {
    return this.http.get<Projet[]>(this.urlget)
   }
   Postprojet(projet :Projet) : Observable<Projet> {
  
    return this.http.post<Projet>(this.urlpost , projet );

  }
ProjetDetails(nom :string):Observable<Details[]>{
  return this.http.get<Details[]>(this.projetdet+'/'+nom);
}
Projet(nom :string):Observable<Projet>{
  return this.http.get<Projet>(this.projetdet+'/'+nom);
}


setMapInitialized(value: boolean) {
  this.isMapInitialized = value;
}

getMapInitialized(): boolean {
  return this.isMapInitialized;
}

}