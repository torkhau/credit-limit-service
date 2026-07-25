import { useContext, useState } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { TokenContext } from '../../contexts/token';
import './Header.css';

export function Header() {
  const context = useContext(TokenContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!context) {
    throw new Error('TokenContext is not available');
  }

  const { token, setToken } = context;

  const handleTokenChange = (value: string) => {
    setToken(value);
  };

  const handleRefreshData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/capacity', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <header id="header">
      <section className="main">
        <h1>CREDIT CAPACITY DASHBOARD</h1>
        <Button disabled={!token || loading} onClick={handleRefreshData}>Refresh Data</Button>
      </section>
      <section className="auth">
        <div>
          <Input
            label="AUTHENTICATION TOKEN: "
            value={token ?? ''}
            onChange={handleTokenChange}
          />
        </div>
        <p>status: {loading ? 'Loading...' : authenticated ? 'Authenticated' : 'Not Authenticated'}</p>
      </section>
    </header>
  );
}
