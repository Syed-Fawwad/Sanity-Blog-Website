import { defineType,defineField,defineArrayMember } from "sanity"
// sanity/pet.ts
export const blog = defineType({
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Post Title',
description:"Title of the post",
            validation: Rule => Rule.max(65).warning('Title must be less tha 25 character.')
        }),
        defineField({
          name:'slug',
          type:'slug',
          title:'Slug',
          options: {
            source: 'title',
            maxLength: 65,
          },
          validation:Rule=>Rule.required(),
        }),
        defineField({
          name:"summary",
          title:"Summary",
          type:"text",
          validation:Rule=>Rule.required(),
        }),
   defineField({
    name:"image",
    type:"image",
    title:"Image",
   }),
   defineField({
name:"content",
type:"array",
title:"Content",
of:[
  defineArrayMember({
    type:"block"
  })
]
   }),
   defineField({
    name:"author",
    type:"reference",
    title:"Author",
    to:[{
      type:"author"
    }]

   })
   
   
      ]

})