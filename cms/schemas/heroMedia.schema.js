// Example CMS schema for hero.media (adapt to your CMS: Sanity/Strapi/Directus etc.)
export default {
  name: 'heroMedia',
  title: 'Hero Media',
  type: 'object',
  fields: [
    { name: 'type', title: 'Type', type: 'string', options: { list: ['video', 'image'], layout: 'radio' }, validation: Rule => Rule.required() },
    { name: 'url', title: 'URL', type: 'url', validation: Rule => Rule.required().uri({ scheme: ['https'] }) },
    { name: 'poster', title: 'Poster', type: 'url' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'attribution', title: 'Attribution', type: 'string' },
    { name: 'license', title: 'License', type: 'string', validation: Rule => Rule.required() },
    { name: 'variants', title: 'Variants', type: 'array', of: [{ type: 'object', fields: [
        { name: 'url', title: 'URL', type: 'url', validation: Rule => Rule.uri({ scheme: ['https'] }) },
        { name: 'width', title: 'Width', type: 'number' },
        { name: 'bitrate', title: 'Bitrate', type: 'number' },
      ] }] },
  ]
};
