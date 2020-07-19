const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

const dir = '../wikipages/data/';

let filenames = [];
let jsonData = [];
let year1, year2;
let inputAttribute, inputValue;
let count = 0;
let numberOfTopAttributes;


fs.readdir(dir, (error, filenames) => {
    if (error) throw error;
    filenames.forEach(filename => {
        fs.readFile(dir + filename, callback(filename));
    });
});

function callback(file) {
    filenames.push([count, file]);
    count++;
    return function (err, stats) {
        if (err) throw err;
        const data = JSON.parse(stats);
        jsonData.push(data);
    }
}

const task1 = () => {
    let titlesPublished = {};
    jsonData.map(book => {
        let timePublished = parseInt(book["time_published"].slice(0, 4));
        if (timePublished >= year1 && timePublished <= year2) {
            if (timePublished in titlesPublished) {
                titlesPublished[timePublished].push(book["title"]);
            } else {
                titlesPublished[timePublished] = [book["title"]];
            }
        }
    })
    return titlesPublished;
}

const task2 = () => {
    let i = -1;
    let j = -1;
    let documentNumber = {};
    let sectionNumber = {};
    jsonData.map(book => {
        i++;
        if ("sections" in book) {
            book["sections"].map(eachSection => {
                j++;
                if ("attributes" in eachSection) {
                    eachSection["attributes"].map(attribute => {
                        if ("values" in attribute) {
                            attribute["values"].map(singleAttribute => {
                                if ("name" in singleAttribute) {
                                    let currentAttributeName = (singleAttribute["name"]).toLowerCase();
                                    let currentAttributeValue = (singleAttribute["value"]).toLowerCase();

                                    if (currentAttributeName in sectionNumber) {
                                        let tmpSize = sectionNumber[currentAttributeName].length;
                                        if (sectionNumber[currentAttributeName][tmpSize - 1] !== j) {
                                            sectionNumber[currentAttributeName].push(j);
                                        }
                                    } else {
                                        sectionNumber[currentAttributeName] = [j];
                                    }

                                    if (currentAttributeName in documentNumber) {
                                        let tmpSize = documentNumber[currentAttributeName].length;
                                        if (documentNumber[currentAttributeName][tmpSize - 1] !== i) {
                                            documentNumber[currentAttributeName].push(i);
                                        }
                                    } else {
                                        documentNumber[currentAttributeName] = [i];
                                    }

                                    // if (currentAttributeName in attributesDescription) {
                                    //     attributesDescription[currentAttributeName].push(currentAttributeValue);
                                    // } else {
                                    //     attributesDescription[currentAttributeName] = [currentAttributeValue];
                                    // }
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    // for (attribute in attributesDescription) {
    //     topAttributes.push([attribute, attributesDescription[attribute].length]);
    // }
    // topAttributes.sort(function (a1, a2) {
    //     return a2[1] - a1[1];
    // })

    return documentNumber;
}

const task3 = () => {

    let docNumber = new Set();
    let secNumber = new Set();
    let i = -1, j = -1;
    jsonData.map(book => {
        i++;
        if ("sections" in book) {
            book["sections"].map(eachSection => {
                j++;
                if ("attributes" in eachSection) {
                    eachSection["attributes"].map(attribute => {
                        if ("values" in attribute) {
                            attribute["values"].map(singleAttribute => {
                                if ("name" in singleAttribute) {
                                    let currentAttributeName = (singleAttribute["name"]).toLowerCase();
                                    let currentAttributeValue = (singleAttribute["value"]).toLowerCase();
                                    if (currentAttributeValue == inputValue && currentAttributeName == inputAttribute) {
                                        docNumber.add(filenames[i][1]);
                                        secNumber.add(eachSection);
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    let docs = [];
    for (let i of secNumber) {
        docs.push(i);
    }
    return docs;
}

const task4 = () => {

    let attributesTop = [];
    let attributesDescription = {};
    let topAttributes = [];

    jsonData.map(book => {
        if ("sections" in book) {
            book["sections"].map(eachSection => {
                if ("attributes" in eachSection) {
                    eachSection["attributes"].map(attribute => {
                        if ("values" in attribute) {
                            attribute["values"].map(singleAttribute => {
                                if ("name" in singleAttribute) {

                                    let currentAttributeName = (singleAttribute["name"]).toLowerCase();
                                    let currentAttributeValue = (singleAttribute["value"]).toLowerCase();

                                    if (currentAttributeName in attributesDescription) {
                                        attributesDescription[currentAttributeName].push(currentAttributeValue);
                                    } else {
                                        attributesDescription[currentAttributeName] = [currentAttributeValue];
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    for (attribute in attributesDescription) {
        topAttributes.push([attribute, attributesDescription[attribute].length]);
    }
    topAttributes.sort(function (a1, a2) {
        return a2[1] - a1[1];
    })
    for (let i = 0; i < numberOfTopAttributes; i++) {
        attributesTop.push(topAttributes[i]);
    }
    return attributesTop;
}


app.get('/task1', function (req, res) {
    res.json(task1());
});

app.post("/task1input", (req, res) => {
    year1 = req.body.year1;
    year2 = req.body.year2;
    //console.log([year1, year2]);
    res.redirect('/task1');
});

app.get('/task2', function (req, res) {
    res.json(task2());
})


app.get('/task3', function (req, res) {
    res.json(task3());
})

app.post("/task3input", (req, res) => {
    inputAttribute = req.body.attributeName;
    inputValue = req.body.attributeValue;
    //console.log([inputAttribute, inputValue]);
    res.redirect('/task3');
})


app.get('/task4', (req, res) => {
    res.json(task4());
})

app.post('/task4input', (req, res) => {
    numberOfTopAttributes = req.body.tempCount;
    //console.log(numberOfTopAttributes);
    res.redirect('/task4');
})

app.get('/', function (req, res) {
    res.send(jsonData);
})


app.listen(5000, () => {
    console.log("Server is running");
})