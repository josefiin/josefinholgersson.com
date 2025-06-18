import {ImageIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const fullWidthImage = defineType({
  name: 'fullWidthImage',
  type: 'object',
  title: 'Image full width',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt-text',
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'image',
    },
    prepare({alt, media}) {
      return {
        title: alt || 'Untitled image',
        subtitle: 'Image full width',
        media: media || ImageIcon,
      }
    },
  },
})
