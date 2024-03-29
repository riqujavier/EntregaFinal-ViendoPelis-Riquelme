import { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 
import { CartContext } from '../CartContext/CartContext';


const Item = ({ peli }) => {
    const { addItem, isInCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addItem(peli, quantity);
    };

    return (
        <Col>
            <Card className="item-container"> 
                <Card.Img variant="top" src={peli.poster_path} />
                <Card.Body>
                    <Card.Title>{peli.title}</Card.Title>
                    <Card.Text>{peli.description}</Card.Text>
                    <div>
                        <Button variant="primary" onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1 || isInCart(peli.id)}>-</Button>
                        <span >{quantity}</span>
                        <Button variant="primary" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= peli.stock }>+</Button>
                    </div>
                    <Button 
                        
                        variant="primary" 
                        onClick={handleAddToCart}
                        disabled={quantity  > peli.stock} 
                        className='button-item'
                    >
                        <MdOutlineShoppingCart className="icon" />
                        {quantity  > peli.stock ? 'Ya en el carrito' : `Agregar al carrito - ${peli.price}`}
                    </Button>
                    <Link to={{ pathname: `/pelicula/${peli.categoryId}`, state: { peli: peli } }} >
                        <Button className='button-item'
                            
                        >
                            Mostrar más detalles
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Item;
