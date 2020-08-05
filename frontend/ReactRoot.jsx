import 'bootstrap';

class ReactRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 0,
        };
    }

    render() {
        return (
            <div className='container-fluid p-0 h-100'>
                <button
                    type='button'
                    aria-label='button'
                    id='btn-crunch'
                    className='btn btn-light fa fa-cogs'
                    title='First Rust!'
                    onClick={() => {}}
                />
                <div
                    className={`loader loader-default ${
                        this.state.loading > 0 ? 'is-active' : ''
                    }`}
                    data-text='Loading...'
                    data-blink
                />
            </div>
        );
    }
}

export default ReactRoot;
