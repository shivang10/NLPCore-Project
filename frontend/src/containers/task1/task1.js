import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from '../../fetchData';
import './task1.css';

const Task1 = () => {
    const [years, updateYear] = useState({
        year1: '',
        year2: '',
    });

    const [bookTitle, updateBooks] = useState([]);

    const [yearValidation, updateYearValidation] = useState(false);

    const [errText, updateErr] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        updateYear(prevState => {
            if (name === 'year1') {
                return {
                    year1: value,
                    year2: prevState.year2
                };
            } else if (name === 'year2') {
                return {
                    year1: prevState.year1,
                    year2: value
                }
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const yearRange = {
            year1: years.year1,
            year2: years.year2
        }
        if (yearRange.year1 < 2002 || yearRange.year2 < 2002 || yearRange.year1 > 2019 || yearRange.year2 > 2019) {
            updateErr('Invalid Input');
            updateYearValidation(true);
            updateBooks([]);
        } else if (yearRange.year1 > yearRange.year2) {
            updateErr('Year2 must be greater than equal to Year1');
            updateYearValidation(true);
            updateBooks([]);
        } else {
            updateYearValidation(false);
            axios.post('http://localhost:5000/task1input', yearRange);
        }
    }

    useEffect(() => {

        let mounted = true;

        fetchData('http://localhost:5000/task1')
            .then(res => (mounted ? updateBooks(res) : null))
            .catch(err => (mounted ? console.error(err) : null));

        return () => (mounted = false);
    }, [bookTitle]);

    return (
        <div>
            <div className="yearRange">
                <h2>Enter the year range to get the list of books published in that year range!</h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="yearInputs">
                        <div className="yearNumber">
                            <input name="year1" type="number" onChange={handleChange} value={years.year1} placeholder="Year1" required />
                        </div>
                        <div className="yearNumber">
                            <input name="year2" type="number" onChange={handleChange} value={years.year2} placeholder="Year2" required />
                        </div>
                    </div>
                    <div className="yearSubmit">
                        <input type="submit" value="Fetch Details" />
                    </div>
                </form>
            </div>
            {!yearValidation ?
                <div className="booksDisplay">
                    <h2 id="bookHeading">The book titles published in the respective years are as follows: </h2>
                    {Object.keys(bookTitle).map(year => (
                        <div key={year} className="booksYear">
                            <h2>{year}</h2>
                            <div className="grid-container">
                                {bookTitle[year].map(title => (
                                    <div key={title} className="grid-item">{title}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className="errorDisplay">
                    <p>{errText}</p>
                </div>
            }

        </div>
    )
}

export default Task1;