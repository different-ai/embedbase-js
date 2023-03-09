⚠️🔥 (sdk is still in private, if you want to have early access contact me at [email](mailto:ben@embedbase.xyz)
## Embedbase

Embedbase is an open-source API to compute ML embeddings. This SDK makes it easy to use Embedbase in your app.


## Table of contents
- [What is it](#what-is-it)
- [Installation](#installation)
- [Searching](#fetching-embeddings)
- [Adding data](#adding-data)
- [Creating a recommendation engine with zero ML experience](#how-to-create-a-reccomendation-engine)


## Design philosophy
- Simple
- Open-source
- Composable (integrates well with LLM & various databases)

## What's Included
- [x] Hosted Instance Working on top of Embedbase. [Sign Up](https://embedbase.xyz)
- [x] Authentication and Authorization. [Docs](https://docs.embedbase.com/auth)
- [x] Typescript SDK. [Docs](https://docs.embedbase.com/sdk)
  - [x] Server-side embeddings computation
  - [ ] Local embeddings computation 
- [x] Dashboard [Docs](https://docs.embedbase.com/dashboard)
  - [x] Search Datasets
  - [x] Use the playground to get started
  - [ ] Visualize datasets (coming soon)

## Why Embedbase

Embeddings are a powerful way to represent data. They can be used to create recommendation engines, search engines, and Q&A engines. Embedbase gives you and sdk & an api to create these systems without any ML knowledge.

Embedbase is fully open-source and is designed to accompany you from your first line of code to shipping your apps to millions of users.

## What is it

This is the official typescript client for Embedbase. Embedbase is an open-source API to manage ML embeddings.

## Who is it for
- App developers who want to add ML to their apps without having to worry about the infrastructure
- ML engineers who want to prototype classification systems



## Installation


You can install @embedbase/embedbase-js via the terminal.


```
npm i embedbase-js
```


### Initializing
```ts

import { createClient } from '@embedbase/embedbase-js'


// you can find the api key at https://embedbase.com
const embedbase = createClient('api-key', 
    {
        embedbaseURL: 'https://app.embedbase.com',
    })

```


### Fetching Embeddings
```ts
// fetching data
const data = await embedbase
  .dataset('amazon-reviews')
  .search('best hot dogs accessories', {top_k: 3})


console.log(data)
// [
//   {
//       "similarity": 0.810843349,
//       "data": "The world is going to smell very different once electric      vehicles become commonplace"
//   },
//   {
//       "similarity": 0.794602573,
//       "data": "200 years ago, people would never have guessed that humans in the future would communicate by silently tapping on glass"
//   },
//   {
//       "similarity": 0.792932034,
//       "data": "The average car in space is nicer than the average car on Earth"
//   },
// ]
```
### Adding Data

```js
const data = await embedbase
  .dataset('amazon-reviews')
  // embeddings are extremely good for retrieving unstructured data
  // in this example we store an unparsable html string
  .add(`
  <div>
    <span>Lightweight. Telescopic. Easy zipper case for storage. Didn't put in dishwasher. Still perfect after many uses.</span>
`)

console.log(data)
//
// {
//   "id": "eiew823",
//   "data": "Lightweight. Telescopic. Easy zipper case for storage.
//          Didn't put in dishwasher. Still perfect after many uses."
//    "metadata": {
//      "created_at": "2020-10-29T12:00:00.000Z",
//      "updated_at": "2020-10-29T12:00:00.000Z"
//      "location": "https://app.embedbase.com/datasets/amazon-reviews/
//    }
// }
```

## How to create a reccomendation engine

```js
coming soon


```

## How to do search engine

```js
coming soon
```

## How to create a Q&A documentation

```js
coming soon
```
# embedbase-js
