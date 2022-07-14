const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());

let hiraganaToKatagana = (word) => {
    return word.replace(/[\u3041-\u3096]/g, function (match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
};

const getQuestion = (num_arr) => {

    return new Promise((resolve, reject) => {

        const sqlite3 = require("sqlite3").verbose();
        const db = new sqlite3.Database(__dirname + "./models/name_reaction.db");
        let queries = [];

        db.serialize(() => {
            num_arr.map((quesNo, idx) => {
                db.get(`SELECT * FROM rmd where question = ${quesNo}`, ((err, json) => {
                    if (err) {
                        reject(err);
                    } else {
                        queries.push(json);
                        if (idx === num_arr.length - 1) {
                            console.log(queries);
                            resolve(queries);
                        };
                    };
                }));
            });
        });

    });
}


const getSelections = (num_arr) => {

    return new Promise((resolve, reject) => {
        const sqlite3 = require("sqlite3").verbose();
        const db = new sqlite3.Database(__dirname + "./models/name_reaction.db");
        const selections = [];

        db.serialize(() => {
            num_arr.map((quesNo, idx) => {
                db.all(`SELECT * FROM rsd where question = ${quesNo}`, (err, arr) => {
                    if (err) {
                        reject(err);
                    } else {
                        selections.push(arr);
                        if (idx === num_arr.length - 1) {
                            resolve(selections);
                        }
                    };
                });
            });
        });
    });
};

const getQuestion_sentence = (questions) => {
    return new Promise((resolve, reject) => {
        const sqlite3 = require("sqlite3");
        const db = new sqlite3.Database(__dirname + "./models/name_reaction.db");
        const sentence_box = [];
        db.serialize(() => {
            questions.map((ques, idx) => {
                const sql = `SELECT * FROM rqd where ques_type = ${ques.ques_type}`;
                db.get(sql, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        sentence_box.push(res.sentence);
                        if (idx === questions.length - 1) {
                            resolve(sentence_box);
                        };
                    };
                });
            });
        });
    });
};


const displayQues = async (num_arr, response) => {

    let questions = await getQuestion(num_arr)
    let selections = await getSelections(num_arr);
    let sentence_box = await getQuestion_sentence(questions);

    questions.map((ques, idx) => {

        const sel = selections[idx].map((json) => {
            return json.sel;
        });

        ques["selections"] = sel;
        ques["ques_type"] = sentence_box[idx];
    });

    console.log(questions);

    response.send(questions);
};


const searchReaction = (sql) => {
    return new Promise((resolve, reject) => {
        const sqlite3 = require("sqlite3");
        const db = new sqlite3.Database(__dirname + "./models/name_reaction.db");
        db.all(sql, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                resolve(res);
            }
        })
    })
}

let users_score = {
    SCORE: null,
    DISPLAY: null
}

// API

router.get("/ques", async (req, res) => {
    let arr = [];

    for (i = 1; i < 61; i++) {
        arr.push(i);
    };

    displayQues(arr, res);
});

router.post("/answer", async (req, res) => {
    const post = await req.body;
    users_score["DISPLAY"] = post[0];
    users_score["SCORE"] = post[1];
    res.send(true);
});

router.get("/answer", async (req, res) => {
    res.send(users_score);
});

// 検索機能
router.post("/search_db", async (req, res) => {
    const request = await req.body;
    const response = res;
    let key = request.keyword;
    key = hiraganaToKatagana(key);
    let sql = `SELECT * FROM rmd where name_reaction LIKE '%${key}%'`;

    searchReaction(sql).then((json) => {
        let quesNo = json.map(res => { return res.question });
        displayQues(quesNo, response);
    });

});


// router.get("/answer_display", (req, res) => {
//     res.sendFile(__dirname + "/public/html/answer.html");
// });


router.get("/search", (req, res) => {
    res.sendFile(__dirname + "/public/html/search.html");
});



module.exports = router;