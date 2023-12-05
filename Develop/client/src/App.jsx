import './App.css';
import { ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import client from './utils/apolloClient'; // Import your Apollo Client instance

function App() {
  return (
    <ApolloProvider client={client}> {/* Wrap your app with ApolloProvider */}
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
