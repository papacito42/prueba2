import {Button, Container, Navbar, Modal} from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from "../CartContext";
import CartProduct from './CartProduct';

function NavbarComponent() {
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        try {
          const response = await fetch('https://checkout.stripe.com/', {
            mode: 'no-cors',
            method: "POST",
            headers: {
              'Authorization': `Bearer ${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}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
          });
          const responseJson = await response.json();
          if (responseJson.url) {
            window.location.assign(responseJson.url);
          } else {
            console.error('Unexpected response from Stripe API:', responseJson);
          }
        } catch (error) {
          console.error('Error making checkout request:', error);
        }
      };
    
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">Canna Boys</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>Carrito ({productsCount} Productos)</Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Carrito De Compras</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                        <>
                            <p>Articulos en tu carrito:</p>
                            {cart.items.map( (currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            <Button variant="success" onClick={checkout}>
                                Comprar!
                            </Button>
                        </>
                    :
                        <h1>No hay articulos en tu carrito!</h1>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NavbarComponent;
