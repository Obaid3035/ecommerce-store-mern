import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import "./Sidebar.css"
import { getCurrentUser, getTokenFormat } from "../../utils/helper";
import axios from "axios";
import {showMenu} from "../../api/seo";

export interface ISideBar {
    icon: JSX.Element,
    path?: string,
    title: string,
    ability?: string
}


const SideBar: React.FC<{ role: string, sideBarItems: ISideBar[]}> = ({ role, sideBarItems }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sideBar, setSideBar] = useState(false)
    const [ability, setAbility] = useState(null);
    const showSideBar = () => setSideBar(!sideBar);
    const [user, setUser] = useState<any>(null);
    const [menu, setMenu] = useState({
        _id: "",
        shop: "",
        about: "",
        contact: "",
        promotion: "",
        logo: {
            avatar: ""
        }
    })
    useEffect(() => {
        setUser(getCurrentUser())
        showMenu()
            .then((res) => {
                setMenu({
                    ...res.data
                })
            })
        if (role === "admin") {
            if (!getCurrentUser().isSuperAdmin) {
                axios.get(`/admin/roles/${getCurrentUser().role}`, getTokenFormat())
                  .then((res) => {
                      setAbility(res.data.ability)
                  })
            }
        }
    }, [])

    const onLogOutHandler = () => {
        localStorage.clear();
        navigate('/')
    }

    const classes = (path: string) => {
        if (path === location.pathname) {
            return 'nav_active'
        }
        return ''
    }


    const getNavMenu = () => {
        if (user) {
            if (role === "customer") {
                return sideBarItems.map((item: ISideBar , index: React.Key | null | undefined) => {
                    return  (
                        <li key={index} className={`${classes(item.path!)}`}>
                            <div>
                                <Link to={item.path!}>
                                    { item.icon }
                                    <span>{ item.title }</span>
                                </Link>
                            </div>
                        </li>
                    )
                })
            } else {
                return sideBarItems.map((item: ISideBar , index: React.Key | null | undefined) => {
                    if (user.isSuperAdmin) {
                        return  (
                            <li key={index} className={`${classes(item.path!)}`}>
                                <div>
                                    <Link to={item.path!}>
                                        { item.icon }
                                        <span>{ item.title }</span>
                                    </Link>
                                </div>
                            </li>
                        )
                    } else if (!user.isSuperAdmin && ability) {
                        const abilityKey = Object.getOwnPropertyNames(ability);
                        if (abilityKey.includes(item.ability!) && ability[item.ability!]) {
                            return (
                                <li key={index} className={`${classes(item.path!)}`}>
                                    <div>
                                        <Link to={item.path!}>
                                            { item.icon }
                                            <span>{ item.title }</span>
                                        </Link>
                                    </div>
                                </li>
                            )
                        }
                    }

                })
            }
        }
    }

    return (
      <div className={sideBar ? 'sidebar active' : 'sidebar'}>
          <div className={'logo_content'}>
              <div className={'profile'}>
                  <img alt={"Logo"} src={menu.logo.avatar} onClick={() => window.location.href = "/"}/>
              </div>
              <FaIcons.FaBars className={'fa-bars'} onClick={showSideBar} />
          </div>
          <ul className="nav_list p-0">
              { getNavMenu() }

              <li className="logout_btn" onClick={() => window.location.href = "/"}>
                  <Link to={'#'}>
                      <FiIcons.FiLogOut />
                      <span>Go To Home</span>
                  </Link>
              </li>

              <li className="logout_btn" onClick={onLogOutHandler}>
                  <Link to={'#'}>
                      <FiIcons.FiLogOut />
                      <span>Logout</span>
                  </Link>
              </li>
          </ul>
      </div>
    );
};
export default SideBar;
