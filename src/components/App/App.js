import logo from './logo.svg';
import CountrySearchContainer from '../CountrySearch/CountrySearch'
import './App.css';

const Header = () => (<div className="header">HEADER</div>)

function App() {
  return (
    <div className="App">
      <Header />
     
      <CountrySearchContainer />
    </div>
  );
}

export default App;
