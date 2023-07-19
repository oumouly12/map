import { Time } from "@angular/common";

export interface Projet {
    nom_projet : string ,
    data_create : Date,
    debut_projet: Date,
    fin_projet:Date;
    heure_ouverture: Date
    heure_fermeture: Date
    pr_fin:number,
    pr_debut:number,
    axe:string,
    voies:number,
    travaux:string,
    topobalisage:string,
    sens:string

}
export interface Details {
   nom_projet : string ,
   data_create : Date,
   id_tache :number,
   nom_tache: string,
   id_geom: number,
   debut_tache: Date,
   fin_tache: Date,
   libelle : string,
   geometrie : any,
   debut_projet: Date,
   fin_projet:Date;
   heure_ouverture: Time,
   heure_fermeture: Time,
   pr_fin:number,
   pr_debut:number,
   axe:string,
   voies:number,
   travaux:string,
   topobalisage:string,
   sens:string
}
export  interface Geomprojetdetails {
  nom:string,
  geometrie:any,
  id:number,
  debut_projet:Date,
  fin_projet:Date,
  heure_ouverture: Time,
  heure_fermeture: Time,
  axe:string,
  sens:string,
  travaux:string,
  topobalisage:string,
  pr_fin:number,
  pr_debut:number,
  voies:string,

}
export interface Geomid{
  axe: string,
  nom_projet: string,
  data_create:Date,
  debut_projet:Date,
  fin_projet: Date,
  heure_ouverture: Time,
  heure_Fermeture: Time,
  geomprojet: any,
  sens: number

  voies: string,
  travaux: string,
  pr_debut:number,
  pr_fin: number,
  topobalisage: string,
  idgeom: number
}