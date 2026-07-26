import { useContext, useState } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { TokenContext } from '../../contexts/token';
import { CapacityContext } from '../../contexts/userData';
import './Header.css';

export function Header() {
  const tokenCtx = useContext(TokenContext);
  const capacityCtx = useContext(CapacityContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!tokenCtx || !capacityCtx) {
    throw new Error('TokenContext or CapacityContext is not available');
  }

  const { token, setToken } = tokenCtx;
  const { setCapacity } = capacityCtx;

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
        setCapacity(await response.json());
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
