import {DocumentTextIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const infoSection = defineType({
  name: 'infoSection',
  type: 'object',
  title: 'Info section',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Subheading',
      description: 'Heading is optional',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Text',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({heading}) {
      return {
        title: heading || 'Untitled section',
        subtitle: 'Info section',
        media: DocumentTextIcon,
      }
    },
  },
})
