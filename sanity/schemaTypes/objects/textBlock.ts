import {DocumentTextIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const textBlock = defineType({
  name: 'textBlock',
  type: 'object',
  title: 'Text block',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
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
        title: heading || 'Text block',
        subtitle: 'Text block with heading',
        media: DocumentTextIcon,
      }
    },
  },
})
