import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from './components/Header';
import { Meals } from './components/Meals';
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';

function App() {
  const queryClient = new QueryClient();

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </QueryClientProvider>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
