import {motion} from "framer-motion";
import {useEffect, useState, useRef} from "react";
import {BsSuitHeartFill} from "react-icons/bs";
import {FaSearch, FaShoppingCart, FaUser} from "react-icons/fa";
import {useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import {HiMenuAlt2} from "react-icons/hi";
import {MdClose} from "react-icons/md";
import {NavLink, useLocation} from "react-router-dom";
import {navBarList} from "../../../constants";
import api from "../../../pages/AuthContext/api";

const Navbar = () => {
    const [publicPath, setPublicPath] = useState("");
    const [productsList, setProductsList] = useState([]);

    // Get data products
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data.products);
                setProductsList(data.products);
            })
            .catch((error) => console.log(error));
    }, []);


    const products = useSelector((state) => state.madamBoutiqueReducer.products);
    const productsFavorite = useSelector(
        (state) => state.madamBoutiqueReducer.productsFavorite
    );
    const [showLogo, setShowLogo] = useState(true);
    const [sidenav, setSidenav] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [userAuth, setUserAuth] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const userRef = useRef(null);
    const searchRef = useRef(null);

    const handleClickOutside = (event) => {
        if (userRef.current && !userRef.current.contains(event.target)) {
            setShowUser(false);
            setSearchQuery("");
        }

        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowSearch(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!showSearch) {
            setSearchQuery("");
        }
    }, [showSearch]);

    // const {userAuth, logout } = useAuthContext();

    const handleEditUser = () => {
        navigate(`../profile`);
    }


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const filtered = productsList.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, productsList]);

    useEffect(() => {
        let hiddenLogo = () => {
            if (window.innerWidth < 667) {
                setShowLogo(false);
            } else {
                setShowLogo(true);
            }
        };
        hiddenLogo();
        window.addEventListener("resize", hiddenLogo);
    }, []);

    useEffect(() => {
        api.get(`/api/auth/user-profile`).then((res) => {
            if (res.data.status === 200) {
                console.log(res.data.user);
                setUserAuth(res.data.user);
            }
        })
            .catch((e) => {
                if (e.response && e.response.status === 401) {
                    navigate('/')
                }
            });
    }, []);

    // const token = sessionStorage.getItem('token');

    const logout = async () => {
        try {
            const response = await api.post('api/auth/logout');
            if (response.status === 200) {
                sessionStorage.removeItem('token');
                setUserAuth(null);
                navigate('/');
            }
        } catch (e) {
            if (e.response && e.response.status === 401) {
                console.log("Error logging out:", e);
                setUserAuth(null);
                sessionStorage.removeItem('token');
            }
        }
    }

    /// Get path to public in server
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products-publicPath', {
            method: "GET", headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setPublicPath(data.publicPath);
            })
            .catch((error) => console.log(error));
    }, []);


    return (
        <header class="text-gray-600 body-font sticky top-0 z-50 bg-white h-full shadow-2xl">
            <div class="max-w-container mx-auto flex flex-wrap h-16 flex-col md:flex-row justify-center relative">
                {showLogo && (
                    <Link
                        to="/"
                        class="flex title-font font-medium items-center text-gray-900 md:mb-0"
                    >
                        <span class="ml-3 text-xl bold">Madam's Boutique</span>
                    </Link>
                )}

                <nav class="md:ml-auto flex flex-wrap items-center text-base justify-end">
                    <div
                        onClick={() => setShowSearch(!showSearch)}
                        class="mr-5 hover:text-gray-900 cursor-pointer"
                    >
                        <FaSearch/>
                    </div>

                    {showSearch && (
                        <motion.div
                            ref={searchRef}
                            initial={{x: 30, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{duration: 0.5}}
                            className="absolute right-40 z-50 h-auto rounded-3xl "
                        >
                            <div className="max-w">
                                <input
                                    onChange={handleSearch}
                                    type="text"
                                    value={searchQuery}
                                    placeholder="Search your products here"
                                    className="w-[200px] relative lg:w-[500px] h-[35px] outline-none text-base bg-gray-300 text-primeColor flex items-center justify-between px-3 rounded-3xl placeholder:text-sm"
                                />
                            </div>
                        </motion.div>
                    )}

                    {searchQuery && (
                        <div
                            className={` mt-2.5 h-96 bg-white top-12 md:right-40 absolute z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
                        >
                            {searchQuery &&
                                filteredProducts.map((item) => (
                                    <div
                                        onClick={() =>
                                            navigate(
                                                `/product/${item.id}`,
                                                {
                                                    state: {
                                                        item: item,
                                                    },
                                                }
                                            ) & setSearchQuery("")
                                        }
                                        key={item._id}
                                        className="max-w-[500px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                                    >
                                        <img className="w-24"
                                             src={item.avatar === 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg' ? 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg' : publicPath + '/' + item.avatar}
                                             alt="productImg"/>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold text-lg">
                                                {item.name}
                                            </p>
                                            <p className="text-xs">{item.desc}</p>
                                            <p className="text-sm">
                                                Price:{" "}
                                                <span className="text-primeColor font-semibold">
                          ${item.price}
                        </span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                    <div
                        onClick={() => setShowUser(!showUser)}
                        class="mr-5 hover:text-gray-900 flex cursor-pointer"
                    >
                        <FaUser/>

                        {/*//*/}
                        {/* <span>{userAuth && userAuth.fullname}</span> */}

                    </div>
                    {showUser && (
                        <motion.ul
                            ref={userRef}
                            initial={{x: 50, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{duration: 0.5}}
                            className="absolute top-12 mt-2.5 right-5 z-50 bg-gray-800 w-40 h-auto text-center rounded-md"
                        >

                            {userAuth ? (
                                <>
                                    {userAuth && userAuth.level !== 4 ? (
                                        <Link to="/dashboard">
                                            <li className="text-slate-200 font-bold text-base w-full px-1 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white bg-gray-600 rounded-t-md hover:text-white duration-300 cursor-pointer">
                                                Go To Dashboard
                                            </li>
                                        </Link>
                                    ) : ''}
                                    <li className="text-gray-400 px-4 py-1.5 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300">
                                        <button onClick={handleEditUser}
                                                className="text-gray-400 w-full hover:text-white">
                                            Profile
                                        </button>
                                    </li>
                                    <li className="text-gray-400 px-4 py-1.5 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 rounded-md">
                                        <button onClick={logout} className="text-gray-400 w-full hover:text-white">
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <Link to="/signin">
                                        <li className="text-gray-400 px-4 py-1.5 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                            Login
                                        </li>
                                    </Link>
                                    <Link onClick={() => setShowUser(false)} to="/signup">
                                        <li className="text-gray-400 px-4 py-1.5 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer rounded-md">
                                            Sign Up
                                        </li>
                                    </Link>
                                </>
                            )}
                        </motion.ul>
                    )}

                    <Link to="/favorite">
                        <div class="mr-5 hover:text-gray-900 cursor-pointer relative">
                            <BsSuitHeartFill/>
                            <span style={{background: "#bf0606"}}
                                  className="absolute font-titleFont bottom-3 -right-3.5 text-xs w-4 h-4 flex items-center justify-center  rounded-full text-white">
                {productsFavorite.length > 0 ? productsFavorite.length : 0}
              </span>
                        </div>
                    </Link>

                    <Link to="/cart">
                        <div class="mr-5 hover:text-gray-900 cursor-pointer relative">
                            <FaShoppingCart/>
                            <span style={{background: "#bf0606"}}
                                  className="absolute font-titleFont bottom-3 -right-3.5 text-xs w-4 h-4 flex items-center justify-center  rounded-full text-white">
                {products.length > 0 ? products.length : 0}
              </span>
                        </div>
                    </Link>
                </nav>

                <HiMenuAlt2
                    onClick={() => setSidenav(!sidenav)}
                    className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-5 "
                />

                {sidenav && (
                    <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                        <motion.div
                            initial={{x: -300, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{duration: 0.5}}
                            className="w-[80%] h-full relative"
                        >
                            <div className="w-full h-full bg-primeColor p-6">
                                <span className="w-28 mb-10 font-bold">Madam's Boutique</span>
                                <ul className="text-gray-200 flex flex-col gap-2">
                                    {navBarList.map((item) => (
                                        <li
                                            className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                                            key={item._id}
                                        >
                                            <NavLink
                                                to={item.link}
                                                state={{data: location.pathname.split("/")[1]}}
                                                onClick={() => setSidenav(false)}
                                            >
                                                {item.title}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <span
                                onClick={() => setSidenav(false)}
                                className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                            >
                <MdClose/>
              </span>
                        </motion.div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;