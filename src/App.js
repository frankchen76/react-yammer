import logo from './logo.svg';
import './App.css';

function App() {

    function testHandler(e) {
        e.preventDefault();
        let token = document.location.href.split("=")[1];
        //it has to be api, otherwise, you will see CORS error
        let url = "https://www.yammer.com/api/v1/messages/my_feed.json";
        console.log(`Connect to ${url}`);
        fetch(url, {
            method: 'GET',
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            let jsonString = response.json();
            console.log(jsonString);
        });

    }
    function aadTestHandler(e) {
        //let code = document.location.href.split("&")[0].split("=")[1];
        let url = `https://login.microsoftonline.com/8a5ee357-7de0-4836-ab20-9173b12cdce9/oauth2/v2.0/authorize?client_id=e2b23b83-4856-4029-9284-54b08a285564&response_type=token&redirect_uri=https://localhost:3000&scope=https://api.yammer.com/.default&response_mode=fragment&state=12345&nonce=678910&prompt=none`;
        document.location.href = url;
    }
    function aadCallYammerHandler1(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        let code = document.location.href.split("&")[0].split("=")[1];
        //it has to be api, otherwise, you will see CORS error
        let url = "https://api.yammer.com/api/v1/messages/my_feed.json";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${code}`
            }
        }).then(response => {
            let jsonString = response.json();
            console.log(jsonString);
        });

    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>
                <a href="https://www.yammer.com/dialog/oauth?client_id=HTZElxy9dNKzHUVsRALFCw&redirect_uri=https://localhost:3000/&response_type=token">Yammer Login</a>
                <a href="#" onClick={testHandler}>Yammer Test</a>

                <a href="https://login.microsoftonline.com/8a5ee357-7de0-4836-ab20-9173b12cdce9/oauth2/v2.0/authorize?client_id=e2b23b83-4856-4029-9284-54b08a285564&response_type=code&redirect_uri=https://localhost:3000&scope=openid&response_mode=fragment&state=12345&nonce=678910">AAD Login</a>
                <a href="#" onClick={aadTestHandler}>AAD Access Token</a>
                <a href="#" onClick={aadCallYammerHandler1}>AAD Call Yammer API</a>
            </header>
        </div>
    );
}

export default App;
