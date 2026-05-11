import {defineType, defineField} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    orderRankField({type: 'page'}),
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
      title: 'Page content',
      type: 'array',
      of: [
        {type: 'introBlock'},
        {type: 'infoSection'},
        {type: 'linkSection'},
        {type: 'textBlock'},
        {type: 'fullWidthImage'},
        {type: 'imageTwoCol'},
        {type: 'highlightText'},
      ],
    }),
  ],
})
