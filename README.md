# niz

Filter out available npm names through some restrictions.

### Usage

```typescript
const availableNames: string[] = niz(options: Options)
```

### Options

```typescript
interface Options {
  length: number
  charset?: string[]
  filter?: Function
  inject?: Function
}
```
