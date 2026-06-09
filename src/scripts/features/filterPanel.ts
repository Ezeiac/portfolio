export function filterPanel(showFilters: HTMLElement | null, hideFilters: HTMLElement | null, tagsFilter: HTMLElement | null) {
    let openFilter = false;

    showFilters?.addEventListener("click", () => {
        if (!openFilter) {
            tagsFilter?.classList.add("-translate-y-full");
            openFilter = true;
            setTimeout(() => {
                showFilters.classList.add("opacity-0", "pointer-events-none");
            }, 50);
        }
    });

    hideFilters?.addEventListener("click", () => {
        if (openFilter) {
            tagsFilter?.classList.remove("-translate-y-full");
            showFilters?.classList.remove("opacity-0", "pointer-events-none");
            openFilter = false;
        }
    });
}