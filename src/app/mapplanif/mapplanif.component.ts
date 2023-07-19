import { Component ,AfterViewInit, OnInit, Input, ElementRef} from '@angular/core';
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
import { GeometrieService } from '../Services/geometrie.service';
import { Geometrie } from '../models/geometrie';
import * as L from 'leaflet';
import { DatasService } from '../Services/datas.service';
import { GeoJSON } from 'leaflet';
import { LineString } from 'ol/geom';
import { Projet,Details,Geomprojetdetails,Geomid} from '../models/projet';
import { ProjetService } from '../Services/projet.service';
import { AppComponent } from '../app.component';
import { Router,NavigationExtras } from '@angular/router';
import { TacheService } from '../Services/tache.service';



 
@Component({
  selector: 'app-mapplanif',
  templateUrl: './mapplanif.component.html',
  styleUrls: ['./mapplanif.component.css']
})

export class MapplanifComponent implements AfterViewInit{
 
   private map: any
    geom : any
    tab  : any[] = []
    geometries : Geometrie []=[]
    projets : Geomprojetdetails[]=[]
    detailsprojet:Geomprojetdetails[]=[]

    tabgeom :any []=[]
    projet :Projet={
    nom_projet : '' ,
    data_create : new Date,
    debut_projet: new Date,
    fin_projet:new Date,
    heure_ouverture:new Date,
    heure_fermeture: new Date,
    pr_fin:0,
    pr_debut:0,
    axe:'',
    voies:0,
    travaux:'',
    topobalisage:'',
    sens:''

   }
   pr_debut?:number
   pr_fin?:number
   dates?: Date[]
   nom?:string
   ouverture?:any
   fermeture?:any 
   nom_projet?:any
   debut_projet?:any
   fin_projet?:any
   Geomid?:Geomid[]
   lat:any
   long:any

    constructor ( private elementRef: ElementRef,private router:Router ,private projetservice : ProjetService, private appc :AppComponent, private tacheservice : TacheService ){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
    choix :string

    };
    this.nom=state.choix
    console.log('choix',this.nom) 
   }
   
   lineStringArray = []
  
   ngAfterViewInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state as { choix: string };

    if (state) {
      this.nom = state.choix;
      console.log('choix', this.nom);
  }
   
    
    console.log('dygfyzy'+this.nom)
    if(this.nom !=null)
    {
      // this.projetservice.Projet(this.nom).subscribe(response =>{
      //   this.projet=response
      // })
      
      this.projetservice.Geomdetails(this.nom).subscribe(response =>{
        console.log('projetdetails',response)
     
        const geom=response.map(item => item.geometrie)
        this.ouverture=response[0].heure_ouverture
        this.fermeture=response[0].heure_fermeture
        this.nom_projet=response[0].nom
        this.debut_projet=response[0].debut_projet
        this.fin_projet=response[0].fin_projet
        const parsedGeom = JSON.parse('['+geom+']') //pour le transformer json valide
        this.projets=parsedGeom
        
        this.tabgeom=this.projets
        
        this.lat=this.tabgeom[0].coordinates[0][0][0] 
        this.long=this.tabgeom[0].coordinates[0][0][1] 
        console.log('eeeeeeeeee',this.long )

        console.log('tabgei',this.tabgeom)

        this.projets=response
        this.projets.forEach(item =>{
          item.geometrie=JSON.parse('['+ item.geometrie+']')
          
        })
        console.log('erft',this.projets)
       this.tab= this.projets
       this.initMap();
       this.initStatesLayer();
     
     });
    }
   
       }

   
initMap(): void {
    this.map = L.map('map', {
      center: [this.long, this.lat],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 23,
      minZoom: 12,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  
}




   initStatesLayer() {
   const stateLayer = L.geoJSON(this.tabgeom, {
        style: (feature) => ({
        weight: 3,
        opacity: 1,
        color: 'blue',
        fillOpacity: 0.8,
        fillColor: 'blue'
      }),
   
        });
   
   this.map.addLayer(stateLayer)
   
  }
  getDatesBetween(startDate: Date, endDate: Date): Date[] {
    const dates = [];
    const currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  }

  openNav() {
  
    const mySidenav = document.getElementById("mySidenav");
    if (mySidenav !== null ) {
    mySidenav.style.width = "800px";
  
    // this.elementRef.nativeElement.ownerDocument
    //         .body.style.backgroundColor ="rgba(0,0,0,0.4)";
  }
  }
  
   closeNav() {
    const mySidenav = document.getElementById("mySidenav");
    if (mySidenav !== null) {
      mySidenav.style.width = "0";
    }
  }
  
  selected(id: number) {
    this.projets.forEach(item => {
     
        if(item.id == id ){
        this.projetservice.GeomId(id).subscribe(response =>{
        
          const details=JSON.parse(JSON.stringify(response))
            
          console.log('id geom',details)
          
          const debut= details.debut_projet
          const fin =details.fin_projet
          console.log('fin',fin)
          
         
          if (debut && fin) {
            this.dates = this.getDatesBetween(new Date(debut), new Date(fin));
          }
             this.openNav()
        });
        
      }
    })
   
    
  
    }
    returnpage(){
      const navigationExtras: NavigationExtras = {
     
      queryParams: { reload: true } 
    }
     this.router.navigateByUrl('/', { skipLocationChange: true }) 
     .then(() => this.router.navigate(['/app'], navigationExtras));
    }
    
    }
  
  
  // this.projetservice.setMapInitialized(false);
    // const navigationExtras: NavigationExtras = {
    //   state: {     
    //      choix:item
    //   },
    //   queryParams: { reload: true } 
    // }
    //  this.router.navigateByUrl('/', { skipLocationChange: true }) 
    //  .then(() => this.router.navigate(['/maptache'], navigationExtras));
    // }
 