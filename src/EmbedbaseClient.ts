import fetch from 'cross-fetch'
import type {
  AddData,
  ClientAddData,
  Fetch,
  SearchData,
  SearchOptions,
  SearchSimilarity,
} from './types'

/**
 * Embedbase Client.
 *
 * An typescript library to interact with Embedbase
 */
export default class EmbedbaseClien {
  protected fetch?: Fetch
  protected embedbaseApiUrl: string
  protected embedbaseApiKey: string

  protected headers: {
    [key: string]: string
  }

  /**
   * Create a new client for use in the browser.
   * @param embedbaseUrl The unique Embedbase URL which is supplied when you create a new project in your project dashboard.
   * @param embedbaseKey The unique Embedbase Key which is supplied when you create a new project in your project dashboard.
   */
  constructor(protected embedbaseUrl: string, protected embedbaseKey: string) {
    if (!embedbaseUrl) throw new Error('embedbaseUrl is required.')
    if (!embedbaseKey) throw new Error('embedbaseKey is required.')
    // strip trailing slash
    const _embedbaseUrl = embedbaseUrl.replace(/\/$/, '')
    this.embedbaseApiUrl = `${_embedbaseUrl}/v1`
    this.embedbaseApiKey = embedbaseKey
    this.headers = {
      Authorization: `Bearer ${this.embedbaseApiKey}`,
      'Content-Type': 'application/json',
    }
  }

  /**
   * Embedbase Search allows you to search for most similar documents in your Embedbase database.
   */
  async search(
    dataset: string,
    query: string,
    options: { top_k?: number } = {}
  ): Promise<SearchSimilarity[]> {
    const top_k = options.top_k || 5

    const searchUrl = `${this.embedbaseApiUrl}/${dataset}/search`
    const res: Response = await fetch(searchUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ query, top_k }),
    })
    const data: SearchData = await res.json()

    return data.similarities
  }

  async add(dataset: string, document: string): Promise<ClientAddData> {
    const addUrl = `${this.embedbaseApiUrl}/${dataset}`
    const res: Response = await fetch(addUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ documents: [{ data: document }] }),
    })
    const data: AddData = await res.json()
    return { id: data.inserted_ids[0] || data.ignored_ids[0], status: data.status }
  }

  async batchAdd(dataset: string, documents: string[]): Promise<ClientAddData[]> {
    const addUrl = `${this.embedbaseApiUrl}/${dataset}`
    const res: Response = await fetch(addUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ documents: documents.map((d) => ({ data: d })) }),
    })
    const data: AddData = await res.json()
    return data.inserted_ids.map((id) => ({ id, status: data.status }))
  }

  dataset(dataset: string): {
    search: (query: string, options?: SearchOptions) => Promise<SearchSimilarity[]>
    add: (document: string) => Promise<ClientAddData>
    batchAdd: (documents: string[]) => Promise<ClientAddData[]>
  } {
    return {
      search: async (query: string, options?: SearchOptions) =>
        this.search(dataset, query, options),
      add: async (document: string) => this.add(dataset, document),
      batchAdd: async (documents: string[]) => this.batchAdd(dataset, documents),
    }
  }
}
