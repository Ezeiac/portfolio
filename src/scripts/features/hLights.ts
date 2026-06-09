export function highlights(triggers: NodeListOf<HTMLElement> | HTMLElement[]) {
    let timer: NodeJS.Timeout;

    triggers.forEach((trigger) => {
        trigger.addEventListener("mouseenter", () => {
            clearTimeout(timer);

            timer = setTimeout(() => {
                const targetIndex = trigger.dataset.triggerIndex;
                const category = trigger.dataset.triggerCat;

                if (!targetIndex || !category) return;

                const destacada = document.querySelectorAll<HTMLElement>(
                    `[data-destacado-cat="${category}"]`,
                );

                destacada.forEach((dest) => {
                    if (dest.dataset.destacadoIndex === targetIndex) {
                        dest.classList.remove("hidden");
                        setTimeout(() => {
                            dest.classList.add("block");
                            dest.classList.remove("opacity-0");
                        }, 50);
                    } else {
                        dest.classList.add("hidden");
                        setTimeout(() => {
                            dest.classList.remove("block");
                            dest.classList.add("opacity-0");
                        }, 50);
                    }
                });
            }, 200);
        });

        trigger.addEventListener("mouseleave", () => {
            clearTimeout(timer);
        });
    });
}