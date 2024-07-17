<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <atomic-counter ref="counter"></atomic-counter>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
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

@Options({
    props: {
        msg: String,
    },
})
export default class HelloWorld extends Vue {
    msg!: string;

    mounted() {
        console.log("Atomic Counter element:", this.$refs.counter);
    }
}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
