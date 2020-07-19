import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { fetchData } from '../../fetchData';
import './task4.css';

const Task4 = () => {

    const [attributesCount, updateCount] = useState('');

    const [barData, setBarData] = useState({});

    const [dataPresent, updateData] = useState(false);

    const handleChange = (event) => updateCount(event.target.value)

    const handleSubmit = (event) => {
        event.preventDefault();
        const tempCount = parseInt(attributesCount);
        axios.post('http://localhost:5000/task4input', { tempCount });
        window.location.reload();
    }

    useEffect(() => {

        let mounted = true;

        fetchData('http://localhost:5000/task4')
            .then(res => {
                let empSal = [];
                let empAge = [];
                let bg = [];
                for (let key in res) {
                    empAge.push(res[key][0]);
                    empSal.push(res[key][1]);
                    let r = Math.floor(Math.random() * 256);
                    let g = Math.floor(Math.random() * 256);
                    let b = Math.floor(Math.random() * 256);
                    bg.push("rgb(" + r + ", " + g + ", " + b + ")");
                }
                if (mounted) {
                    updateData(true);
                    setBarData({
                        labels: empAge,
                        datasets: [
                            {
                                data: empSal,
                                backgroundColor: bg,
                            }
                        ]
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

        return () => mounted = false;
    }, []);

    return (
        <div>
            <div className="attributeForm">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input name="count" type="number" value={attributesCount} onChange={handleChange} required />
                    <input type="submit" value="Fetch Details" />
                </form>
            </div>
            {dataPresent ?
                <div className="BarExample">
                    <p>The top attributes are: </p>
                    <Pie data={barData} width={400} height={120} />
                </div>
                :
                <div className="loading">
                    <div className="loader">Loading...</div>
                </div>
            }

        </div>
    )
}

export default Task4;