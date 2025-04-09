import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  locationApiV1BaseUrl = (window as any).__env?.LOCATIONV1_API_URL || '';
  coreServerUrl = (window as any).__env?.BACK_END_SERVER_URL || '';
}