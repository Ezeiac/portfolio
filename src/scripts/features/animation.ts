import { getNodes } from "../nodes";

document.addEventListener("DOMContentLoaded", () => {
    const nodes = getNodes()
    const title = nodes.title
    const subtitle = nodes.subtitle

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const h1Text = "Ezequiel Arena";
    const h2Text = "Desarrollador frontend";

    const h1Array = h1Text.split("");
    const h2Array = h2Text.split("");

    const storage = window.localStorage.getItem('animation')

    const generateText = (
        container: HTMLElement,
        text: Array<string>,
        minChanges: number = 10,
        maxChanges: number = 40,
        delay: number,
        isTrue: boolean) => {

        let indexLastLetter = 0
        const totalLetras = text.length;

        text.forEach((initL, index) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('letter', 'text-center', 'w-fit');
            let timeToChange = 300

            const newP = document.createElement('p');

            newDiv.appendChild(newP);
            container.appendChild(newDiv);

            const largoAleatorio = Math.floor(Math.random() * (maxChanges - minChanges + 1)) + minChanges;

            let currentChanges = 0;

            setTimeout(() => {
                function ejecutarCambio() {
                    currentChanges++;

                    if (currentChanges >= largoAleatorio) {
                        newP.textContent = text[index] ?? " ";
                        indexLastLetter++;
                        if (indexLastLetter === totalLetras && isTrue) {
                            showSite(300)
                        }
                        return;
                    }

                    const randomIndex = Math.floor(Math.random() * letters.length);
                    const randomMayus = Math.random()

                    newP.textContent = randomMayus > 0.5
                        ? letters[randomIndex].toUpperCase()
                        : letters[randomIndex];

                    if (currentChanges <= 28) {
                        timeToChange = timeToChange * 0.85;
                        if (timeToChange < 80) timeToChange = 80;
                    } else {
                        timeToChange = timeToChange * 1.15;
                    }
                    setTimeout(ejecutarCambio, timeToChange);
                }
                ejecutarCambio();
                setTimeout(() => {
                    container.classList.remove('opacity-0')
                }, delay);
            }, 1500);

        });

    }

    const showSite = (delay: number) => {
        if (!nodes.hidden) return;
        const sect = document.getElementById('sect')
        nodes.hidden.classList.remove("hidden");

        void nodes.menu?.offsetHeight;

        setTimeout(() => {
            requestAnimationFrame(() => {
                nodes.hidden?.classList.remove("opacity-0", "translate-y-4");
                nodes.aboutMe?.classList.remove("opacity-0", "translate-y-4");

                title?.classList.remove('opacity-0');
                subtitle?.classList.remove('opacity-0');

                sect?.classList.remove("opacity-0");
            });
        }, delay);
    };

    if (!title || !subtitle) return

    if (storage === "false") {
        title.classList.remove('opacity-0')
        subtitle.classList.remove('opacity-0')
        title.innerText = h1Text
        subtitle.innerText = h2Text
        setTimeout(() => {
            showSite(300)
        }, 1200);
        return
    }


    generateText(title, h1Array, 10, 30, 0, false)
    generateText(subtitle, h2Array, 15, 40, 300, true)

});