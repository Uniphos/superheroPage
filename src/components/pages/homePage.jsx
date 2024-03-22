import React from "react";
import PageLayout from "../pageLayout";
import HeroList from "../heroList";
import '../style/homepage.css'

const HomePage = () => {
    return (
        <div className="home-page">
            <PageLayout>
                <div className="home-page-header">
                <h1>Welcome to the Marvel Universe</h1>
                <p>
                    The Marvel Universe is a fictional universe where the stories in most American comic book titles and other media published by Marvel Comics take place. Super-teams such as the Avengers.
                </p>
                </div>
                <div className="home-page-body">
                <HeroList className='hero-list' />
                </div>
            </PageLayout>
        </div>
    );
}

export default HomePage;