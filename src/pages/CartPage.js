import Cart from "../features/cart/Cart";
import Footer from "../features/common/Footer";
import NavBar from "../features/navbar/Navbar";
import Navbarb from "../features/navbar/Navbarb";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../src/features/user/userSlice";
function CartPage() {
    const userInfo = useSelector(selectUserInfo);
    return <div>
        {userInfo ? <NavBar /> : <Navbarb />}
        <div className="mb-14">
        <Cart></Cart>
        </div>
        <Footer></Footer>
    </div>;
}

export default CartPage;