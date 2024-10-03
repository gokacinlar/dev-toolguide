import { Template } from "./helper.js";

export class AppCalculations extends HTMLElement {
    private template: Template;
    private classes: { [key: string]: string };
    private Ids: { [key: string]: string }

    constructor() {
        super();
        this.template = new Template();

        this.classes = {
            ul: "app-calc-ul d-flex flex-row gap-2 align-items-center justify-content-start",
            button: "app-calc-nav-button btn btn-info border-2 border-dark border-opacity-50 text-light w-100 fs-5 shadow-md rounded-3",
            componentElement: "app-calc-component-element"
        };

        this.Ids = {
            basicCalculator: "basicCalculator"
        }

        const styles = `
            @import url(/src/lib/css/fastbootstrap.css);
            @import url(/assets/css/custom.css);
        `;

        const template = this.template.createTemplate(styles, this.appCalculations());
        this.attachShadow({ mode: "open" });
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }

    // Render the main template
    public appCalculations(): string {
        return `
            <ul class="${this.classes.ul}">
                <li><button class="${this.classes.button}" data-page="${this.Ids.basicCalculator}">Calculator</button></li>
            </ul>
            <div id="content">
                <div class="${this.classes.componentElement}" id="basicCalculator" style="display: none;">${this.basicCalculator()}</div>
            </div>
        `;
    }

    // Function to open corresponding data-page in DOM through buttons
    private handleNavigation() {
        const navButtons = this.shadowRoot?.querySelectorAll<HTMLButtonElement>(".app-calc-nav-button");

        if (navButtons) {
            navButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const pageName = button.getAttribute("data-page");
                    this.openPage(pageName);
                });
            });
        }
    }

    // Function to enable tab switching
    public openPage(pageName: string | null) {
        // Hide all tab content first
        const tabcontent = this.shadowRoot?.querySelectorAll<HTMLElement>(".app-calc-component-element");
        if (tabcontent) {
            tabcontent.forEach((content) => {
                content.style.display = "none";
            });
        }

        // Remove active class from all navigation buttons next
        const tabNavigation = this.shadowRoot?.querySelectorAll<HTMLButtonElement>(".app-calc-nav-button");
        if (tabNavigation) {
            tabNavigation.forEach((button) => {
                button.classList.remove("active");
            });
        }

        // Show the selected page based on user selection through buttons
        const blockElem = this.shadowRoot?.getElementById(pageName || "");
        if (blockElem) {
            blockElem.style.display = "block";
        } else {
            console.warn(`Element with id "${pageName}" not found.`);
        }

        // Add active class to the corresponding navigation button to display the content
        const activeButton = this.shadowRoot?.querySelector<HTMLButtonElement>('.app-calc-nav-button[data-page="' + pageName + '"]');
        if (activeButton) {
            activeButton.classList.add("active");
        } else {
            console.warn(`Button with data-page="${pageName}" not found.`);
        }
    }

    // Calculator itself
    public basicCalculator(): string {
        return `
            <div>
                <h2>Basic Calculator</h2>
                <p>This is the content for the Basic Calculator component.</p>
            </div>
        `;
    }

    // Use connectedCallback to manage tab switching
    connectedCallback() {
        this.handleNavigation(); // Set up event listeners for navigation buttons
        this.openPage("basicCalculator"); // Open the default page
    }
}

customElements.define("app-calculations", AppCalculations);