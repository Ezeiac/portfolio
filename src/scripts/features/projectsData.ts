import { projects } from "@/helpers/projects";
import { listSkills } from "@/helpers/skills";
import type { objTechs } from "@/types/project";

export const allSkillsFlat = listSkills.flatMap((c) => c.skills);

const projectBySection = projects.map((x) => {
    return JSON.stringify({
        type: x.type,
        techs: x.data.map((e) => e.techs),
    });
});

export const typesConTechsIguales = projectBySection
    .map((str) => JSON.parse(str))
    .filter((section) => {
        const grupos = section.techs;

        if (grupos.length <= 1) return true;

        const primerProyecto = grupos[0];
        const stringPrimerProyecto = primerProyecto
            .map((t: objTechs) => t.name)
            .sort()
            .join(",");

        return grupos.every((proyectoActual: Array<objTechs>) => {
            const stringProyectoActual = proyectoActual
                .map((t: objTechs) => t.name)
                .sort()
                .join(",");
            return stringPrimerProyecto === stringProyectoActual;
        });
    })
    .map((section) => section.type);