import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsInfo = defineCollection({

  loader: glob({ base: './src/services/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    type: z.string(),
    category: z.string(),
    icon: z.string(),
    description: z.string(),
    img: z.string(),
    name: z.string(),
    link: z.string(),
    status: z.boolean(),
    color: z.string(),
    techs: z.array(
      z.object({
        name: z.string(),
        important: z.boolean()
      })
    )
  })
})

const skillsInfo = defineCollection({

  loader: glob({ base: './src/services/skills', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    category: z.string(),
    skills: z.array(
      z.object({
        name: z.string(),
        repo: z.string(),
        url: z.string(),
        order: z.number().optional(),
        fav: z.boolean()
      })
    )
  })
})

export const collections = {
  'projects': projectsInfo,
  'skills': skillsInfo

}