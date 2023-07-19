import { Component } from '@angular/core';
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
import {routes} from '../app.routing.module'
import * as L from 'leaflet';
import { GeoJSON } from 'leaflet';
import { LineString } from 'ol/geom';
import { Projet,Details } from '../models/projet';
import { ProjetService } from '../Services/projet.service';

import { Router,NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newprojet',
  templateUrl: './newprojet.component.html',
  styleUrls: ['./newprojet.component.css']
})
export class NewprojetComponent {
  title = 'map_planif';
  opened=false;
  ProjetTab : Projet[]=[];
  projets :Projet[]=[]
  routes = routes
  selected?: string 
 


 
  public isCollapsed = true;
  
  
  constructor (private router : Router, private projetservice : ProjetService ){}

  data: any[] = [];
  ngOnInit(): void {
 
   this.projetservice.getprojet().subscribe(response =>{
 
      this.projets=response
    
  });

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
    
    };
 
    // }
  
  
  

