import React from 'react';
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import styles from "../styles/layout.module.css";

const Layout = (props) => {
    const router = useRouter();

    return (
        <div>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
                      rel="stylesheet"
                      integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
                      crossOrigin="anonymous"/>
            </Head>

            <div className="container">
            <h3 className="d-flex justify-content-center">COACH</h3>
                <header className={styles.nav}>
                    <ul className="nav nav-pills">
                        <li className={styles.navitem}>
                           
                        <Link href="/frontend" style={{ textDecoration: 'none'}}>
                                <a className={router.pathname === '/frontend',styles.nav } style={{ color: 'inherit', textDecoration: 'none'}}>Home</a>
                            </Link>
                           
                        </li>
                       
                    </ul>
                </header>
            </div>

            <div className="album py-5 bg-light">
                <div className="container">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
