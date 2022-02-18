import wisper from "../assets/images/logos/wisper.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={wisper} width={130} alt="wisper logo" />
    </Link>
  );
};

export default Logo;
