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
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
             body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url); // Forwarding user to Stripe
            }
        });
    }

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
