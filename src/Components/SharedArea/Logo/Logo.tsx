import "./Logo.css";
import src from "../../../Assets/Images/shopping_cart.png"

function Logo(): JSX.Element {
    return (
        <div className="Logo">
			<img src={src} alt="Logo" />
        </div>
    );
}

export default Logo;
