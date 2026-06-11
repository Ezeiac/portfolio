interface FilterNodes {
    typeFilter: NodeListOf<HTMLElement> | HTMLElement[];
    destacados: NodeListOf<HTMLElement> | HTMLElement[];
    techOptions: NodeListOf<HTMLElement> | HTMLElement[];
    allProjects: NodeListOf<HTMLElement> | HTMLElement[];
    sections: NodeListOf<HTMLElement> | HTMLElement[];
    clearfilters: HTMLElement | null;
    resultsSection: HTMLElement | null;
    nextTime: HTMLElement | null;
}

export function projectFilter(nodes: FilterNodes) {
    let filteredTech: Array<string> = [];
    let strengthSelected: string | null = null;

    const { typeFilter, techOptions, allProjects, sections, clearfilters, resultsSection, nextTime } = nodes;

    function updateFilterUI() {
        typeFilter.forEach((b) => {
            const isActive = b.id === strengthSelected;
            b.classList.toggle("opacity-100", isActive);
            b.classList.toggle("opacity-40", !isActive);
        });
    }

    function applyFilters() {
        const hasActiveFilters = filteredTech.length > 0;

        const elementsToHide: HTMLElement[] = [];
        const elementsToShow: HTMLElement[] = [];

        if (clearfilters) {
            clearfilters.classList.toggle("pointer-events-none", !hasActiveFilters);
            clearfilters.classList.toggle("invisible", !hasActiveFilters);
            clearfilters.classList.toggle("is-animating", !hasActiveFilters);

        }

        allProjects.forEach((p) => {
            const techByproject = p.dataset.show ? p.dataset.show.split(",") : [];
            const containTech = strengthSelected === "softFilter"
                ? filteredTech.length === 0 || filteredTech.some((f) => techByproject.includes(f))
                : filteredTech.length === 0 || filteredTech.every((f) => techByproject.includes(f));

            if (!containTech) elementsToHide.push(p);
            else elementsToShow.push(p);
        });

        if (!hasActiveFilters) {
            if (resultsSection) elementsToHide.push(resultsSection);
            sections.forEach((s) => elementsToShow.push(s));
        } else {
            sections.forEach((s) => elementsToHide.push(s));
            if (resultsSection) {
                elementsToShow.push(resultsSection);
                
                const hasResults = resultsSection.querySelectorAll(".isFilter:not(.is-hidden)").length > 0;
                if (nextTime) {
                    if (!hasResults) elementsToShow.push(nextTime);
                    else elementsToHide.push(nextTime);
                }
            }
        }

        elementsToHide.forEach((el) => {
            el.classList.add("is-animating");
        });

        setTimeout(() => {
            elementsToHide.forEach((el) => el.classList.add("is-hidden"));

            elementsToShow.forEach((el) => {
                el.classList.remove("is-hidden");
                el.classList.add("is-animating");
            });

            setTimeout(() => {
                elementsToShow.forEach((el) => {
                    el.classList.remove("is-animating");
                });
            }, 30);

        }, 300);
    }


    typeFilter.forEach((f) => {
        f.addEventListener("click", () => {
            strengthSelected = (!strengthSelected || strengthSelected !== f.id) ? f.id : null;
            updateFilterUI();
            applyFilters();
        });
    });

    techOptions.forEach((o) => {
        o.addEventListener("click", () => {
            const value = o.dataset.category;
            if (!value) return;

            const isSelected = filteredTech.includes(value);

            if (!isSelected) {
                filteredTech.push(value);
                o.classList.add("selected");
                o.classList.remove("opacity-40");
                if (!strengthSelected) strengthSelected = "softFilter";
            } else {
                filteredTech = filteredTech.filter((f) => f !== value);
                o.classList.remove("selected");
                o.classList.add("opacity-40");
                if (filteredTech.length === 0) strengthSelected = null;
            }

            updateFilterUI();
            applyFilters();
        });
    });

    clearfilters?.addEventListener("click", () => {
        filteredTech = [];
        strengthSelected = null;

        techOptions.forEach((o) => {
            o.classList.remove("is-hidden");
            o.classList.add("opacity-40");
        });

        applyFilters();
        updateFilterUI();
    });
}