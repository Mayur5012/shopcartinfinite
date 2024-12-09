import NavBar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";
import Footer from "../features/common/Footer";
import { selectUserInfo } from "../features/user/userSlice";
import Navbarb from "../features/navbar/Navbarb";
import { useSelector } from "react-redux";


function ProductDetailPage() {
    const userInfo = useSelector(selectUserInfo);
    return ( 
        <div>
            {userInfo ? <NavBar /> : <Navbarb />}
                <ProductDetail></ProductDetail>
            {/* <NavBar>
                <ProductDetail></ProductDetail>
            </NavBar> */}
            <Footer></Footer>
        </div>
     );
}

export default ProductDetailPage;