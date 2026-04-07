import xtLogo from "../assets/images/logos/xt-logo.jpg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={xtLogo} width={130} alt="XT logo" />
    </Link>
  );
};

export default Logo;
