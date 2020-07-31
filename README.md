# first_rust

Requirements:

cargo, wasm-pack and npm must be installed.

To build and launch the wasm-server:

1. npm run all
2. cd dist; ../node_modules/.bin/wasm-server

Use a competent browser to navigate to 127.0.0.1:3000.
This shows nothing on-screen. Open up developer tools.
In the console, enter:
timer(wasm_fib, 35)

The above will time the rust+wasm Fibonacci implementation.

To time the JS implementation, enter:
timer(js_fib, 35)
