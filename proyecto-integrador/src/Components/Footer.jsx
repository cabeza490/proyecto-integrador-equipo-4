// eslint-disable-next-line no-unused-vars
import React from 'react'
import FooterStyle from "../Styles/Footer.module.css"


const Footer = () => {
    return (
        <footer>
            <div className={FooterStyle.footer}>
                <div className={FooterStyle.footerLogo}>
                    <img src='../../public/logo_footer.png' alt='Logo footer' className={FooterStyle.logo}/>
                </div>

                <div className={FooterStyle.icons}>
                    <img src='../../public/x.png' alt='Logo x' />
                    <img src='../../public/instagram.png' alt='Logo instagram' />
                    <img src='../../public/linkedin.png' alt='Logo linkedin' />
                    <img src='../../public/whatsapp.png' alt='Logo whatsapp' />
                    <img src='../../public/facebook.png' alt='Logo facebook' />
                </div>

            </div>


            <div className={FooterStyle.information}>
                Mas información | Términos y condiciones
            </div>
        </footer>
    );
};

export default Footer;