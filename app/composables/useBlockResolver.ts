/**
 * Resolves Sanity block types to Vue components
 * Converts camelCase _type - e.g. "blockName" to PascalCase "BlockName"
 */
export function useBlockResolver() {
  const resolve = (type: string) => {
    if (!type) return null
    const name = type.charAt(0).toUpperCase() + type.slice(1)
    const component = resolveComponent(name)
    return typeof component === 'string' ? null : component
  }

  return { resolve }
}
