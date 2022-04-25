import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { API_HOST } from '../../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {
  constructor(private http: HttpClient) {
  }

  get(url: string): Observable<any> {
      return new Observable((observer: Subscriber<any>) => {
          let objectUrl: string = null;

          this.http
              .get(url, {
                headers: null,
                responseType: 'blob'
              })
              .subscribe((m: Blob) => {
                  objectUrl = URL.createObjectURL(m);
                  observer.next(objectUrl);
              });

          return () => {
              if (objectUrl) {
                  URL.revokeObjectURL(objectUrl);
                  objectUrl = null;
              }
          };
      });
  }
}
