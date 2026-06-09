import { getCollection } from "astro:content";

type arrSkills = {
    name: string;
    repo: string;
    url: string;
    order?: number,
    fav: boolean
}

export interface skillTs {
    category: string,
    skills: Array<arrSkills>
}

const allSkills = await getCollection('skills')


export const listSkills: Array<skillTs> = allSkills.reduce(
    (acc: Array<skillTs>, s) => {
        const skill = s.data

        let existCat = acc.find(f => f.category === skill.category)

        if (existCat) {
            existCat.skills.push(...skill.skills)
        } else {
            acc.push({
                category: skill.category,
                skills: skill.skills,
            })
        }

        return acc
    }, []
)