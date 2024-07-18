# Atomic

Atomic is a zero-dependecy, framework-agnostic library for composing microfrontends using web components with built-in state management and event handling.

## Features

-   Easy creation of custom elements
-   Built-in state management
-   Event bus for component communication
-   Framework agnostic - works with React, Vue, Angular, or vanilla JS
-   TypeScript support

## Limitations

-   No support for server side rendering

## Installation

Install the package using npm:

```bash
npm install atomic-library
```

## Basic Usage

Here's a simple example of how to create a custom element using Atomic:

```typescript
import { Atomic } from "atomic-library";

class MyCounter extends Atomic {
    atom = {
        count: parseInt(this.getAttribute("initial-count") || "0", 10),
    };

    increment = () => {
        this.setAtom({ count: this.atom.count + 1 });
    };

    render() {
        return `
      <div>
        <h2>My Counter</h2>
        <p>Count: ${this.atom.count || 0}</p>
        <button data-event="click:increment">Increment</button>
      </div>
    `;
    }
}

customElements.define("my-counter", MyCounter);
```

You can then use this custom element in your HTML:

```html
<my-counter initial-count="10"></my-counter>
```

## Framework Support

Atomic works with any web framework or vanilla JavaScript. Here are examples of how to use it with popular frameworks:

-   [React Example](./examples/atomic-react-example)
-   [Vue Example](./examples/atomic-vue-example/)
-   _More to come..._

## Rendering Content

The `render` method in your Atomic component defines the HTML content. It should return a string of HTML:

```typescript
render() {
  return `
    <div>
      <h1>${this.atom.title}</h1>
      <p>${this.atom.content}</p>
    </div>
  `;
}
```

## Using Atomic State

Atomic provides built-in state management through the `atom` object and `setAtom` method:

```typescript
class MyComponent extends Atomic {
    constructor() {
        super();
        this.setAtom({ count: 0 });
    }

    increment = () => {
        this.setAtom({ count: this.atom.count + 1 });
    };

    render() {
        return `
      <div>Count: ${this.atom.count}</div>
      <button data-event="click:increment">Increment</button>
    `;
    }
}
```

## Event Bus API

Atomic includes an event bus for communication between components:

```typescript
// In one component
class Item extends Atomic {
    addToCart() {
        const sku = this.getAttribute("sku");
        const price = this.getAttribute("price");
        this.signal("add-to-cart", { sku, price });
    }

    render() {
        const sku = this.getAttribute("sku") || "";
        const price = this.getAttribute("price") || "0.00";
        return `<button type="button" data-event="click:addToCart">Buy for ${price} € (SKU: ${sku})</button>`;
    }
}

// In another component
class CartInfo extends Atomic {
    atom = {
        cartItems: [],
    };

    subscribers = [{ name: "add-to-cart", cb: this.updateCart }];

    updateCart(event) {
        const { sku, price } = event.detail;
        this.setAtom({
            cartItems: [...this.atom.cartItems, { sku, price }],
        });
    }

    render() {
        const { cartItems } = this.atom;
        const cartContent = cartItems.length
            ? cartItems
                  .map(
                      (item) =>
                          `<li>SKU: ${item.sku}, Price: ${item.price} €</li>`
                  )
                  .join("")
            : "<li>Cart is empty</li>";

        return `
                        <div>
                            <h3>Cart Contents:</h3>
                            <ul>${cartContent}</ul>
                        </div>
                    `;
    }
}
```

## Microfrontend Architecture

In a microfrontend architecture, Atomic components can be used as standalone modules. Here's an example of how different teams could develop and integrate components:

Team A (Header Component):

```typescript
class HeaderComponent extends Atomic {
    render() {
        return `<header>...</header>`;
    }
}
customElements.define("app-header", HeaderComponent);
```

Team B (Main Content Component):

```typescript
class MainContentComponent extends Atomic {
    render() {
        return `<main>...</main>`;
    }
}
customElements.define("app-main-content", MainContentComponent);
```

Team C (Footer Component):

```typescript
class FooterComponent extends Atomic {
    render() {
        return `<footer>...</footer>`;
    }
}
customElements.define("app-footer", FooterComponent);
```

These components can then be used together in the main application:

```html
<body>
    <app-header></app-header>
    <app-main-content></app-main-content>
    <app-footer></app-footer>
</body>
```

Each team can develop and deploy their components independently, and they will work together seamlessly in the main application.
