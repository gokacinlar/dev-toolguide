import { Template } from "./helper.js";

// Define an interface for the structure of nested objects within imgSources
interface ImageSource {
    src: string;
    ref: string;
}

// Use Constants for image sources for better readability and maintainability
const IMAGE_SOURCES: { [key: string]: ImageSource } = {
    source: {
        src: "/images/icons/website.svg",
        ref: ""
    },
    github: {
        src: "/images/icons/github.svg",
        ref: "https://github.com/gokacinlar/dev-toolguide"
    },
    webstore: {
        src: "/images/icons/webstore.svg",
        ref: ""
    },
    support: {
        src: "/images/icons/support.svg",
        ref: ""
    }
};

const STYLES = {
    footerStyling: "footer-content py-2 px-2 my-1 mx-1 mb-2 d-flex flex-row align-content-center align-items-center justify-content-between rounded-3 shadow-lg"
};

class Footer extends HTMLElement {
    private templateHelper: Template;
    private version: { [key: string]: string };
    private footerSections: { [key: string]: string };

    constructor() {
        super();
        this.templateHelper = new Template();
        this.footerSections = {
            footerRight: "",
            footerLeft: ""
        };

        this.version = {
            number: "v1.0.0",
        }

        const template = this.templateHelper.createTemplate(this.renderFooter());
        this.appendChild(template.content.cloneNode(true));
    }

    renderFooter(): string {
        return `
            <footer class="${STYLES.footerStyling}">
                <section class="${this.footerSections.footerRight}">
                    ${this.renderFooterRight()}
                </section>
                <section class="${this.footerSections.footerLeft}">
                    ${this.renderFooterLeft()}
                </section>
            </footer>
        `;
    }

    renderFooterRight(): string {
        return `
            <div class="d-flex flex-row gap-1">
                <div id="versionNumber">
                    <h5 class="mb-0 bg-discovery py-2 px-2 rounded-pill">${this.version.number}</h5>
                </div>
                <div>
                    <h5 class="mb-0 bg-discovery py-2 px-2 rounded-pill" id="footerClock"></h5>
                </div>
            </div>
        `;
    }

    renderFooterLeft(): string {
        return `
            <div>
                ${this.renderImageLink(IMAGE_SOURCES.support, "Support")}
                ${this.renderImageLink(IMAGE_SOURCES.source, "Website")}
                ${this.renderImageLink(IMAGE_SOURCES.webstore, "Webstore")}
                ${this.renderImageLink(IMAGE_SOURCES.github, "GitHub")}
            </div>
        `;
    }

    // Function to render images in Footer's Right Side
    private renderImageLink(image: ImageSource, title: string): string {
        return `
            <a href="${image.ref}" aria-label="${title}" target="_blank">
                <img src="${image.src}" class="footer-links img-fluid" title="${title}" alt="${title} Icon">
            </a>
        `;
    }

    // Function to display time in H + M + S in the Footer
    private clockTime(elem: HTMLHeadElement): void {
        const clock = new Date();
        let h = clock.getHours();
        let m = clock.getMinutes();
        let s = clock.getSeconds();

        m = this.checkTime(m);
        s = this.checkTime(s);

        elem.innerHTML = h + ":" + m + ":" + s;
    }

    // Add zeroes if the number is less than 10 for UI clarity
    private checkTime(i: number | any) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    connectedCallback() {
        const clock = document.querySelector("#footerClock") as HTMLElement;
        this.clockTime(clock); // Call the function for immediate appearance in the UI
        setInterval(() => this.clockTime(clock), 1000);
    }
}

customElements.define("app-footer", Footer);
