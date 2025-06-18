import {LinkIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const linkSection = defineType({
  name: 'linkSection',
  type: 'object',
  title: 'Link section',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          title: 'Link',
          fields: [
            {name: 'text', type: 'string', title: 'Link Text'},
            {name: 'href', type: 'string', title: 'URL'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      links: 'links',
    },
    prepare({links}) {
      const title = links?.[0]?.text || 'Untitled link'
      return {
        title,
        subtitle: 'Link section',
        media: LinkIcon,
      }
    },
  },
})
