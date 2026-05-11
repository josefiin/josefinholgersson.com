import {DocumentTextIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const introBlock = defineType({
  name: 'introBlock',
  type: 'object',
  title: 'Intro block',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      description: 'Optional — overrides the page title as the displayed heading',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Text',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Intro block',
        media: DocumentTextIcon,
      }
    },
  },
})
