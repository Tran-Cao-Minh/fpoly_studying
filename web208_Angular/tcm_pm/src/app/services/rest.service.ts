import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export default class HttpService {
  // static baseUrl: string = 'http://localhost:3000/';
  private _baseUrl: string = 'http://localhost:3000/';

  constructor(
    private _http: HttpClient,
  ) { }

  public get(endpoint: String) {
    return this._http.get(`${this._baseUrl}${endpoint}`);
  }

  // static async get(endpoint: String) {
  //   const response: Response = await fetch(`${this.baseUrl}${endpoint}`, {
  //     method: 'GET',
  //   });
  //   const result: any = await response.json();

  //   return result;
  // }

  // static async post(endpoint: String, data: Object) {
  //   const response: Response = await fetch(`${this.baseUrl}${endpoint}`, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   const result: JSON = await response.json();
  //   return result;
  // }

  public post(endpoint: String, data: Object) {
    return this._http.post(`${this._baseUrl}${endpoint}`, data);
  }

  // static async put(endpoint: String, id: number, data: Object) {
  //   const response: Response = await fetch(`${this.baseUrl}${endpoint}/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   const result: JSON = await response.json();
  //   return result;
  // }
  public put(endpoint: String, id: number, data: Object) {
    return this._http.put(`${this._baseUrl}${endpoint}/${id}`, data);
  }

  // static async delete(endpoint: String, id: number) {
  //   const response: Response = await fetch(`${this.baseUrl}${endpoint}/${id}`, {
  //     method: 'DELETE',
  //   });

  //   const result: JSON = await response.json();
  //   return result;
  // }
  public delete(endpoint: String, id: number) {
    return this._http.delete(`${this._baseUrl}${endpoint}/${id}`);
  }
}