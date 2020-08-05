import './style.css';

import * as wasm from './pkg';
import ReactRoot from './ReactRoot.jsx';

////////////////////////////////////////////////////////////////////
// global scope

window.DEFAULT = 30;

window.rs_fib = wasm.fib;

window.js_fib = (n) => {
    return n < 2 ? n : window.js_fib(n - 1) + window.js_fib(n - 2);
};

window.timer = async (func, n) => {
    const t1 = performance.now();
    const result = await func(n);
    return [(performance.now() - t1) / 1000.0, result];
};

// function wrapper to display loading screen
window.loadWhile = (func) => {
    window.i_ReactRoot.current.setState({
        loading: window.i_ReactRoot.current.state.loading + 1,
    });

    // setTimeout is required for not blocking main thread
    setTimeout(async () => {
        window.result = await func();

        // counter is used to track multiple function calls
        window.i_ReactRoot.current.setState({
            loading: window.i_ReactRoot.current.state.loading - 1,
        });
    }, 0);
};

window.iter = (x) => {
    const input = prompt(
        'JavaScript vs Rust+Wasm benchmark using fibonacci(n)\n\n' +
            'enter n (may need more than a minute for n >= 45):',
        x.toString()
    );

    if (input === null) {
        return;
    }

    x = Math.max(0, parseInt(input, 10));
    x = isNaN(x) ? window.DEFAULT : x;

    window.loadWhile(async () => {
        const y = await Promise.all([
            window.timer(window.js_fib, x),
            window.timer(window.rs_fib, x),
        ]);

        setTimeout(() => {
            alert(
                `JavaScript: fibonacci(${x}) == ${y[0][1]} (${y[0][0]} seconds)\n` +
                    `Rust+Wasm: fibonacci(${x}) == ${y[1][1]} (${y[1][0]} seconds)`
            );
        }, 0);
    });
};

window.i_ReactRoot = React.createRef();

////////////////////////////////////////////////////////////////////

$(document).ready(async () => {
    window.addEventListener(
        'wheel',
        (evt) => {
            if (evt.ctrlKey) evt.preventDefault();
        },
        { passive: false }
    );

    const root_div = $('<div id="root" />');
    $('body').append(root_div);
    ReactDOM.render(<ReactRoot ref={window.i_ReactRoot} />, root_div[0]);
});
