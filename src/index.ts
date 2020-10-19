import enumerateStrings from 'enumerate-strings'
import validate from 'validate-npm-package-name'
import npmName from 'npm-name'

interface Options {
  length: number
  charset?: string[]
  filter?: Function
}

export default async function niz(options: Options) {
  const availableNames: string[] = []
  // enumerate strings exclude built-in module name
  const names = enumerateStrings(options).filter(
    (name) => validate(name).validForNewPackages,
  )

  for (const name of names) {
    const available = await npmName(name)
    if (available) availableNames.push(name)
  }

  return availableNames
}
