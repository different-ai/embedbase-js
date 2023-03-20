export type Fetch = typeof fetch

export interface BatchAddDocument {
  data: string
  metadata?: unknown
}

export interface SearchSimilarity {
  similiarity: number
  data: string
  metadata?: unknown
}

export interface SearchData {
  query: string
  similarities: SearchSimilarity[]
}

export interface SearchOptions {
  limit?: number
}

export interface AddDataResult {
  id: string
  data: string
  embedding: number[]
  hash: string
  metadata?: unknown
}
export interface AddData {
  results?: AddDataResult[]
  error?: string
}

export type ClientContextData = string[]

export type ClientSearchData = SearchSimilarity[]
export interface ClientAddData {
  id?: string
  status: 'success' | 'error'
}
