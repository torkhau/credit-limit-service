import { useContext, useState } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Select } from '../../components/select';
import { Separator } from '../../components/separator';
import { TokenContext } from '../../contexts/token';
import { CapacityContext } from '../../contexts/userData';
import { numberToCurrency } from '../../utils/numberToCurrency';
import './Main.css';

type reserveCapacityData = {
  amount: string;
  currency?: string;
};

export function Main() {
  const [reserveData, setReserveData] = useState<reserveCapacityData>({
    amount: '',
    currency: undefined,
  });
  const [loading, setLoading] = useState(false);

  const tokenCtx = useContext(TokenContext);
  const capacityCtx = useContext(CapacityContext);

  if (!tokenCtx || !capacityCtx)
    throw new Error('TokenContext or CapacityContext is not available');

  const { capacity } = capacityCtx;
  const { token, isAuthorized } = tokenCtx;

  const selectedCurrency = reserveData.currency || capacity?.baseCurrency || '';
  const options = capacity?.currencyList.map((currency) => ({
    value: currency,
    label: currency,
  }));

  const handleReserveCapacity = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/capacity/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(reserveData.amount),
          currency: reserveData.currency,
        }),
      });

      if (response.ok) {
        alert('Capacity reserved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to reserve capacity: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error reserving capacity:', error);
      alert('An error occurred while reserving capacity.');
    } finally {
      setLoading(false);
    }
  };

  const handleReleaseCapacity = async (reservationId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/v1/capacity/release/${reservationId}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        alert('Capacity released successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to release capacity: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error releasing capacity:', error);
      alert('An error occurred while releasing capacity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main">
      <section className="capacity">
        <div>
          <h2>Current capacity</h2>
          {capacity ? (
            <div className="current-capacity">
              <div className="card">
                <p>Total</p>
                <h2>
                  {numberToCurrency(
                    capacity.totalCapacity,
                    capacity.baseCurrency,
                  )}
                </h2>
              </div>
              <div className="card">
                <p>Reserved</p>
                <h2>
                  {numberToCurrency(
                    capacity.reservedCapacity,
                    capacity.baseCurrency,
                  )}
                </h2>
              </div>
              <div className="card">
                <p>Available</p>
                <h2>
                  {numberToCurrency(
                    capacity.availableCapacity,
                    capacity.baseCurrency,
                  )}
                </h2>
              </div>
              <div className="card">
                <p>Base currency</p>
                <h2>{capacity.baseCurrency}</h2>
              </div>
            </div>
          ) : (
            <p>No capacity data available.</p>
          )}
        </div>
        <div>
          <h2>Reservation</h2>
          <div className="reserve-capacity">
            <div className="card">
              <p>Amount</p>
              <Input
                value={reserveData.amount}
                onChange={(value) => {
                  setReserveData({ ...reserveData, amount: value });
                }}
              />
            </div>
            <div className="card">
              <p>Currency</p>
              <Select
                value={selectedCurrency}
                options={options || []}
                onChange={(value) =>
                  setReserveData({ ...reserveData, currency: value })
                }
              />
            </div>
            <Button
              disabled={!isAuthorized || loading}
              onClick={handleReserveCapacity}
            >
              Reserve capacity
            </Button>
          </div>
        </div>
      </section>
      <Separator />
      <section>
        <h2>Reserved Capacity</h2>
        {capacity?.reservedCapacityList &&
        capacity.reservedCapacityList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Amount</th>
                <th>Amount in {capacity?.baseCurrency || ''}</th>
                <th>Currency</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {capacity.reservedCapacityList.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td>{reservation.reservationId}</td>
                  <td>
                    {numberToCurrency(
                      reservation.amount,
                      capacity.baseCurrency,
                    )}
                  </td>
                  <td>
                    {reservation.baseAmount !== undefined
                      ? numberToCurrency(
                          reservation.baseAmount,
                          capacity.baseCurrency,
                        )
                      : 'N/A'}
                  </td>
                  <td>{/*reservation.currency*/}</td>
                  <td>{new Date(reservation.createdAt).toLocaleString()}</td>
                  <td>
                    <Button
                      disabled={!isAuthorized || loading}
                      onClick={() =>
                        handleReleaseCapacity(reservation.reservationId)
                      }
                    >
                      Release
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reservations found.</p>
        )}
      </section>
    </main>
  );
}
