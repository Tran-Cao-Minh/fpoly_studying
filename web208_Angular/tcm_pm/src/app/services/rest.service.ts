export default class HttpService {
  static baseUrl: string = 'http://localhost:3000/';

  static async get(endpoint: String) {
    const response: Response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
    });
    const result: any = await response.json();

    return result;
  }

  static async post(endpoint: String, data: Object) {
    const response: Response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result: JSON = await response.json();
    return result;
  }

  static async put(endpoint: String, id: number, data: Object) {
    const response: Response = await fetch(`${this.baseUrl}${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result: JSON = await response.json();
    return result;
  }

  static async delete(endpoint: String, id: number) {
    const response: Response = await fetch(`${this.baseUrl}${endpoint}/${id}`, {
      method: 'DELETE',
    });

    const result: JSON = await response.json();
    return result;
  }
}