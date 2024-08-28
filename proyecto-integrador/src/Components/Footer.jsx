// eslint-disable-next-line no-unused-vars
import React from 'react'
import FooterStyle from "../Styles/Footer.module.css"


const Footer = () => {
    return (
        <footer>
            <div className={FooterStyle.footer}>
                <div className={FooterStyle.footerLogo}>
                    <img src='/logo_footer.png' alt='Logo footer' className={FooterStyle.logo}/>
                </div>

                <div className={FooterStyle.icons}>
                    <img src='/x.png' alt='Logo x' />
                    <img src='/instagram.png' alt='Logo instagram' />
                    <img src='/linkedin.png' alt='Logo linkedin' />
                    <img src='/whatsapp.png' alt='Logo whatsapp' />
                    <img src='/facebook.png' alt='Logo facebook' />
                </div>

            </div>


            <div className={FooterStyle.information}>
                Mas información | Términos y condiciones
            </div>
        </footer>
    );
};

export default Footer;