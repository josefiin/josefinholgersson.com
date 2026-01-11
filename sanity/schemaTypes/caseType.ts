import {orderRankField} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'
// Strukturerar datan och definerar datatyp från Sanity.
export const caseType = defineType({
  name: 'case',
  title: 'Case',
  type: 'document',
  fields: [
    orderRankField({type: 'case'}),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Case text',
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      title: 'Infotext',
      name: 'info',
      type: 'array',
      of: [
        {
          title: 'Infotext',
          name: 'info',
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Subheading'},
            {name: 'body', type: 'array', of: [{type: 'block'}], title: 'Text'},
          ],
        },
      ],
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        {
          title: 'Links',
          name: 'link',
          type: 'object',
          fields: [
            {name: 'text', type: 'string', title: 'Link text'},
            {name: 'href', type: 'string', title: 'Link to:'},
          ],
        },
      ],
    }),
    defineField({
      title: 'Project tags',
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      title: 'Thumbnail image',
      name: 'thumbnail',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})
