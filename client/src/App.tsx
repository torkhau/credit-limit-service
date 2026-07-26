import { Separator } from './components/separator';
import { TokenProvider } from './contexts/token';
import { CapacityProvider } from './contexts/userData';
import { Header } from './features/header';
import { Main } from './features/main';

export function App() {
  return (
    <TokenProvider>
      <CapacityProvider>
        <Header />
        <Separator />
        <Main />
      </CapacityProvider>
    </TokenProvider>
  );
}
