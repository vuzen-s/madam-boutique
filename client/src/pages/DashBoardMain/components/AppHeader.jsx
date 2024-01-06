import {cilBell, cilEnvelopeOpen, cilList, cilMenu} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavItem,
    CNavLink,
} from '@coreui/react'
import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, NavLink, useNavigate} from 'react-router-dom'

import {logo} from '../assets/brand/logo'
import {AppHeaderDropdown} from './header/index'
import {AppBreadcrumb} from './index'
import {FaUser} from "react-icons/fa";
import {motion} from "framer-motion";
import api from "../../AuthContext/api";

const AppHeader = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector((state) => state.sidebarShow);
    const [showUser, setShowUser] = useState(false);
    const userRef = useRef(null);
    const [userAuth, setUserAuth] = useState(null);

    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (userRef.current && !userRef.current.contains(event.target)) {
            setShowUser(false);
        }
    };

    // auth user
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

    // logout
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

    return (
        <CHeader position="sticky" className="mb-3">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch({type: 'set', sidebarShow: !sidebarShow})}
                >
                    <CIcon icon={cilMenu} size="lg"/>
                </CHeaderToggler>
                <CHeaderBrand className="mx-auto d-md-none" to="/">
                    <CIcon icon={logo} height={48} alt="Logo"/>
                </CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink to="/dashboard" component={NavLink}>
                            Dashboard
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink to="/dashboard/user">Users</CNavLink>
                    </CNavItem>
                </CHeaderNav>
                {/*//*/}
                <div
                    onClick={() => setShowUser(!showUser)}
                    class="mr-5 hover:text-gray-900 flex cursor-pointer"
                >
                    <FaUser/>

                    {/*//*/}
                    <span>{userAuth && userAuth.fullname}</span>

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
                                    <Link to="/">
                                        <li className="text-slate-200 font-bold text-base w-full px-1 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white bg-gray-600 rounded-t-md hover:text-white duration-300 cursor-pointer">
                                            Go To Home
                                        </li>
                                    </Link>
                                ) : ''}
                                <li className="text-gray-400 px-4 py-1.5 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300">
                                    <Link to={`/dashboard/user/edit/${userAuth.id}`}>
                                        <button
                                                className="text-gray-400 w-full hover:text-white">
                                            Account
                                        </button>
                                    </Link>
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
                {/*<CHeaderNav>*/}
                {/*  <CNavItem>*/}
                {/*    <CNavLink href="#">*/}
                {/*      <CIcon icon={cilBell} size="lg" />*/}
                {/*    </CNavLink>*/}
                {/*  </CNavItem>*/}
                {/*  <CNavItem>*/}
                {/*    <CNavLink href="#">*/}
                {/*      <CIcon icon={cilList} size="lg" />*/}
                {/*    </CNavLink>*/}
                {/*  </CNavItem>*/}
                {/*  <CNavItem>*/}
                {/*    <CNavLink href="#">*/}
                {/*      <CIcon icon={cilEnvelopeOpen} size="lg" />*/}
                {/*    </CNavLink>*/}
                {/*  </CNavItem>*/}
                {/*</CHeaderNav>*/}
                {/*<CHeaderNav className="ms-3">*/}
                {/*  <AppHeaderDropdown />*/}
                {/*</CHeaderNav>*/}
            </CContainer>
            {/* <CHeaderDivider /> */}
            {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
        </CHeader>
    )
}

export default AppHeader
