import './style.css';

import * as wasm from './pkg';
import ReactRoot from './ReactRoot.jsx';

////////////////////////////////////////////////////////////////////
// global scope

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
