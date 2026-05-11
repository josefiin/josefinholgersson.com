import {orderRankField} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

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
      name: 'showOnStartPage',
      title: 'Show on start page',
      type: 'boolean',
      initialValue: true,
      description:
        "Uncheck to hide this project from the start page. It's still accessible via its URL.",
    }),
    defineField({
      title: 'Project tags',
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'content',
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
    defineField({
      title: 'Thumbnail image',
      name: 'thumbnail',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})
