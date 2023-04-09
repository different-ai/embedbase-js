export const stringifyList = (list: any[]) => {
  return list.map((item) => JSON.stringify(item))
}

/**
 * Camelize object recursively
 * @param obj
 * @returns
 */
export const camelize = <T>(obj: any): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj as T
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => camelize(item)) as unknown as T
  }
  const camelized = {}
  for (const key in obj) {
    camelized[camelCase(key)] = camelize(obj[key])
  }
  return camelized as T
}

const camelCase = (str: string) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

export async function* stream (url: string, body: string, headers: { [key: string]: string }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  })

  if (!response.ok) {
    // assuming the error is a JSON object
    const message = await response.json()
    throw new Error(message.error)
  }

  // This data is a ReadableStream
  const data = response.body
  if (!data) {
    return
  }

  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    yield chunkValue
  }
}