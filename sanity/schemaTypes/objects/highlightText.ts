import {BlockquoteIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const highlightText = defineType({
  name: 'highlightText',
  type: 'object',
  title: 'Highlight text',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Highlight text',
    }),
  ],
  preview: {
    select: {quote: 'quote'},
    prepare({quote}) {
      return {
        title: quote || 'Highlight text',
        subtitle: 'Highlight text',
        media: BlockquoteIcon,
      }
    },
  },
})
