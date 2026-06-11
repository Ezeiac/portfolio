export type objTechs = {
    name: string;
    important: boolean;
};

export type imagesType = {
    img: string;
    name: string;
    icon: string;
    link: string;
    info?: string;
    status: boolean;
    color: string;
    techs: Array<objTechs>;
};

export interface projectInfo {
    type: string;
    date: string;
    category: string;
    icon: string;
    description: string;
    data: Array<imagesType>;
}