import { Separator } from './components/separator';
import { TokenProvider } from './contexts/token';
import { Header } from './features/header';
import { Main } from './features/main';

export function App() {
  return (
    <TokenProvider>
      <Header />
      <Separator />
      <Main />
    </TokenProvider>
  );
}
