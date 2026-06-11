interface AppNodes {
    showFilters: HTMLElement | null;
    hideFilters: HTMLElement | null;
    nextTime: HTMLElement | null;
    titleResults: HTMLElement | null;
    tagsFilter: HTMLElement | null;
    techOptions: NodeListOf<HTMLElement>;
    sections: NodeListOf<HTMLElement>;
    resultsSection: HTMLElement | null;
    typeFilter: NodeListOf<HTMLElement>;
    allProjects: NodeListOf<HTMLElement>;
    destacados: NodeListOf<HTMLElement>;
    triggers: NodeListOf<HTMLElement>;
    mode: HTMLElement | null;
    mySite: HTMLElement | null;
    bgSite: HTMLElement | null;
    icons: NodeListOf<HTMLElement>;
    plusIcons: NodeListOf<HTMLElement>;
    clearfilters: HTMLElement | null;
    form: HTMLFormElement | null;
    submit: HTMLButtonElement | null;
    submitText: HTMLElement | null;
    submitError: HTMLElement | null;
    projectSection: HTMLElement | null;
}

export const getNodes = (): AppNodes => ({
    showFilters: document.getElementById("showFilters"),
    hideFilters: document.getElementById("hideFilters"),
    nextTime: document.getElementById("nextTime"),
    titleResults: document.getElementById("titleResults"),
    tagsFilter: document.getElementById("tagsFilter"),
    techOptions: document.querySelectorAll("[data-category]"),
    sections: document.querySelectorAll("[data-catall]"),
    resultsSection: document.querySelector("[data-results-section]"),
    typeFilter: document.querySelectorAll("[data-typefilter]"),
    clearfilters: document.getElementById("clearfilters"),
    allProjects: document.querySelectorAll(".isFilter"),
    destacados: document.querySelectorAll(".contenedor-destacados"),
    triggers: document.querySelectorAll("[data-trigger-index]"),
    projectSection: document.getElementById("projectSection"),
    
    mode: document.querySelector("#mode"),
    mySite: document.querySelector("#mySite"),
    bgSite: document.querySelector("#bgSite"),
    icons: document.querySelectorAll("[data-icontech]"),
    plusIcons: document.querySelectorAll("[data-plusicon]"),

    form: document.getElementById("form") as HTMLFormElement | null,
    submit: document.getElementById("submit") as HTMLButtonElement | null,

    submitText: document.querySelector("#submitText"),
    submitError: document.querySelector("#submitError"),

})