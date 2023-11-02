import React from 'react';
import ReactDOM from 'react-dom';
import Player from './component/Player';

const App = () => {
    return (
        <Player />
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;