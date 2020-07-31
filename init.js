import * as wasm from './pkg';

window.wasm_fib = wasm.fib;

window.js_fib = (n) => {
    return n < 2 ? n : window.js_fib(n - 1) + window.js_fib(n - 2);
};

window.timer = (func, n) => {
    let delta = new Date().getTime();
    const result = func(n);
    delta = (new Date().getTime() - delta) / 1000.0;
    return [delta, result];
};
