# FirstRust

Requirements:

cargo, npm, python3, and wasm-pack must be installed.

To build and launch the FirstRust app:

1. npm run all
2. cd deploy
3. ./run.py

Use a competent browser to navigate to the ip:port address indicated.
By default, a tab-less Chrome window will attempt to launch.
The page does not show anything on-screen. Open up developer tools (F12).
In the console, enter:
timer(wasm_fib, 35)

The above will time the rust+wasm Fibonacci implementation.

To time the JS implementation, enter:
timer(js_fib, 35)
