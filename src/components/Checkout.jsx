import { useContext } from 'react';
import { Modal } from './UI/Modal';
import { CartContext } from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import { Input } from './UI/Input';
import { Button } from './UI/Button';
import { UserProgressContext } from '../store/UserProgressContext';
import { createOrder } from '../api/meals-api';
import { Error } from './UI/Error';

export const Checkout = () => {
  const cartCtx = useContext(CartContext);

  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

  const { mutate, isSuccess, isPending, error, isError, reset } = createOrder();

  const hideCheckout = () => userProgressCtx.hideCheckout();

  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    reset();
  };

  const handleCreateOrder = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const orderData = Object.fromEntries(formData);
    mutate({ items: cartCtx.items, customerData: orderData });
  };

  let actions = (
    <>
      <Button type='button' textOnly onClick={hideCheckout}>
        Close
      </Button>
      <Button type='submit'>Submit Order</Button>
    </>
  );

  if (isPending) {
    actions = <span>Sending order data...</span>;
  }

  if (isSuccess) {
    return (
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully!</p>
        <p className='modal-action'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={hideCheckout}>
      <form onSubmit={handleCreateOrder}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label='Full name' type='text' id='name' />
        <Input label='Email' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        {isError && <Error title='Failed to submit order' message={error.message} />}
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
};
