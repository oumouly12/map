import { Component ,AfterViewInit, OnInit} from '@angular/core';
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import ZoomToExtent from "ol/control/ZoomToExtent";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import { Fill, Stroke, Style } from "ol/style";
 import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";
import olLayerVector from 'ol/layer/Vector';
import {routes} from './app.routing.module'
import * as L from 'leaflet';
import { GeoJSON } from 'leaflet';
import { LineString } from 'ol/geom';
import { Projet,Details } from './models/projet';
import { ProjetService } from './Services/projet.service';
import { Router,NavigationExtras,NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FileexcelComponent } from './fileexcel/fileexcel.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MapplanifComponent } from './mapplanif/mapplanif.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent implements OnInit ,AfterViewInit  {
  modalRef: MdbModalRef<FileexcelComponent> | null = null;
  isHomePage: boolean = false;
  title = 'map_planif';
  opened=false;
  ProjetTab : Projet[]=[];
  projets :Projet[]=[]
  routes = routes
  selected?: string 
 
  projet:Projet={
    nom_projet : '' ,
    data_create :new Date,
    debut_projet: new Date,
    fin_projet: new Date,
    heure_ouverture: new Date,
    heure_fermeture: new Date,
    pr_fin:0,
    pr_debut:0,
    axe:'',
    voies:0,
    travaux:'',
    topobalisage:'',
    sens:''
  }
  // private map:any;
  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: [ 39.8282, -98.5795 ],
  //     zoom: 3
  //   });

  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     minZoom: 3,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });

  //   tiles.addTo(this.map);
  // }

 
  public isCollapsed = true;
  
  
  constructor (private router : Router, private projetservice : ProjetService ,private modalService: MdbModalService,public dialog: MatDialog){}

  data: any[] = [];
  ngOnInit(): void {
 
   this.projetservice.getprojet().subscribe(response =>{
 
      this.projets=response
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isHomePage = event.url === '/';
        }
      });
  });

  }

  ngAfterViewInit(): void {
    // this.initMap();
  }
   onSelected(item: string) {
  
    this.projetservice.setMapInitialized(false);
    const navigationExtras: NavigationExtras = {
      state: {     
         choix:item
      },
      // queryParams: { reload: true } 
    }
     this.router.navigateByUrl('/', { skipLocationChange: true }) 
     .then(() => this.router.navigate(['/mapplanif'], navigationExtras));
    }

    openDialog() {
      const dialogRef = this.dialog.open(FileexcelComponent)};
  
      openMap(nom :string){
  
      }
  
}

    
 
    
  
  
  