import * as wasm from './pkg';

window.wasm_fib = wasm.fib;

window.js_fib = (n) => {
    return n < 2 ? n : window.js_fib(n - 1) + window.js_fib(n - 2);
};

window.timer = (func, n) => {
    console.time();
    const result = func(n);
    console.timeEnd();
    return result;
};
