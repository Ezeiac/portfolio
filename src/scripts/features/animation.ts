interface FontStyle {
    font: string;
    weight: string;
    size: string;
    color: string;
}

const PROF_NAME = "Ezequiel Arena";

const ARRAY_FONT: FontStyle[] = [
    { font: "Open Sans, sans-serif", weight: "400", size: "1.75rem", color: "red" },
    { font: "Gill Sans, Calibri, sans-serif", weight: "100", size: "2.125rem", color: "blue" },
    { font: "Trebuchet MS, Arial, sans-serif", weight: "400", size: "2rem", color: "green" },
    { font: "Courier New, Courier, monospace", weight: "700", size: "2.125rem", color: "currentColor" },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const initPort = async () => {
    const boxPres = document.getElementById("boxPres");
    const textDev = document.getElementById("textDev");
    const cursor = document.getElementById("cursor");
    const steps = document.getElementById("steps");
    const hidden = document.getElementById("hiddenIntro");
    const genSite = document.getElementById("genSite");
    const menu = document.getElementById("menu");
    const aboutMe = document.getElementById("aboutMe");

    if (!genSite || !textDev || !steps || !menu || !hidden) return;

    let chSel = 0;

    const toggleChildActive = (index: number) => {
        genSite.children[index]?.classList.toggle("active");
    };

    await delay(1000);
    toggleChildActive(chSel);

    for (const letter of PROF_NAME) {
        const randomTime = (Math.random() * 1000) / 3;
        textDev.textContent += letter;
        await delay(randomTime);
    }

    toggleChildActive(chSel);
    await delay(80);
    chSel++;
    await delay(100);
    toggleChildActive(chSel);

    cursor?.classList.add("hidden");
    textDev.classList.add("w-full");

    const classesToAdd = ["w-full", "items-center", "justify-end"];
    for (const className of classesToAdd) {
        boxPres?.classList.add(className);
        await delay(200);
    }
    await delay(200);

    genSite.style.transform = `translateY(${-30 * chSel}px)`;
    toggleChildActive(chSel);

    await delay(80);
    chSel++;
    await delay(80);
    toggleChildActive(chSel);

    for (const font of ARRAY_FONT) {
        textDev.style.fontFamily = font.font;
        textDev.style.fontWeight = font.weight;
        textDev.style.fontSize = font.size;
        textDev.style.color = font.color;
        textDev.style.borderBottomColor = font.color;

        textDev.classList.add("border-b", "opacity-50", "blur-[1px]");
        await delay(50);
        textDev.classList.remove("opacity-50", "blur-[1px]");
        await delay(150);
    }

    genSite.style.transform = `translateY(${-30 * chSel}px)`;
    toggleChildActive(chSel);
    chSel++;
    toggleChildActive(chSel);

    hidden.classList.remove("hidden");
    await delay(1000);

    steps.style.opacity = "0";
    await delay(400);

    aboutMe?.classList.remove("opacity-0", "translate-y-4");
    aboutMe?.classList.add("opacity-100", "translate-y-0");
    hidden.classList.remove("opacity-0", "translate-y-4");

    handleMenuResponsive(menu);

    await delay(800);
    menu.classList.remove("duration-500");
    steps.style.display = "none";

    localStorage.setItem("initAnimation", "true");

    window.addEventListener("resize", () => handleMenuResponsive(menu));
};

const handleMenuResponsive = (menu: HTMLElement | null) => {
    if (!menu) return;
    if (window.innerWidth < 991) {
        menu.classList.remove("translate-y-full");
        menu.classList.add("lg:-translate-x-full");
    } else {
        menu.classList.remove("lg:-translate-x-full");
        menu.classList.add("translate-y-full");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const hasAnimated = localStorage.getItem("initAnimation");

    if (hasAnimated === "true") {
        const steps = document.getElementById("steps");
        const hidden = document.getElementById("hiddenIntro");
        const menu = document.getElementById("menu");
        const aboutMe = document.getElementById("aboutMe");
        const textDev = document.getElementById("textDev");
        const boxPres = document.getElementById("boxPres");
        const cursor = document.getElementById("cursor");

        boxPres?.classList.add("w-full", "items-center", "justify-end");

        if (steps) steps.style.display = "none";
        if (textDev) textDev.textContent = PROF_NAME;
        if (hidden) hidden.classList.remove("hidden");
        setTimeout(() => {
            if (hidden) hidden.classList.remove("opacity-0", "translate-y-4");
            if (aboutMe) aboutMe.classList.remove("opacity-0", "translate-y-4");
        }, 10);

        handleMenuResponsive(menu);
        window.addEventListener("resize", () => handleMenuResponsive(menu));
    } else {
        initPort();
    }
});