import {ImageIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const imageTwoCol = defineType({
  name: 'imageTwoCol',
  type: 'object',
  title: 'Images (two column)',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'imageLeft',
      type: 'image',
      title: 'Left image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageRight',
      type: 'image',
      title: 'Right image (optional)',
      options: {hotspot: true},
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt-text',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Two-column images',
        media: ImageIcon,
      }
    },
  },
})
