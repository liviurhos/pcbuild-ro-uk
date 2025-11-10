import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PCBuilder() {
  const [country, setCountry] = useState('ro');
  const [component, setComponent] = useState('RTX 4070');
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(false);

  const components = {
    'RTX 4070': 'https://m.media-amazon.com/images/I/61jhb6Z2WYL._AC_SL1500_.jpg',
    'i5-13600K': 'https://m.media-amazon.com/images/I/41+0Y4Y0Y0L._AC_SL1500_.jpg',
    'RTX 4070 Ti': 'https://m.media-amazon.com/images/I/71+0Y4Y0Y0L._AC_SL1500_.jpg',
    '32GB RAM DDR5': 'https://m.media-amazon.com/images/I/51+0Y4Y0Y0L._AC_SL1500_.jpg'
  };

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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">PC Build UK & RO 🚀</h1>
        <div className="flex justify-center mb-6">
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="mr-4 p-2 border rounded">
            <option value="ro">🇷🇴 România</option>
            <option value="uk">🇬🇧 UK</option>
          </select>
        </div>
        <div className="flex justify-center mb-6">
          <select value={component} onChange={(e) => setComponent(e.target.value)} className="mr-4 p-2 border rounded">
            <option>RTX 4070</option>
            <option>i5-13600K</option>
            <option>RTX 4070 Ti</option>
            <option>32GB RAM DDR5</option>
          </select>
          <button onClick={fetchPrices} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Actualizează</button>
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Se încarcă prețuri live...</p>
        ) : prices ? (
          <div className="grid gap-4">
            <h2 className="text-2xl font-semibold text-center">Prețuri pentru {component}</h2>
            <img src={components[component]} alt={component} className="w-48 h-48 mx-auto rounded shadow-lg mb-4" />
            {country === 'ro' ? (
              <>
                <div className="bg-white p-4 rounded shadow-md">
                  <span className="bg-green-200 px-2 py-1 rounded text-sm">Second-hand</span>
                  <p className="text-lg font-bold">OLX: {prices.olx.pret} RON</p>
                  <a href={prices.olx.link} target="_blank" rel="nofollow" className="bg-green-500 text-white px-4 py-2 rounded">Cumpără pe OLX</a>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                  <span className="bg-blue-200 px-2 py-1 rounded text-sm">Nou</span>
                  <p className="text-lg font-bold">eMAG: {prices.emag.pret} RON</p>
                  <a href={prices.emag.link} target="_blank" rel="nofollow" className="bg-blue-500 text-white px-4 py-2 rounded">Cumpără pe eMAG</a>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                  <p className="text-lg font-bold">PC Garage: {prices.pcgarage.pret} RON</p>
                  <a href={prices.pcgarage.link} target="_blank" rel="nofollow" className="bg-gray-500 text-white px-4 py-2 rounded">Cumpără pe PC Garage</a>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white p-4 rounded shadow-md">
                  <p className="text-lg font-bold">Amazon UK: {prices.amazon.pret} GBP</p>
                  <a href={prices.amazon.link} target="_blank" rel="nofollow" className="bg-orange-500 text-white px-4 py-2 rounded">Cumpără pe Amazon</a>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                  <p className="text-lg font-bold">eBay UK: {prices.ebay.pret} GBP</p>
                  <a href={prices.ebay.link} target="_blank" rel="nofollow" className="bg-yellow-500 text-white px-4 py-2 rounded">Cumpără pe eBay</a>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">Selectează o componentă pentru prețuri.</p>
        )}
      </div>
    </div>
  );
}
