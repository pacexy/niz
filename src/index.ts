import enumerateStrings from 'enumerate-strings'
import validate from 'validate-npm-package-name'
import npmName from 'npm-name'

interface EnumerateStringsOptions {
  length: number
  charset?: string[]
  filter?: Function
}

interface Options extends EnumerateStringsOptions {
  inject?: Function
}

export default async function niz(options: Options) {
  const availableNames: string[] = []
  const { inject, ...esOptions } = options
  // enumerate strings exclude built-in module name
  const names = enumerateStrings(esOptions).filter(
    (name) => validate(name).validForNewPackages,
  )

  for (const name of names) {
    const available = await npmName(name)
    if (typeof inject === 'function') inject(name, available)
    if (available) availableNames.push(name)
  }

  return availableNames
}
