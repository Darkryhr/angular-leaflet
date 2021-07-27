import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShapesService {
  constructor(private http: HttpClient) {}

  getStateShapes() {
    return this.http.get('/assets/data/usa-outlines.json');
  }
}
