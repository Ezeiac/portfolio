export function highlights(triggers: NodeListOf<HTMLElement> | HTMLElement[]) {
    triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const targetIndex = trigger.dataset.triggerIndex;
            const category = trigger.dataset.triggerCat;

            if (!targetIndex || !category) return;

            const destacadas = document.querySelectorAll<HTMLElement>(
                `[data-destacado-cat="${category}"]`
            );

            requestAnimationFrame(() => {
                destacadas.forEach((dest) => {
                    const isTarget = dest.dataset.destacadoIndex === targetIndex;

                    if (isTarget) {
                        dest.classList.remove("hidden");
                        dest.classList.add("block");
                        
                        requestAnimationFrame(() => {
                            dest.classList.remove("opacity-0");
                        });
                    } else {
                        dest.classList.add("opacity-0");
                        dest.classList.remove("block");
                        dest.classList.add("hidden");
                    }
                });
            });
        });
    });
}