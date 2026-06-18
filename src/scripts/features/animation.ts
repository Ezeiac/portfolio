import { getNodes } from "../nodes";

document.addEventListener("DOMContentLoaded", () => {
    const nodes = getNodes();
    const title = nodes.title;
    const subtitle = nodes.subtitle;

    if (!title || !subtitle) return;

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const h1Text = "Ezequiel Arena";
    const h2Text = "Desarrollador frontend";

    const h1Array = h1Text.split("");
    const h2Array = h2Text.split("");

    const animateLetter = (
        container: HTMLElement,
        finalLetter: string,
        index: number,
        minCambios: number,
        maxCambios: number
    ): Promise<void> => {
        return new Promise((resolve) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('letter', 'text-center', 'w-fit');
            
            const newP = document.createElement('p');
            newDiv.appendChild(newP);
            container.appendChild(newDiv);

            const largoAleatorio = Math.floor(Math.random() * (maxCambios - minCambios + 1)) + minCambios;
            let cambiosActuales = 0;
            let timeToChange = 300;

            function ejecutarCambio() {
                cambiosActuales++;

                if (cambiosActuales >= largoAleatorio) {
                    newP.textContent = finalLetter ?? " ";
                    resolve();
                    return;
                }

                const randomIndex = Math.floor(Math.random() * letters.length);
                const randomMayus = Math.random();

                newP.textContent = randomMayus > 0.5
                    ? letters[randomIndex].toUpperCase()
                    : letters[randomIndex];

                if (cambiosActuales <= 28) {
                    timeToChange = timeToChange * 0.85;
                    if (timeToChange < 80) timeToChange = 80;
                } else {
                    timeToChange = timeToChange * 1.15;
                }
                
                setTimeout(ejecutarCambio, timeToChange);
            }

            ejecutarCambio();
        });
    };

    const generateText = async (
        container: HTMLElement,
        textArray: Array<string>,
        minCambios: number = 10,
        maxCambios: number = 40,
        delay: number
    ) => {
        setTimeout(() => {
            container.classList.remove('opacity-0');
        }, delay);

        const promises = textArray.map((letter, index) => 
            animateLetter(container, letter, index, minCambios, maxCambios)
        );

        await Promise.all(promises);
    };

    const showSite = () => {
        if (!nodes.hidden) return;
        
        nodes.hidden.classList.remove("hidden");
        
        requestAnimationFrame(() => {
            setTimeout(() => {
                nodes.hidden?.classList.remove("opacity-0", "translate-y-4");
                nodes.aboutMe?.classList.remove("opacity-0", "translate-y-4");

                title.classList.remove('opacity-0');
                subtitle.classList.remove('opacity-0');
                
                if (nodes.menu) {
                    nodes.menu.classList.remove("opacity-0", "translate-y-full", "md:-translate-x-full");
                    nodes.menu.classList.add("opacity-100", "translate-y-0", "md:translate-x-0");
                }
            }, 50);
        });
    };

    setTimeout(async () => {
        await Promise.all([
            generateText(title, h1Array, 10, 30, 0),
            generateText(subtitle, h2Array, 15, 40, 300)
        ]);
        
        showSite();
    }, 1500);
});