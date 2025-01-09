import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'
import { Image } from 'sanity'

// Create an image URL builder using the Sanity project settings
const builder = createImageUrlBuilder({ 
  projectId: projectId || '', 
  dataset: dataset || '' 
})

// Function to generate a URL for an image
export const urlFor = (source: Image) => {
  return builder?.image(source).auto('format').fit('max').url()
}