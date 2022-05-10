const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());



// 人名反応

let ans_name_idx = [

    {
        question: 1,
        answer_idx: 1,
        name_reaction: "フィッシャーインドール合成",
        url: "https://www.chem-station.com/odos/2009/06/fischer-fischer-indole-synthes.html"
    },

    {
        question: 2,
        answer_idx: 2,
        name_reaction: "ファヴォルスキー転位",
        url: "https://www.chem-station.com/odos/2009/07/favorskii-favorskii-rearrangem.html"
    },
    {
        question: 3,
        answer_idx: 1,
        name_reaction:"バイヤー・ビリガー酸化",
        url: "https://www.chem-station.com/odos/2009/06/baeyer-villiger-baeyer-villige.html"
    },
    {
        question: 4,
        answer_idx: 2,
        name_reaction:"ランバーグ・バックランド転位",
        url: "https://www.chem-station.com/odos/2009/09/ramberg-backlund-ramberg-backl.html"
    },
    {
        question: 5,
        answer_idx: 0,
        name_reaction: "ライマー・チーマン反応",
        url: "https://www.chem-station.com/odos/2009/07/reimer-tiemann.html"
    },
    {
        question: 6,
        answer_idx: 1,
        name_reaction:"ウィッティヒ反応 ",
        url: "https://www.chem-station.com/odos/2009/06/wittig-wittig-reaction.html"
    },
    {
        question: 7,
        answer_idx: 1,
        name_reaction:"ベックマン転位 ",
        url: "https://www.chem-station.com/odos/2009/06/beckmann-beckmann-rearrangemen.html"
    },
    {
        question: 8,
        answer_idx: 2,
        name_reaction:"ホーナー・ワズワース・エモンス反応",
        url: "https://www.chem-station.com/odos/2009/06/horner-wadsworth-emmons-hwe.html"
    },
    {
        question: 9,
        answer_idx: 3,
        name_reaction:"アフマトヴィッチ反応",
        url: "https://www.chem-station.com/odos/2011/05/achmatowicz-reaction.html"
    },
    {
        question: 10,
        answer_idx: 3,
        name_reaction:"ヴィルスマイヤー・ハック反応",
        url: "https://www.chem-station.com/odos/2009/06/vilsmeier-haack-vilsmeier-haac.html"
    },
    {
        question: 11,
        answer_idx: 2,
        name_reaction:"ネバー転位",
        url: "https://www.chem-station.com/odos/2009/09/neber-neber-rearrangement.html"
    },
    {
        question: 12,
        answer_idx: 0,
        name_reaction:"シモンズ・スミス反応",
        url: "https://www.chem-station.com/odos/2009/06/simmons-smith-simmons-smith-re.html"
    },
    {
        question: 13,
        answer_idx: 3,
        name_reaction:"ホフマン転位",
        url: "https://www.chem-station.com/odos/2009/07/hofmann.html"
    },
    {
        question: 14,
        answer_idx: 2,
        name_reaction:"スワーン酸化",
        url: "https://www.chem-station.com/odos/2009/06/swern-swern-oxidation.html"
    },
    {
        question: 15,
        answer_idx: 2,
        name_reaction:"コーリー・フックス アルキン合成",
        url: "https://www.chem-station.com/odos/2009/06/corey-fuchs-corey-fuchs-acetyl.html"
    },
    {
        question: 16,
        answer_idx: 3,
        name_reaction:"クルチウス転位",
        url: "https://www.chem-station.com/odos/2009/06/curtius-curtius-rearrangement.html"
    },
    {
        question: 17,
        answer_idx: 3,
        name_reaction:"クライゼン転位",
        url: "https://www.chem-station.com/odos/2009/06/claisen-claisen-rearrangement.html"
    },
    {
        question: 18,
        answer_idx: 2,
        name_reaction:"バーチ還元 ",
        url: "https://www.chem-station.com/odos/2009/06/birch-birch-reduction.html"
    },
    {
        question: 19,
        answer_idx: 2,
        name_reaction:"ピーターソンオレフィン化",
        url: "https://www.chem-station.com/odos/2009/07/peterson-peterson-olefination.html"
    },
    {
        question: 20,
        answer_idx: 1,
        name_reaction:"光延反応",
        url: "https://www.chem-station.com/odos/2009/06/-mitsunobu-reaction.html"
    },
    {
        question: 21,
        answer_idx: 1,
        name_reaction:"フリーデル・クラフツ アシル化",
        url: "https://www.chem-station.com/odos/2009/06/friedel-crafts-friedel-crafts.html"
    },
    {
        question: 22,
        answer_idx: 3,
        name_reaction:"ワッカー酸化",
        url: "https://www.chem-station.com/odos/2009/06/wacker-wacker-oxidation.html"
    },
    {
        question: 23,
        answer_idx: 2,
        name_reaction:"シャープレス・香月不斉エポキシ化反応",
        url: "https://www.chem-station.com/odos/2009/06/sharplesssharpless-katsukiasym.html"
    },
    {
        question: 24,
        answer_idx: 3,
        name_reaction:"レフォルマトスキー反応",
        url: "https://www.chem-station.com/odos/2009/06/reformatsky.html"
    },
    {
        question: 25,
        answer_idx: 1,
        name_reaction:"ウォルフ・キシュナー還元",
        url: "https://www.chem-station.com/odos/2009/06/wolff-kishner-wolff-kishner-re.html"
    },
    {
        question: 26,
        answer_idx: 3,
        name_reaction:"バートン・マクコンビー脱酸素化",
        url: "https://www.chem-station.com/odos/2009/06/barton-mccombie-barton-mccombi.html"
    },
    {
        question: 27,
        answer_idx: 1,
        name_reaction:"ウォール・チーグラー臭素化",
        url: "https://www.chem-station.com/odos/2009/06/wohl-ziegler-wohl-ziegler-brom.html"
    },
    {
        question: 28,
        answer_idx: 3,
        name_reaction:"マンニッヒ反応",
        url: "https://www.chem-station.com/odos/2009/06/mannich.html"
    },
    {
        question: 29,
        answer_idx: 1,
        name_reaction:"ブラウンヒドロホウ素化反応",
        url: "https://www.chem-station.com/odos/2009/06/brown-brown-hydroboration.html"
    },
    {
        question: 30,
        answer_idx: 1,
        name_reaction:"溝呂木・ヘック反応 ",
        url: "https://www.chem-station.com/odos/2009/06/-heck-mizoroki-heck-reaction.html"
    }
    
];

let exception_sel = (index) => {

    let exc = [6,7,15];

    if(exc.indexOf(index) !== -1){

        return true;

    }else{

        return false;

    }
}


ans_name_idx.map((value, index) => {

    value["scheme_path"] = `name_reaction\\questions\\No${index + 1}.png`;

    const flag = exception_sel(index + 1);
    const selections = [];
    if (flag){
        for(t = 1; t < 7; t++){
            selections.push(`name_reaction\\questions\\No${index + 1}-${t}.png`);
        }
    }else{
        for(t = 1; t < 5; t++){
            selections.push(`name_reaction\\questions\\No${index + 1}-${t}.png`);
        }
    }

    value["selections"] = selections;
});



router.get("/ques", (req, res) => {
    res.send(ans_name_idx);
});





let users_score = {
    SCORE: null,
    DISPLAY : null
}

router.post("/answer", async (req, res) => {
    const post = await req.body;
    users_score["DISPLAY"] = post[0];
    users_score["SCORE"] = post[1];
    res.send(true);
});

router.get("/answer", async (req, res) => {
    res.send(users_score);
});

router.get("/answer_display", (req, res) => {
    res.sendFile(__dirname + "/public/html/answer.html");
})


module.exports = router;