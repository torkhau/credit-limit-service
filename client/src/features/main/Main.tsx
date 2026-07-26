import { useContext } from 'react';
import { CapacityContext } from '../../contexts/userData';
import { numberToCurrency } from '../../utils/numberToCurrency';
import './Main.css';

export function Main() {
  const capacityCtx = useContext(CapacityContext);

  if (!capacityCtx) {
    throw new Error('CapacityContext is not available');
  }

  const { capacity } = capacityCtx;

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
        <div style={{ borderColor: 'green' }}>
          <h2>Reservation</h2>
          <div></div>
        </div>
      </section>
    </main>
  );
}
