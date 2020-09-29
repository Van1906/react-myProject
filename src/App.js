import React from 'react';
import './App.css';
import Product from './less-4-homework/Product';

function App() {
  return (
    <div>
          <table>
            <caption>Products Table</caption>
            <thead>
                <tr>	
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <Product name='Apple' price={5} description='Fresh apples from Armenia'/>
                <Product name='Banaba' price={7} description='Fresh bananas from Ecuador'/>
                <Product name='Pich' price={6} description='Fresh pich from Ecuador'/>
            </tbody>
            </table>
    </div>
  );
}

export default App;
