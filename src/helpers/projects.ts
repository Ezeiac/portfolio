import { getCollection } from "astro:content";
import type {
    projectInfo
} from '@/types/project'

const allProjects = await getCollection('projects')

export const projects: Array<projectInfo> = allProjects.reduce(
    (acc: Array<projectInfo>, p) => {
        const item = p.data

        let existType = acc.find(f => f.type === item.type)

        const projectData = {
            img: item.img,
            name: item.name,
            icon: item.icon,
            link: item.link,
            info: item.info,
            status: item.status,
            color: item.color,
            techs: item.techs
        }

        if (existType) {
            existType.data.push(projectData)
        } else {
            acc.push({
                type: item.type,
                date: item.date,
                category: item.category,
                icon: item.icon,
                description: item.description,
                data: [projectData]
            })
        }

        return acc
    }, []
).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())