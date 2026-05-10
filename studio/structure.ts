import type { StructureResolver } from 'sanity/structure'
import { CogIcon, DocumentsIcon, ProjectsIcon, TagIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Settings singleton
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings')),

      // Media Tags
      S.listItem()
        .title('Media Tags')
        .icon(TagIcon)
        .child(S.documentTypeList('media.tag').title('Media Tags')),

      S.divider(),

      // Pages
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(S.documentTypeList('page').title('Pages')),

      // Portfolio
      S.listItem()
        .title('Portfolio')
        .icon(ProjectsIcon)
        .child(S.documentTypeList('portfolio').title('Portfolio')),
        
    ])
