type Subscriber = {
    name: string;
    cb: EventListener;
};

export class Atomic extends HTMLElement {
    protected atom: Record<string, any> = {};
    protected subscribers: Subscriber[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(): void {
        this._appendToShadowRoot();
        this._attachEvents();
        this._subscribe();
    }

    disconnectedCallback(): void {
        this._unsubscribe();
    }

    attributeChangedCallback(
        _: string,
        newValue: string,
        oldValue: string
    ): void {
        if (newValue !== oldValue) {
            this._appendToShadowRoot();
            this._attachEvents();
        }
    }

    protected _attachEvents(): void {
        const root = this.shadowRoot;
        if (root) {
            root.querySelectorAll("[data-event]").forEach((el) => {
                const eventData = (el as HTMLElement).dataset.event;
                if (eventData) {
                    const [event, method] = eventData.split(":");
                    if (
                        method &&
                        typeof this[method as keyof this] === "function"
                    ) {
                        el.addEventListener(
                            event,
                            (this[method as keyof this] as Function).bind(this)
                        );
                    }
                }
            });
        }
    }

    protected _appendToShadowRoot(): void {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = this.render();
        }
    }

    protected _subscribe(): void {
        this.subscribers.forEach(({ name, cb }) => {
            document.addEventListener(name, cb.bind(this));
        });
    }

    protected _unsubscribe(): void {
        this.subscribers.forEach(({ name, cb }) => {
            document.removeEventListener(name, cb);
        });
    }

    setAttribute(name: string, value: string): void {
        super.setAttribute(name, value);
        this._appendToShadowRoot();
        this._attachEvents();
    }

    signal = (name: string, detail: any): void => {
        this.dispatchEvent(
            new CustomEvent(name, { detail, bubbles: true, composed: true })
        );
    };

    setAtom(args: Record<string, any>): void {
        this.atom = {
            ...this.atom,
            ...args,
        };
        this._appendToShadowRoot();
        this._attachEvents();
    }

    protected render(): string {
        return "";
    }
}
