import * as wasm from './pkg';

const DEFAULT = 30;

window.rs_fib = wasm.fib;

window.js_fib = (n) => {
    return n < 2 ? n : window.js_fib(n - 1) + window.js_fib(n - 2);
};

window.timer = async (func, n) => {
    const t1 = new Date().getTime();
    const result = await func(n);
    return [((new Date().getTime() - t1) / 1000).toFixed(3), result];
};

let main_loop = async () => {
    let x = DEFAULT;
    while (true) {
        const input = prompt(
            'JavaScript vs Rust+Wasm benchmark using fibonacci(n)\n\n' +
                'enter n (may need more than a minute for n >= 45):',
            x.toString()
        );
        x = Math.max(0, parseInt(input, 10));
        x = isNaN(x) ? DEFAULT : x;

        const y = await Promise.all([
            window.timer(window.js_fib, x),
            window.timer(window.rs_fib, x),
        ]);

        alert(
            `JavaScript: fibonacci(${x}) == ${y[0][1]} (${y[0][0]} seconds)\n` +
                `Rust+Wasm: fibonacci(${x}) == ${y[1][1]} (${y[1][0]} seconds)`
        );
    }
};

main_loop();
