import React from 'react';
import './homepage.css';

const homepage = () => {
    return (
        <div className="homepage">
            <h1>Welcome to Data Visualization</h1>
            <div className="grid-container">
                <div className="grid-item">
                    <h1>Task1</h1>
                    <h2>Enter the range of years as parameters to get the name of book titles published in that respective years</h2>
                </div>
                <div className="grid-item">
                    <h1>Task4</h1>
                    <h2>Get the values distribution of top N attributes</h2>
                </div>
            </div>

        </div>
    )
}

export default homepage;