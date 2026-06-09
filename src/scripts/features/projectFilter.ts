interface FilterNodes {
    typeFilter: NodeListOf<HTMLElement> | HTMLElement[];
    techOptions: NodeListOf<HTMLElement> | HTMLElement[];
    allProjects: NodeListOf<HTMLElement> | HTMLElement[];
    sections: NodeListOf<HTMLElement> | HTMLElement[];
    buttonClear: HTMLElement | null;
    resultsSection: HTMLElement | null;
    nextTime: HTMLElement | null;
}

export function projectFilter(nodes: FilterNodes) {
    let filteredTech: Array<string> = [];
    let strengthSelected: string | null = null;

    const { typeFilter, techOptions, allProjects, sections, buttonClear, resultsSection, nextTime } = nodes;

    function updateFilterUI() {
        typeFilter.forEach((b) => {
            if (b.id === strengthSelected) {
                b.classList.remove("opacity-40");
                b.classList.add("opacity-100");
            } else {
                b.classList.add("opacity-40");
                b.classList.remove("opacity-100");
            }
        });
    }

    function applyFilters() {
        const hasActiveFilters = filteredTech.length > 0;

        allProjects.forEach((p) => p.classList.add("opacity-0"));
        sections.forEach((s) => s.classList.add("opacity-0"));
        if (resultsSection) resultsSection.classList.add("opacity-0");

        // Toggle visual del botón Clear
        if (hasActiveFilters) {
            buttonClear?.classList.remove("pointer-events-none");
            setTimeout(() => buttonClear?.classList.remove("opacity-0"), 10);
        } else {
            buttonClear?.classList.add("pointer-events-none");
            setTimeout(() => buttonClear?.classList.add("opacity-0"), 10);
        }

        setTimeout(() => {
            allProjects.forEach((p) => {
                const techByproject = p.dataset.show ? p.dataset.show.split(",") : [];
                let containTech = false;

                if (strengthSelected === "softFilter") {
                    containTech = filteredTech.length === 0 || filteredTech.some((f) => techByproject.includes(f));
                } else {
                    containTech = filteredTech.length === 0 || filteredTech.every((f) => techByproject.includes(f));
                }

                if (containTech) {
                    p.classList.remove("hidden");
                    setTimeout(() => p.classList.remove("opacity-0"), 10);
                } else {
                    p.classList.add("hidden");
                }
            });

            if (!hasActiveFilters) {
                if (resultsSection) resultsSection.classList.add("hidden");
                sections.forEach((s) => {
                    s.classList.remove("hidden");
                    setTimeout(() => s.classList.remove("opacity-0"), 10);
                });
            } else {
                sections.forEach((s) => s.classList.add("hidden"));

                if (resultsSection) {
                    const activeItemsInResults = resultsSection.querySelectorAll(".isFilter:not(.hidden)");

                    if (activeItemsInResults.length > 0) {
                        resultsSection.classList.remove("hidden");
                        nextTime?.classList.add("hidden", "opacity-0");
                        setTimeout(() => resultsSection.classList.remove("opacity-0"), 10);
                    } else {
                        nextTime?.classList.remove("hidden");
                        resultsSection.classList.remove("hidden");
                        setTimeout(() => {
                            resultsSection.classList.remove("opacity-0");
                            nextTime?.classList.remove("opacity-0");
                        }, 10);
                    }
                }
            }
        }, 100);
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

            if (!filteredTech.includes(value)) {
                filteredTech.push(value);
                o.classList.add("selected");
                o.classList.remove("opacity-40");

                if (!strengthSelected) {
                    strengthSelected = "softFilter";
                    updateFilterUI();
                }
            } else {
                filteredTech = filteredTech.filter((f) => f !== value);
                o.classList.remove("selected");
                o.classList.add("opacity-40");
                if (filteredTech.length === 0) {
                    strengthSelected = null;
                    updateFilterUI();
                }
            }
            applyFilters();
        });
    });

    buttonClear?.addEventListener("click", () => {
        filteredTech = [];
        strengthSelected = null;

        techOptions.forEach((o) => {
            o.classList.remove("bg-gray-500", "text-white", "selected");
            o.classList.add("opacity-40");
        });

        applyFilters();
        updateFilterUI();
    });
}