import { lazy as reactLazy, type ComponentType } from 'react'

// React.lazy uses this constraint for components with arbitrary prop types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyMin<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  minMs = 1200,
) {
  return reactLazy(async () => {
    const [module] = await Promise.all([
      factory(),
      new Promise<void>((resolve) => setTimeout(resolve, minMs)),
    ])
    return module
  })
}