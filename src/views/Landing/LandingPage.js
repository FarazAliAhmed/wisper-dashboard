import React from 'react';
import {
    Container,
    Button,
} from 'reactstrap'
import Navigation from '../../components/Navigation'
import { Link } from 'react-router-dom'

// import "./landing.scss"
// import {
//     About,
//     Cta,
//     Footer,
//     Header,
//     Partners,
//     Pricing,
// } from "../../components/sections";


const LandingPage = () => {
    return (
    <div>
        <div className="home-wrapper">
        <Container fluid>
            <Navigation />
        </Container>
        <div className="hero">
            <header className="pb-4 text-center">
            <h1>Automated Data Solution for Schools</h1>
            <p>
                Enjoy easy integration and fast data allocation with
                Wisper Edusuit API.
            </p>
            <Link to="/register">
                <Button color="info" className="get-started">
                GET STARTED
                </Button>
            </Link>
            </header>
        </div>
        </div>

        {/* <main className="App">
            <Header />
            <About />
            <Pricing />
            <Cta />
            <Partners />
            <Footer />
        </main> */}
    </div>
    )
}

export default LandingPage;