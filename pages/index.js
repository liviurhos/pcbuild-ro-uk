import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PCBuilder() {
  const [country, setCountry] = useState('ro');
  const [component, setComponent] = useState('RTX 4070');
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/preturi?produs=${component}&country=${country}`);
      setPrices(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrices();
  }, [component, country]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>PC Build UK & RO</h1>
      <p style={{ textAlign: 'center' }}>
        Alege țara: 
        <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ margin: '0 10px' }}>
          <option value="ro">🇷🇴 România</option>
          <option value="uk">🇬🇧 UK</option>
        </select>
      </p>
      <p>
        Alege componentă: 
        <select value={component} onChange={(e) => setComponent(e.target.value)} style={{ margin: '0 10px' }}>
          <option>RTX 4070</option>
          <option>i5-13600K</option>
          <option>RTX 4070 Ti</option>
          <option>32GB RAM DDR5</option>
        </select>
        <button onClick={fetchPrices} style={{ marginLeft: '10px' }}>Actualizează</button>
      </p>
      {loading ? <p style={{ textAlign: 'center' }}>Se încarcă...</p> : prices && (
        <div style={{ display: 'grid', gap: '10px' }}>
          <h2>Prețuri pentru {component}</h2>
          {country === 'ro' ? (
            <>
              <p><strong>OLX:</strong> {prices.olx.pret} RON <a href={prices.olx.link} target="_blank">Cumpără</a></p>
              <p><strong>eMAG:</strong> {prices.emag.pret} RON <a href={prices.emag.link} target="_blank">Cumpără</a></p>
              <p><strong>PC Garage:</strong> {prices.pcgarage.pret} RON <a href={prices.pcgarage.link} target="_blank">Cumpără</a></p>
            </>
          ) : (
            <>
              <p><strong>Amazon UK:</strong> {prices.amazon.pret} GBP <a href={prices.amazon.link} target="_blank">Cumpără</a></p>
              <p><strong>eBay UK:</strong> {prices.ebay.pret} GBP <a href={prices.ebay.link} target="_blank">Cumpără</a></p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
