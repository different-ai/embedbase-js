export type Fetch = typeof fetch

export interface BatchAddDocument {
  data: string
  metadata?: Metadata | unknown
}

/**
 * The Metadata interface defines a structure for the basic metadata of a
 * document. The url field is used for the url of the document.
 * This is the best practices to use the metadata field.
 * You can also add any other fields you want.
 *
 * @interface Metadata
 */
interface Metadata {
  url: string
  [key: string]: unknown
}

export interface SearchSimilarity {
  similiarity: number
  data: string
  embedding: number[]
  hash: string
  metadata?: Metadata | unknown
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
  metadata?: Metadata | unknown
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

export interface ClientDatasets {
  datasetId: string
  documentsCount: number
}
