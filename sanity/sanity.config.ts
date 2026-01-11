import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {ConfettiIcon, IceCreamIcon} from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: 'no50snex',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Pages').icon(ConfettiIcon).child(S.documentTypeList('page')),
            orderableDocumentListDeskItem({
              type: 'case',
              title: 'Cases',
              icon: IceCreamIcon,
              S,
              context,
            }),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
