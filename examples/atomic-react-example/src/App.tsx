import React, { useEffect, useRef } from "react";
import { Atomic } from "atomic-lib";

// Define a custom element using Atomic
class AtomicCounter extends Atomic {
    count = 0;

    increment = () => {
        this.count++;
        this.setAtom({ count: this.count });
    };

    render() {
        return `
      <div> 
        <h2>Atomic Counter</h2>
        <p>Count: ${this.atom.count || 0}</p>
        <button data-event="click:increment">Increment</button>
      </div>
    `;
    }
}

// Register the custom element
customElements.define("atomic-counter", AtomicCounter);

// React component that uses the custom element
const AtomicCounterWrapper: React.FC = () => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        // You can interact with the Atomic element here if needed
        if (ref.current) {
            console.log("Atomic Counter element:", ref.current);
        }
    }, []);

    return <atomic-counter ref={ref} />;
};

function App() {
    return (
        <div className="App">
            <h1>React App with Atomic</h1>
            <AtomicCounterWrapper />
        </div>
    );
}

export default App;
