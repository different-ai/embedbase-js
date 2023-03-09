export type Fetch = typeof fetch

export interface SearchSimilarity {
  similiarity: number
  data: string
}

export interface SearchData {
  query: string
  similarities: SearchSimilarity[]
}

export interface SearchOptions {
  limit?: number
}
//     {
//     status: 'success',
//     ignored_ids: [],
//     inserted_ids: [
//       '30a3abf444a6fe3a64d737cacf18f3d51e0b03b58d3e2837f02eaea6509e59e3'
//     ]
//   }

export interface AddData {
  status: 'success' | 'error'
  ignored_ids: string[]
  inserted_ids: string[]
}

export interface ClientAddData {
  id: string
  status: 'success' | 'error'
}
