import './App.css';
import { Separator } from './components/separator';
import { TokenProvider } from './contexts/token';
import { Header } from './features/header';
import { Main } from './features/main';

function App() {
  return (
    <TokenProvider>
      <Header />
      <Separator />
      <Main />
    </TokenProvider>
  );
}

export default App;
