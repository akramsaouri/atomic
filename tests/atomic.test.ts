import { Atomic } from "../src/atomic";

class TestElement extends Atomic {
    render() {
        return "<div>Test Element</div>";
    }
}

customElements.define("test-element", TestElement);

describe("Atomic", () => {
    it("should create an instance of TestElement", () => {
        const element = new TestElement();
        expect(element).toBeInstanceOf(TestElement);
    });

    it("should render content in shadow DOM", () => {
        const element = new TestElement();
        document.body.appendChild(element);
        expect(element.shadowRoot?.innerHTML).toBe("<div>Test Element</div>");
    });
});
