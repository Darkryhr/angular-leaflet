import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient, private popupService: PopupService) {}

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (let capital of res.features) {
        const lon = capital.geometry.coordinates[0];
        const lat = capital.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.addTo(map);
      }
    });
  }

  makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      const maxPop = Math.max(
        ...res.features.map((x) => x.properties.population),
        0
      );
      for (let capital of res.features) {
        const lon = capital.geometry.coordinates[0];
        const lat = capital.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(
            capital.properties.population,
            maxPop
          ),
        });

        circle.bindPopup(
          this.popupService.makeCapitalPopup(capital.properties)
        );
        circle.addTo(map);
      }
    });
  }
}
