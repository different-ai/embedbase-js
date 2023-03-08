import { createClient } from '../src/index'

const URL = process.env.EMBEDBASE_URL || 'https://embedbase-hosted-usx5gpslaq-uc.a.run.app'
const KEY = process.env.EMBEDBASE_API_KEY || 'some.fake.KEY'

const embedbase = createClient(URL, KEY)

test('it should create the client connection', async () => {
  expect(embedbase).toBeDefined()
  expect(embedbase).toBeInstanceOf({}.constructor)
})

test('it should throw an error if no valid params are provided', async () => {
  expect(() => createClient('', KEY)).toThrowError('embedbaseUrl is required.')
  expect(() => createClient(URL, '')).toThrowError('embedbaseKey is required.')
})

describe('Check if headers are set', () => {
  test('should have auth header set set', () => {
    const header = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }

    const request = createClient(URL, KEY)

    // @ts-ignore
    const getHeaders = request.headers

    expect(getHeaders).toHaveProperty('Authorization', header.Authorization)
    expect(getHeaders).toHaveProperty('Content-Type', header['Content-Type'])
  })
})

describe('Check if the client is able to fetch data', () => {
  test('should return an array of similarities', async () => {
    const embedbase = createClient(URL, KEY)

    const data = await embedbase.dataset('test-amazon-product-reviews').search('hello')
    console.log(data)

    expect(data).toBeDefined()
    expect(data).toBeInstanceOf(Array)
  })
  // this is not striclty to just a simplification for our tests
  test('should use return equal element of top_k', async () => {
    const embedbase = createClient(URL, KEY)

    const data = await embedbase
      .dataset('test-amazon-product-reviews')
      .search('test', { top_k: 10 })

    expect(data).toBeDefined()
    expect(data).toBeInstanceOf(Array)
    expect(data).toHaveLength(10)
  })
  test('should be able to add elements to a dataset,   ', async () => {
    const embedbase = createClient(URL, KEY)
    // just used to make sure we're creating new datasets
    const date = new Date().getTime()
    const data = await embedbase.dataset(`test-amazon-product-reviews ${date}`).add('hello')
    console.log(data)
    expect(data).toBeDefined()
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('status')
  })

  test('should be able to batch add elements to a dataset', async () => {
    const embedbase = createClient(URL, KEY)
    const date = new Date().getTime()
    const data = await embedbase
      .dataset(`test-amazon-product-reviews ${date}`)
      .batchAdd(['test', 'my', 'love'])
    console.log(data)
    expect(data).toBeDefined()
    expect(data).toBeInstanceOf(Array)
    expect(data).toHaveLength(3)
  })
})
