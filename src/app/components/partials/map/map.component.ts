import { Component, ElementRef, OnInit, ViewChild, PLATFORM_ID, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker } from 'leaflet';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LocationService } from '../../../services/location.service';
import { Order } from '../../../shared/models/Order';
@Component({
  selector: 'map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnChanges{
  @Input() order!:Order;
  @Input() readonly = false;
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62]
  @ViewChild('map', {static:true}) mapRef!: ElementRef;
  map!:Map
  private readonly MARKER_ZOOM_LEVEL = 16
  MARKER_ICON!:any
  currentMarker!: Marker
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private locationService: LocationService){   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.order) return

    if (isPlatformBrowser(this.platformId)) {
      this.initiallizeMap();
      this.addMarker();
    }

    if(this.readonly && this.addressLatLng){
      this.showLocationOnReadonlyMode();
    }
  }
  showLocationOnReadonlyMode() {
   
    import('leaflet').then(leaflet => {
      const m = this.map;
     this.setMarker(this.addressLatLng);
     m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

     m.dragging.disable();
     m.touchZoom.disable();
     m.doubleClickZoom.disable();
     m.scrollWheelZoom.disable();
     m.boxZoom.disable();
     m.keyboard.disable();
     m.off('click');
     m.tap?.disable();
     if (this.currentMarker)  this.currentMarker.dragging?.disable();
    }).catch(error => {
      console.error('Error loading Leaflet', error);
    });
  }
  
  
  initiallizeMap(){
    if(this.map) return;

    import('leaflet').then(leaflet => {
      this.map = leaflet.map(this.mapRef.nativeElement, {
        attributionControl: false
      }).setView(this.DEFAULT_LATLNG, 1);

      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      this.map.on('click', (e:LeafletMouseEvent)=>{
        this.setMarker(e.latlng);
      })
    }).catch(error => {
      console.error('Error loading Leaflet', error);
    });
  }

  addMarker(): void {
    import('leaflet').then(leaflet => {
      this.MARKER_ICON = leaflet.icon({
        iconUrl:
          'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
        iconSize: [42, 42],
        iconAnchor: [21, 42],
      });
    }).catch(error => {
      console.error('Error loading Leaflet', error);
    });
  
  }

  setMarker(latlng:LatLngExpression){
    import('leaflet').then(leaflet => {
      this.addressLatLng = latlng as LatLng;
      if(this.currentMarker){
        this.currentMarker.setLatLng(latlng);
        return
      }
     this.currentMarker = leaflet.marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
     }).addTo(this.map);

     this.currentMarker.on('dragend', ()=> {
      this.addressLatLng = this.currentMarker.getLatLng();
     })
    }).catch(error => {
      console.error('Error loading Leaflet', error);
    });
  }

  findMyLocation():void{
    this.locationService.getCurrentLocation().subscribe({
      next: (latLng) => {
        import('leaflet').then(leaflet => {
          this.map.setView(latLng, this.MARKER_ZOOM_LEVEL);
          this.setMarker(latLng);
        }).catch(error => {
          console.error('Error loading Leaflet', error);
        });
      
      }
    })
  }

  set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed) return;
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }
}
