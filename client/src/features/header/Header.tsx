import { useContext } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { TokenContext } from '../../contexts/token';
import './Header.css';

export function Header() {
  const context = useContext(TokenContext);

  if (!context) {
    throw new Error('TokenContext is not available');
  }

  const { token, setToken } = context;

  const handleTokenChange = (value: string) => {
    setToken(value);
  };

  return (
    <header id="header">
      <section className="main">
        <h1>CREDIT CAPACITY DASHBOARD</h1>
        <Button>Refresh Data</Button>
      </section>
      <section className="auth">
        <div>
          <Input
            label="AUTHENTICATION TOKEN: "
            value={token ?? ''}
            onChange={handleTokenChange}
          />
        </div>
        <p>status: </p>
      </section>
    </header>
  );
}
