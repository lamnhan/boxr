export class FetchService {
  private readonly baseUrl = '/mocked-api'
  constructor () {}
  getJson<T>(endpoint: string) {
    return fetch(`${this.baseUrl}/${endpoint}`).then(response => response.json()) as Promise<T>
  }
}

export const  fetchService = new FetchService()
