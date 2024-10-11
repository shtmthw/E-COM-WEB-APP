import './Footer.css'

function Footer() {
    return (
        <>
            <div className="FooterBody">
                <div className="left">
                    <h1>We Welcome Your Visit Deeply, We Value You.</h1>
                    <h2>We are the ELITE.</h2>    
                    <p>Made And Founded By, Matthew Baroi.</p>
                </div>    
                <div className="right">
                    <h2>Find Us.</h2>
                    <p onClick={() => window.open('https://instagram.com')}>Instagram</p>
                    <p onClick={() => window.open('https://github.com')}>Github</p>
                    <p onClick={() => window.open('https://facebook.com')}>Facebook</p>
                </div>
            </div>        
        </>
    )
}

export default Footer;
