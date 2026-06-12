interface FontStyle {
    font: string;
    weight: string;
    size: string;
    color: string;
}

import { getNodes, mediaQ } from "../nodes";

const nodes = getNodes()
const title = nodes.title
const subtitle = nodes.subtitle

document.addEventListener("DOMContentLoaded", () => {

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const h1Text = "Ezequiel Arena";
    const h2Text = "Desarrollador frontend";

    const h1Array = h1Text.split("");
    const h2Array = h2Text.split("");

    let showAll = false;

    const generateText = (
        container: HTMLElement,
        text: Array<string>,
        minCambios: number = 10,
        maxCambios: number = 40,
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

            const largoAleatorio = Math.floor(Math.random() * (maxCambios - minCambios + 1)) + minCambios;

            let cambiosActuales = 0;

            setTimeout(() => {
                function ejecutarCambio() {
                    cambiosActuales++;

                    if (cambiosActuales >= largoAleatorio) {
                        newP.textContent = text[index] ?? " ";
                        indexLastLetter++;
                        if (indexLastLetter === totalLetras && isTrue) {
                            showSite()
                        }
                        return;
                    }

                    const randomIndex = Math.floor(Math.random() * letters.length);
                    const randomMayus = Math.random()

                    newP.textContent = randomMayus > 0.5
                        ? letters[randomIndex].toUpperCase()
                        : letters[randomIndex];

                    if (cambiosActuales <= 28) {
                        timeToChange = timeToChange * 0.85;
                        if (timeToChange < 80) timeToChange = 80;
                    } else {
                        timeToChange = timeToChange * 1.18;
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

    const showSite = () => {
        if (!nodes.hidden) return
        nodes.hidden.classList.remove("hidden");
        setTimeout(() => {
            if (nodes.hidden) nodes.hidden.classList.remove("opacity-0", "translate-y-4");
            if (nodes.aboutMe) nodes.aboutMe.classList.remove("opacity-0", "translate-y-4");

            if (nodes.menu) {
                nodes.menu.classList.remove("opacity-0", "translate-y-full", "md:-translate-x-full");

                nodes.menu.classList.add("opacity-100", "translate-y-0", "md:translate-x-0");
            }
        }, 500);
    }

    if (!title || !subtitle) return
    generateText(title, h1Array, 10, 30, 0, false)
    generateText(subtitle, h2Array, 15, 40, 300, true)
});


// initArray.forEach((initL, index) => {

//     const minCambios = 8;
//     const maxCambios = 20;
//     const largoAleatorio = Math.floor(Math.random() * (maxCambios - minCambios + 1)) + minCambios;

//     let historialLetra: Array<string> = [];

//     historialLetra.push(initL);
//     for (let i = 0; i < largoAleatorio; i++) {
//         const randomIndex = Math.floor(Math.random() * letters.length);
//         if (i + 1 === 8) {
//             historialLetra.push(finalArray[index] ?? " ")
//         } else {
//             historialLetra.push(letters[randomIndex]);
//         }
//     }

//     arrayRandom.push(historialLetra);

//     const textDev2 = document.getElementById('textDev2')

//     if (textDev2) {
//         const newDiv = document.createElement('div')

//         newDiv.classList.add('letter', 'text-center', "min-w-[13.8px]")
//         textDev2.appendChild(newDiv)

//         const selectDiv = textDev2.querySelectorAll('.letter')

//         historialLetra.forEach((l, i) => {
//             const newP = document.createElement('p')
//             newP.textContent = l
//             selectDiv[index].appendChild(newP)
//         })
//     }
// });