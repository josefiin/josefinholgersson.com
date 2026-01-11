import {DocumentTextIcon} from '@sanity/icons'
import {defineType, defineField, defineArrayMember} from 'sanity'

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
      title: 'Text',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {name: 'href', type: 'url', title: 'URL'},
                  {
                    name: 'target',
                    type: 'string',
                    title: 'Target',
                    options: {
                      list: [
                        {title: 'Same tab', value: '_self'},
                        {title: 'New tab', value: '_blank'},
                      ],
                      layout: 'radio',
                    },
                    initialValue: '_self',
                  },
                ],
              },
            ],
          },
        }),
      ],
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
