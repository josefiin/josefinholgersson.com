import {defineType, defineField, defineArrayMember} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'showInNav',
      type: 'boolean',
      title: 'Show page in Navigation',
      initialValue: false,
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'textBlock',
          name: 'textBlock',
        }),
        defineArrayMember({
          type: 'infoSection',
          name: 'infoSection',
        }),
        defineArrayMember({
          type: 'linkSection',
          name: 'linkSection',
        }),
        defineArrayMember({
          type: 'fullWidthImage',
          name: 'fullWidthImage',
        }),
      ],
    }),
  ],
})
