// Get image dimensions from Sanity image asset references
// Asset ref format: image-abc123def456-1200x800-jpg
export const useImageDimensions = () => {
  
  const imageWidth = (assetRef: string | undefined): number | undefined => {
    if (!assetRef) return undefined
    const match = assetRef.match(/-(\d+)x(\d+)-[a-z]+$/)
    return match?.[1] ? parseInt(match[1], 10) : undefined
  }

  const imageHeight = (assetRef: string | undefined): number | undefined => {
    if (!assetRef) return undefined
    const match = assetRef.match(/-(\d+)x(\d+)-[a-z]+$/)
    return match?.[2] ? parseInt(match[2], 10) : undefined
  }

  return {
    imageWidth,
    imageHeight,
  }
}
