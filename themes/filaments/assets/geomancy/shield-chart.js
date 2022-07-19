// https://en.wikipedia.org/wiki/Geomantic_figures
// https://digitalambler.com/2020/05/08/how-to-construct-the-shield-chart-of-geomancy/

const ShieldChart = {
  getRandomFigure: function() {
    // Will return 0-15
    let randomInt = Math.floor(Math.random() * 16)
    let keys = Object.keys(this.figures);
    let randomKey = keys[randomInt];

    return this.figures[randomKey];
  },
  housesInfo: [
    { "number": "1st", "description": "The querent"},
    { "number": "2nd", "description": "Money and valueing, property, finances, theft (except real estat/land, that is 4th house and speculative investments, which is 5th)"},
    { "number": "3rd", "description": "Siblings, neighbors and immidiate surroundings. Journes less than 200 miles, child education, advice, news and rumors"},
    { "number": "4th", "description": "Land, agriculture, buildings, towns and cities, relocation and moving, underground, unknown object, ancient places and things, old age, the querents father and endings"},
    { "number": "5th", "description": "Crops, fertility, pregnancy, children. Sexuality (not love and marriage, they are seventh). Festivities, food and drink, clothing. Bodies of water, fishing and rain. Communications (letters, messages, books)"},
    { "number": "6th", "description": "Employees, service professionals. Practitioners of magic and occultisim other than the querent. Pets, domestic animals (except horses, donkeys, mules, cattle and camels. Illness and injuries"},
    { "number": "7th", "description": "Intense relationships, spouse or lover, marriage and love. Partnerships, agreements and treaties. Conflict and compition. Thieves and known enemies (unknown enemies are 12th). Hunting and locating"},
    { "number": "8th", "description": "Death, ghosts and spiritual enteties. Magic performed by on on behalf of querent (divination and occult philosophy are 9th). Missing persons or valuables the querent has loand to others"},
    { "number": "9th", "description": "Long journeys inward and outward. Trips more than 200 miles by land, all water and air voyages. Religion and spirituality. Higher education, arts and dream interpretation. Occult studies and divination"},
    { "number": "10th", "description": "Querents mother. Career, reputation and status. Politics. Weather"},
    { "number": "11th", "description": "Friends, associates, promises, sources of help. Hopes and wishes. Crops from annual plants, and any question the querent does not want to tell the diviner"},
    { "number": "12th", "description": "Restrictions and limitations, debts owed, imprisionment, secrets and unknown enemies. Cattle, horses, donkeys, mules and all wild animals" }
  ],
  lookupFigureByName: function(name) {
    for (const [key, fig] of Object.entries(this.figures)) {
      if (key == name) {
         return fig;
      }
    }
    // If we get here no figure was found, fatal error
    throw new Error("No figure matches name " + name);
  },
  lookupFigureByRows: function(head, neck, body, feet) {
    // Find figure matching the active or passive values of arguments
    for (const [key, fig] of Object.entries(this.figures)) {
      if (fig.head == head && fig.neck == neck && fig.body == body && fig.feet == feet) {
         return fig;
      }
    }
    // If we get here no figure was found, fatal error
    throw new Error("No figure matches head " + head + " neck " + neck + " body " + body + " feet " + feet);
  },
  figureRowAddition: function(value1, value2) {
    if (value1 == value2) {
      return "passive"
    }
    return "active"
  },
  figureAddition: function(fig1, fig2) {
    let head = this.figureRowAddition(fig1.head, fig2.head);
    let neck = this.figureRowAddition(fig1.neck, fig2.neck);
    let body = this.figureRowAddition(fig1.body, fig2.body);
    let feet = this.figureRowAddition(fig1.feet, fig2.feet);
    let sumFig = this.lookupFigureByRows(head, neck, body, feet);
    return sumFig;
  },
  castChart: function(jsonData, firstMother=false, secondMother=false, thirdMother=false, fourthMother=false) {
    this.figures = jsonData;

    firstMother ? firstMother = this.lookupFigureByName(firstMother) : firstMother = this.getRandomFigure();

    secondMother ? secondMother = this.lookupFigureByName(secondMother) : secondMother = this.getRandomFigure();

    thirdMother ? thirdMother = this.lookupFigureByName(thirdMother) : thirdMother = this.getRandomFigure();

    fourthMother ? fourthMother = this.lookupFigureByName(fourthMother) : fourthMother = this.getRandomFigure();

    this.chart.firstRow.firstMother = firstMother;
    this.chart.firstRow.secondMother = secondMother;
    this.chart.firstRow.thirdMother = thirdMother;
    this.chart.firstRow.fourthMother = fourthMother;

    this.chart.firstRow.firstDaughter = this.lookupFigureByRows(
      this.chart.firstRow.firstMother.head,
      this.chart.firstRow.secondMother.head,
      this.chart.firstRow.thirdMother.head,
      this.chart.firstRow.fourthMother.head
    );
    this.chart.firstRow.secondDaughter = this.lookupFigureByRows(
      this.chart.firstRow.firstMother.neck,
      this.chart.firstRow.secondMother.neck,
      this.chart.firstRow.thirdMother.neck,
      this.chart.firstRow.fourthMother.neck
    );
    this.chart.firstRow.thirdDaughter = this.lookupFigureByRows(
      this.chart.firstRow.firstMother.body,
      this.chart.firstRow.secondMother.body,
      this.chart.firstRow.thirdMother.body,
      this.chart.firstRow.fourthMother.body
    );
    this.chart.firstRow.fourthDaughter = this.lookupFigureByRows(
      this.chart.firstRow.firstMother.feet,
      this.chart.firstRow.secondMother.feet,
      this.chart.firstRow.thirdMother.feet,
      this.chart.firstRow.fourthMother.feet
    );
    this.chart.secondRow.firstNiece = this.figureAddition(
      this.chart.firstRow.firstMother,
      this.chart.firstRow.secondMother
    );
    this.chart.secondRow.secondNiece = this.figureAddition(
      this.chart.firstRow.thirdMother,
      this.chart.firstRow.fourthMother
    );
    this.chart.secondRow.thirdNiece = this.figureAddition(
      this.chart.firstRow.firstDaughter,
      this.chart.firstRow.secondDaughter
    );
    this.chart.secondRow.fourthNiece = this.figureAddition(
      this.chart.firstRow.thirdDaughter,
      this.chart.firstRow.fourthDaughter
    );
    this.chart.thirdRow.rightWitness = this.figureAddition(
      this.chart.secondRow.firstNiece,
      this.chart.secondRow.secondNiece
    );
    this.chart.thirdRow.leftWitness = this.figureAddition(
      this.chart.secondRow.thirdNiece,
      this.chart.secondRow.fourthNiece
    );
    this.chart.fourthRow.judge = this.figureAddition(
      this.chart.thirdRow.rightWitness,
      this.chart.thirdRow.leftWitness
    );
    this.chart.fourthRow.sentence = this.figureAddition(
      this.chart.firstRow.firstMother,
      this.chart.fourthRow.judge
    );

    this.validateChart();

    return this.chartJson();
  },
  evenJudge: function() {
    // The Judge must have an even number of points
    let rowCrc = [
      this.chart.fourthRow.judge.head,
      this.chart.fourthRow.judge.neck,
      this.chart.fourthRow.judge.body,
      this.chart.fourthRow.judge.feet
    ];
    let activeCount = 0;

    for (var i = 0; i < rowCrc.length; i++) {
      if (rowCrc[i] == "active") activeCount++;
    }

    if (activeCount == 1 || activeCount == 3) {
      throw new Error("Judge must have even number of points");
    }
  },
  atLeastTwoOccurancesOfFigure: function() {
    // The sixteen figures in the Shield Chart must have at least one
    // figure that is present at least twice in the chart

    let figCounter = {};
    let atLeastTwo = false;

    // Loop over chart a,nd count number of occurances per figure
    for (const [key, row] of Object.entries(this.chart)) {
      for (const [key, figure] of Object.entries(row)) {
        if (figure.name in figCounter) {
          figCounter[figure.name] += 1;
        }
        else {
          figCounter[figure.name] = 1;
        }
      }
    }

    for (const [key, figCount] of Object.entries(figCounter)) {
      if (figCount > 1) {
        atLeastTwo = true;
        break;
      }
    }

    if (atLeastTwo == false) {
      throw new Error("There must exist at least one figure that is present more than once in the chart");
    }
  },
  figureCheckSums: function() {
    // Particular pairs of the figures in the Shield Chart must all add
    // up to the same figure:
    // - First Niece + Judge
    // - Second Mother + Sentence
    // - Second Niece + Left Witness

    let firstNieceAndJudge = this.figureAddition(
      this.chart.secondRow.firstNiece,
      this.chart.fourthRow.judge
    );

    let secondMotherAndSentence = this.figureAddition(
      this.chart.firstRow.secondMother,
      this.chart.fourthRow.sentence
    );

    let secondNieceAndLeftWitness = this.figureAddition(
      this.chart.secondRow.secondNiece,
      this.chart.thirdRow.leftWitness
    );


    if (firstNieceAndJudge != secondMotherAndSentence || firstNieceAndJudge != secondNieceAndLeftWitness) {
      throw new Error("Figures do not add up");
    }
  },
  validateChart: function() {

    this.evenJudge();
    this.atLeastTwoOccurancesOfFigure();
    this.figureCheckSums();
  },
  visualizeFigure: function(figure, chartPosition) {
    let img = document.createElement("img");
    img.setAttribute("src", "/assets/theme/geomancy/figures/" + figure.img);
    img.setAttribute("title", "chartPosition " + chartPosition + " name " + figure.name + " " + figure.head + " " + figure.neck + " " + figure.body + " " + figure.feet);
    document.body.appendChild(img);
  },
  chartHtml: function() {
    // Loop over chart and create HTML

    let chartTable = document.createElement("table");

    for (const [keyRow, row] of Object.entries(this.chart)) {
      let chartRow = document.createElement("tr");
      //chartRow.setAttribute("class", keyRow);

      chartTable.appendChild(chartRow);

      for (const [keyFig, figure] of Object.entries(row).reverse()) {
        let figCell = document.createElement("td");

        //figCell.setAttribute("class", keyFig + " " + figure.name.toLowerCase().replace(" ", "-"));
        figCell.setAttribute("style", "text-align: center;");

        if (keyRow == "secondRow") {
          figCell.setAttribute("colspan", "2");
        }
        if (keyRow == "thirdRow") {
          figCell.setAttribute("colspan", "4");
        }
        if (keyRow == "fourthRow") {
          if (keyFig == "judge") {
            figCell.setAttribute("colspan", "7");
          }
        }

        let figPosition = keyFig;
        figPosition = figPosition.replace(/^first/,"First ");
        figPosition = figPosition.replace(/^second/,"Second ");
        figPosition = figPosition.replace(/^third/,"Third ");
        figPosition = figPosition.replace(/^fourth/,"Fourth ");
        figPosition = figPosition.replace(/^left/,"Left ");
        figPosition = figPosition.replace(/^right/,"Right ");
        figPosition = figPosition.replace(/^judge/,"Judge");
        figPosition = figPosition.replace(/^sentence/,"Sentence");

        let elm = "";
        if (figure.element == "Water") elm = "💧";
        if (figure.element == "Fire") elm = "🔥";
        if (figure.element == "Earth") elm = "🌍";
        if (figure.element == "Air") elm = "💨";

        let img = document.createElement("img");
        img.setAttribute("src", "/assets/theme/geomancy/figures/" + figure.img);
        img.setAttribute("title", figPosition + ": " + figure.name + " " + elm);
        img.setAttribute("width", 32);
        img.setAttribute("height", 32);

        if (keyFig == "judge") {
          img.setAttribute("style", "margin-right: -48px;");
        }

        figCell.appendChild(img);

        chartRow.appendChild(figCell);
      }
    }

    return chartTable;
  },
  chartJson: function() {
    // Loop over chart and create JSON

    let chartJson = {};

    for (const [keyRow, row] of Object.entries(this.chart)) {
      chartJson[keyRow] = {};

      for (const [keyFig, figure] of Object.entries(row).reverse()) {
        chartJson[keyRow][keyFig] = figure.name;
      }
    }

    return chartJson;
  },
  chartText: function() {
    let txt = "";
    let symbol = "♦";
    let padding = "";
    let figureRows = ["head", "neck", "body", "feet"];

    // Draw head row of all figures per line, then on
    // next line draw neck etc
    for (const [keyLine, line] of Object.entries(this.chart)) {
      if (keyLine == "firstRow") padding = "  ";
      if (keyLine == "secondRow") padding = "      ";
      if (keyLine == "thirdRow") padding = "              ";
      if (keyLine == "fourthRow") padding = '='


      figureRows.forEach(function(row) {
        for (const [keyFig, figure] of Object.entries(line).reverse()) {
          if (figure[row] == "active") {
            //symbolStr = "  ▪ ";
            symbolStr = "  " + symbol + " ";
          }
          else {
            //symbolStr = " ▪ ▪";
            symbolStr = " " + symbol + " " + symbol;
          }

          txt += padding + symbolStr + padding;
        }
        txt += '\n';
      });
      //txt += '\n';
    }
    // fourthRow is special, judge needs to be centered and sentence
    // aligned right

    txt = txt.replace(/==/mg,"                        ");
    txt = txt.replace(/=$/mg,"  ");
    txt = txt.replace(/^=/mg,"                              ");

    // Chop off superflous chars
    txt = txt.replace(/^\ \ \ /mg,"");
    txt = txt.replace(/\ \ $/mg,"");
    txt = txt.replace(/\n$/,"");

    //txt = txt.replace(/\ /mg,"-");

    return txt;
  },
  chart: {
    firstRow: {
      firstMother: false,
      secondMother: false,
      thirdMother: false,
      fourthMother: false,
      firstDaughter: false,
      secondDaughter: false,
      thirdDaughter: false,
      fourthDaughter: false,
    },
    secondRow: {
      firstNiece: false,
      secondNiece: false,
      thirdNiece: false,
      fourthNiece: false
    },
    thirdRow: {
      rightWitness: false,
      leftWitness: false
    },
    fourthRow: {
      sentence: false,
      judge: false
    },
  },
  cast: async function(urls, firstMother=false, secondMother=false, thirdMother=false, fourthMother=false) {
    var jsons = await Promise.all(
      urls.map(url => fetch(url).then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Unable to fetch ' + url);
      })
      .catch((error) => {
        // If can't get the JSONs then just give up
        throw error;
      }))
    );
    return this.castChart(jsons[0], firstMother, secondMother, thirdMother, fourthMother);
  },
  houseChartTemplate: function() {
    let template = 
        "s     11.    / s     9.     /\n"
      + " s    h11   /10.s   h09    / \n"
      + "  s   n11  / h10 s  n09   /  \n"
      + "   s  b11 /  n10  s b09  /   \n"
      + " 12.s f11/   b10   sf09 / 8. \n"
      + " h12 s  /    f10    s  / h08 \n"
      + " n12  s/_____________s/  n08 \n"
      + " b12  /|             |s  b08 \n"
      + " f12 / |  LW     RW  | s f08 \n"
      + "    /  |  h14   h13  |  s    \n"
      + "   /1. |  n14   n13  | 7.s   \n"
      + "  / h01|  b14   b13  |h07 s  \n"
      + " /  n01|  f14   f13  |n07  s \n"
      + " s  b01|      J      |b07  / \n"
      + "  s f01|     h15     |f07 /  \n"
      + "   s   |     n15     |   /   \n"
      + " 2. s  |     b15     |  / 6. \n"
      + " h02 s |     f15     | / h06 \n"
      + " n02  s|_____________|/  n06 \n"
      + " b02  /s      4.     /s  b06 \n"
      + " f02 /  s    h04    /  s f06 \n"
      + "    / 3. s   n04   / 5. s    \n"
      + "   /  h03 s  b04  / h05  s   \n"
      + "  /   n03  s f04 /  n05   s  \n"
      + " /    b03   s   /   b05    s \n"
      + "/     f03    s /    f05     s";

    return template.replace(/s/g, "\\");
  },
  houseChartText: function() {
    // Replace hXX with figure head, nXX with figure neck etc in houseChartTemplate
    let symbol = "♦";
    let figureRows = ["head", "neck", "body", "feet"];
    let shieldToHouseChartMapping = {
      "firstMother": "01",
      "secondMother": "02",
      "thirdMother": "03",
      "fourthMother": "04",
      "firstDaughter": "05",
      "secondDaughter": "06",
      "thirdDaughter": "07",
      "fourthDaughter": "08",
      "firstNiece": "09",
      "secondNiece": "10",
      "thirdNiece": "11",
      "fourthNiece": "12",
      "rightWitness": "13",
      "leftWitness": "14",
      "judge": "15"
    }
    let houseChart = this.houseChartTemplate();

    for (const [keyLine, line] of Object.entries(this.chart)) {

      figureRows.forEach(function(row) {
        for (const [keyFig, figure] of Object.entries(line).reverse()) {
          if (keyFig != "sentence") {
            if (figure[row] == "active") {
              symbolStr = " " + symbol + " ";
            }
            else {
              symbolStr = symbol + " " + symbol;
            }
            houseChart = houseChart.replace(row.charAt(0) + shieldToHouseChartMapping[keyFig], symbolStr);
          }
        }
      });
    }
    return houseChart;
  },
  drawHelperGrid: function(c) {
    c.strokeStyle = "#FF0000";

    // Draw horizontal lines
    for (var x = 0; x < 300; x += 10) {
      c.moveTo(x, 0);
      c.lineTo(x, 300);
    }

    // Draw vertical lines
    for (var y = 0; y < 300; y += 10) {
      c.moveTo(0, y);
      c.lineTo(300, y);
    }

    c.stroke();
  },
  addTooltipArea: function(fig, xy) {
    let startX = xy[0] - 12;
    let startY = xy[1] - 14;
    let toX = startX + 48;
    let toY = startY + 62;
 
    let a = document.createElement("area");
    a.setAttribute("shape", "rect");
    a.setAttribute("coords", startX + "," + startY + "," + toX + "," + toY);
    a.setAttribute("title", fig.name);
    return a;
  },
  houseChartHtml: function() {
    var zodiacSymbol = {
      taurus: "\u2649",
      cancer: "\u264B",
      sagittarius: "\u2650",
      capricorn: "\u2651",
      scorpius: "\u264F",
      aquarius: "\u2652",
      pisces: "\u2653",
      virgo: "\u264D",
      aries: "\u2648",
      leo: "\u264C",
      libra: "\u264E",
      gemini: "\u264A",
    }
    var houseXy ={
      house1: [72, 194],
      house2: [42, 284],
      house3: [103,335],
      house4: [192,320],
      house5: [283,335],
      house6: [342, 284],
      house7: [312,194],
      house8: [342,104],
      house9: [282,54],
      house10: [192,68],
      house11: [102,54],
      house12: [42,104],
      house13: [144,164],
      house14: [240,164],
      house15: [192,224]
    };

    let xOffset = 5;
    let yOffset = 0;
    Object.keys(houseXy).forEach(key => {
      houseXy[key][0] += xOffset;
      houseXy[key][1] += yOffset;
    });

    var canvas = document.createElement("canvas");
    var canvasDiv = document.createElement("div");
    var canvasMap = document.createElement("map");
    var dummyImg = document.createElement("img");

    dummyImg.width = 420;
    dummyImg.height = 420;

    canvasMap.setAttribute("name", "house-chart-map");
    canvasMap.append(this.addTooltipArea(this.chart.firstRow.firstMother, houseXy.house1));
    canvasMap.append(this.addTooltipArea(this.chart.firstRow.secondMother, houseXy.house2));
    canvasMap.append(this.addTooltipArea(this.chart.firstRow.thirdMother, houseXy.house3));
    canvasMap.append(this.addTooltipArea(this.chart.firstRow.fourthMother, houseXy.house4));
    canvasMap.append(this.addTooltipArea(this.chart.firstRow.firstDaughter, houseXy.house5));
    canvasMap.append(this.addTooltipArea(this.chart.firstRow.secondDaughter, houseXy.house6));
    canvasMap.append(this.addTooltipArea(this.chart.firstRow.thirdDaughter, houseXy.house7));
    canvasMap.append(this.addTooltipArea(this.chart.firstRow.fourthDaughter, houseXy.house8));
    canvasMap.append(this.addTooltipArea(this.chart.secondRow.firstNiece, houseXy.house9));
    canvasMap.append(this.addTooltipArea(this.chart.secondRow.secondNiece, houseXy.house10));
    canvasMap.append(this.addTooltipArea(this.chart.secondRow.thirdNiece, houseXy.house11));
    canvasMap.append(this.addTooltipArea(this.chart.secondRow.fourthNiece, houseXy.house12));
    canvasMap.append(this.addTooltipArea(this.chart.thirdRow.leftWitness, houseXy.house13));
    canvasMap.append(this.addTooltipArea(this.chart.thirdRow.rightWitness, houseXy.house14));
    canvasMap.append(this.addTooltipArea(this.chart.fourthRow.judge, houseXy.house15));

    canvas.width = 420;
    canvas.height = 420;
    var c = canvas.getContext("2d");

    c.beginPath();

    //this.drawHelperGrid(c);

    c.strokeStyle = "#999999";

    // Border
    c.rect(x=0, y=0, w=420, h=420);

    // Outer square
    c.rect(x=30, y=30, w=360, h=360);

    // Inner square
    c.rect(x=120, y=120, w=180, h=180);

    // Wiggles
    c.moveTo(30, 30);
    c.lineTo(120, 120);
    c.moveTo(30, 390);
    c.lineTo(120, 300);
    c.moveTo(300, 120);
    c.lineTo(390, 30);
    c.moveTo(300, 300);
    c.lineTo(390, 390);

    // Middle square
    c.moveTo(210, 30);
    c.lineTo(30, 210);
    c.moveTo(210, 30);
    c.lineTo(390, 210);
    c.moveTo(30, 210);
    c.lineTo(210, 390);
    c.moveTo(210, 390);
    c.lineTo(390, 210);

    c.font = "16px Courier";
    c.fillText(zodiacSymbol.aries, 109, 21);
    c.fillText(zodiacSymbol.pisces, 199, 21);
    c.fillText(zodiacSymbol.aquarius, 289, 21);

    c.fillText(zodiacSymbol.capricorn, 395, 125);
    c.fillText(zodiacSymbol.sagittarius, 395, 215);
    c.fillText(zodiacSymbol.scorpius, 395, 305);

    c.fillText(zodiacSymbol.leo, 109, 411);
    c.fillText(zodiacSymbol.virgo, 199, 411);
    c.fillText(zodiacSymbol.libra, 289, 411);

    c.fillText(zodiacSymbol.taurus, 4, 125);
    c.fillText(zodiacSymbol.gemini, 4, 215);
    c.fillText(zodiacSymbol.cancer, 4, 305);

    this.addFigureToCanvas(c, this.chart.firstRow.firstMother, houseXy.house1, "1 ");
    this.addFigureToCanvas(c, this.chart.firstRow.secondMother, houseXy.house2, "2 ");
    this.addFigureToCanvas(c, this.chart.firstRow.thirdMother, houseXy.house3, "3 ");
    this.addFigureToCanvas(c, this.chart.firstRow.fourthMother, houseXy.house4, "4 ");
    this.addFigureToCanvas(c, this.chart.firstRow.firstDaughter, houseXy.house5, "5 ");
    this.addFigureToCanvas(c, this.chart.firstRow.secondDaughter, houseXy.house6, "6 ");
    this.addFigureToCanvas(c, this.chart.firstRow.thirdDaughter, houseXy.house7, "7 ");
    this.addFigureToCanvas(c, this.chart.firstRow.fourthDaughter, houseXy.house8, "8 ");
    this.addFigureToCanvas(c, this.chart.secondRow.firstNiece, houseXy.house9, "9 ");
    this.addFigureToCanvas(c, this.chart.secondRow.secondNiece, houseXy.house10, "10");
    this.addFigureToCanvas(c, this.chart.secondRow.thirdNiece, houseXy.house11, "11");
    this.addFigureToCanvas(c, this.chart.secondRow.fourthNiece, houseXy.house12, "12");
    this.addFigureToCanvas(c, this.chart.thirdRow.leftWitness, houseXy.house13, "LW");
    this.addFigureToCanvas(c, this.chart.thirdRow.rightWitness, houseXy.house14, "RW");
    this.addFigureToCanvas(c, this.chart.fourthRow.judge, houseXy.house15, "J");

    c.stroke();

    canvas.setAttribute("id", "house-chart");
    canvas.setAttribute("style", "grid-column: 1; grid-row: 1;");
    dummyImg.setAttribute("usemap", "#house-chart-map");
    dummyImg.setAttribute("style", "grid-column: 1; grid-row: 1;");
    canvasDiv.setAttribute("style", "display: grid;");
    canvasDiv.append(canvas);
    canvasDiv.append(dummyImg);
    canvasDiv.append(canvasMap);

    return canvasDiv;
  },
  addFigureToCanvas(c, figure, coords, houseNumber) {
    let x = coords[0];
    let y = coords[1];
    let head = (figure.head == "active") ? " ♦ " : "♦ ♦";
    let neck = (figure.neck == "active") ? " ♦ " : "♦ ♦";
    let body = (figure.body == "active") ? " ♦ " : "♦ ♦";
    let feet = (figure.feet == "active") ? " ♦ " : "♦ ♦";

    c.font = "20px Courier";
    c.fillText(head, x, y);
    c.fillText(neck, x, y + 15);
    c.fillText(body, x, y + 30);
    c.fillText(feet, x, y + 45);

    c.font = "10px Courier";
    c.fillText(houseNumber, x - 10, y - 6);

    let innerElement = false;
    switch(figure.innerElement) {
      case "fire":
        innerElement = "🔥";
        break;
      case "air":
        innerElement = "💨";
        break;
      case "water":
        innerElement = "💧";
        break;
      case "earth":
        innerElement = "🌍";
        break;
      default:
        console.log("Figure " + figure.name + ": Unknown innerElement " + figure.innerElement)
    }
    c.fillText(innerElement, x - 11, y + 7);

    let outerElement = false;
    switch(figure.outerElement) {
      case "fire":
        outerElement = "🔥";
        break;
      case "air":
        outerElement = "💨";
        break;
      case "water":
        outerElement = "💧";
        break;
      case "earth":
        outerElement = "🌍";
        break;
      default:
        console.log("Figure " + figure.name + ": Unknown outerElement " + figure.outerElement)
    }
    c.fillText(outerElement, x - 11, y + 19);

    let quality = (figure.quality == "mobile") ? "🐇" : "🐌";
    c.fillText(quality, x - 11, y + 31);

    let planet = false;
    switch(figure.planet) {
      case "saturn":
        planet = "♄";
        break;
      case "jupiter":
        planet = "♃";
        break;
      case "mars":
        planet = "♂";
        break;
      case "sun":
        planet = "☉";
        break;
      case "venus":
        planet = "♀";
        break;
      case "mercury":
        planet = "☿";
        break;
      case "moon":
        planet = "☾";
        break;
      case "southern lunar node":
        planet = "☋";
        break;
      case "northern lunar node":
        planet = "☊";
        break;
      default:
        console.log("Figure " + figure.name + ": Unknown planet " + figure.planet)
    }
    c.fillText(planet, x - 8, y + 41);
  },
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  figurePopupContent: function(figure, house) {
    let content = "<h4>" + figure.name;

    let innerElement = false;
    switch(figure.innerElement) {
      case "fire":
        innerElement = "🔥";
        break;
      case "air":
        innerElement = "💨";
        break;
      case "water":
        innerElement = "💧";
        break;
      case "earth":
        innerElement = "🌍";
        break;
      default:
        console.log("Figure " + figure.name + ": Unknown innerElement " + figure.innerElement)
    }


    let outerElement = false;
    switch(figure.outerElement) {
      case "fire":
        outerElement = "🔥";
        break;
      case "air":
        outerElement = "💨";
        break;
      case "water":
        outerElement = "💧";
        break;
      case "earth":
        outerElement = "🌍";
        break;
      default:
        console.log("Figure " + figure.name + ": Unknown outerElement " + figure.outerElement)
    }

    content += "<span title=\"Outer element " + this.capitalize(figure.outerElement) + "\">" + outerElement + "</span><span title=\"Inner element " + this.capitalize(figure.innerElement) + "\">(" + innerElement + ")</span>";

    let quality = (figure.quality == "mobile") ? "🐇" : "🐌";
    content += "<span title=\"Quality " + figure.quality + "\">" + quality + "</span>";

    let planet = false;
    switch(figure.planet) {
      case "saturn":
        planet = "♄";
        break;
      case "jupiter":
        planet = "♃";
        break;
      case "mars":
        planet = "♂";
        break;
      case "sun":
        planet = "☉";
        break;
      case "venus":
        planet = "♀";
        break;
      case "mercury":
        planet = "☿";
        break;
      case "moon":
        planet = "☾";
        break;
      case "southern lunar node":
        planet = "☋";
        break;
      case "northern lunar node":
        planet = "☊";
        break;
      default:
        console.log("Figure " + figure.name + ": Unknown planet " + figure.planet)
    }

    content += "<span title=\"Planet " + this.capitalize(figure.planet) + "\">" + planet + "</span>";

    content += "</h4>";

    content += "<img width=\"32\" heigh=\"32\" src=\"/assets/theme/geomancy/figures/" + figure.img + "\" style=\"float: left;\" />";

    content += "<p class=\"tooltip-keyword\">" + figure.keyword + "</p>";

    content += "<p>" + figure.description + "</p>";

    // House info, only houses have house info, not RW, LW and J
    if (isNaN(house) == false) {
        houseIndex = house -1;
        content += "<h4>" + this.housesInfo[houseIndex].number + " house</h4><p>" + this.housesInfo[houseIndex].description + "</p>";
    }

    return content;
  }, 
  addFigureV2: function(fig, xy, houseNumber) {
    let figContainer = document.createElement("span");
    let figTooltip = document.createElement("span");
    let figImg = document.createElement("img");
    figImg.src = "/assets/theme/geomancy/figures/" + fig.img;
    //figImg.src = "/assets/theme/geomancy/figures/populus.svg";
    figImg.width = "32";
    figImg.height = "32";
    figImg.alt = fig.name;

    figTooltip.setAttribute("class", "tooltip-content");
    figTooltip.innerHTML = this.figurePopupContent(fig, houseNumber);

    figContainer.setAttribute("class", "tooltip");
    figContainer.style = "position: absolute; top: " + xy[0] + "px; left: " + xy[1] + "px;";
    figContainer.append(figImg);
    figContainer.append(figTooltip);

    // If click events to toggle dropdown
    figImg.addEventListener('mouseup', function(e) {
      // Close any already opend tooltips
      document.querySelectorAll('.tooltip-content').forEach(t => t.style.visibility = "hidden");
      figTooltip.style.visibility = "visible";
    });

    let popupClose = document.createElement("div");
    popupClose.innerHTML = "✖";
    popupClose.className = "tooltip-close";

    popupClose.addEventListener('mouseup', function(e) {
      figTooltip.style.visibility = "hidden";
    });

    figTooltip.append(popupClose);

    return figContainer;
  },
  houseChartHtmlV2: function(quesitedHouse) {
    var houseXy ={
      house1: [104,24],
      house2: [164,4],
      house3: [200,44],
      house4: [190,104],
      house5: [200,164],
      house6: [164,204],
      house7: [104,186],
      house8: [44,198],
      house9: [10,164],
      house10: [20,104],
      house11: [8,44],
      house12: [46,10],
      house13: [78, 134],
      house14: [78, 72],
      house15: [130, 104]
    };

    houseTriangles = [
      [[0,120], [60,60],[60,180]], //1st
      [[0,120], [60,180],[0,240]], //2nd
      [[0,240], [60,180],[120,240]], //3rd
      [[120,240], [180,180],[60,180]], //4th
      [[120,240], [180,180],[240,240]],//5th
      [[240,240], [180,180],[240,120]],//6th
      [[180,180], [240,120],[180,60]],//7th
      [[180,60], [240,120],[240,0]],//8th
      [[240,0], [180,60],[120,0]],//9th
      [[120,0], [60,60],[180,60]],//10th
      [[0,0], [60,60],[120,0]],//11th
      [[0,0], [60,60],[0,120]],//12th
    ];

    var chartDiv = document.createElement("div");
    chartDiv.setAttribute("id", "house-chart");

    chartDiv.append(this.addFigureV2(this.chart.firstRow.firstMother, houseXy.house1, "1"));
    chartDiv.append(this.addFigureV2(this.chart.firstRow.secondMother, houseXy.house2, "2"));
    chartDiv.append(this.addFigureV2(this.chart.firstRow.thirdMother, houseXy.house3, "3"));
    chartDiv.append(this.addFigureV2(this.chart.firstRow.fourthMother, houseXy.house4, "4"));
    chartDiv.append(this.addFigureV2(this.chart.firstRow.firstDaughter, houseXy.house5, "5"));
    chartDiv.append(this.addFigureV2(this.chart.firstRow.secondDaughter, houseXy.house6, "6"));
    chartDiv.append(this.addFigureV2(this.chart.firstRow.thirdDaughter, houseXy.house7, "7"));
    chartDiv.append(this.addFigureV2(this.chart.firstRow.fourthDaughter, houseXy.house8, "8"));
    chartDiv.append(this.addFigureV2(this.chart.secondRow.firstNiece, houseXy.house9, "9"));
    chartDiv.append(this.addFigureV2(this.chart.secondRow.secondNiece, houseXy.house10, "10"));
    chartDiv.append(this.addFigureV2(this.chart.secondRow.thirdNiece, houseXy.house11, "11"));
    chartDiv.append(this.addFigureV2(this.chart.secondRow.fourthNiece, houseXy.house12, "12"));
    chartDiv.append(this.addFigureV2(this.chart.thirdRow.leftWitness, houseXy.house13, "LW"));
    chartDiv.append(this.addFigureV2(this.chart.thirdRow.rightWitness, houseXy.house14, "RW"));
    chartDiv.append(this.addFigureV2(this.chart.fourthRow.judge, houseXy.house15, "J"));

    var canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 240;
    var c = canvas.getContext("2d");


    // Scaffolding
    /*
    this.drawHelperGrid(c);

    c.stroke();
    c.strokeStyle = "#00ff00";
    c.moveTo(120,0);
    c.lineTo(120,250);
    c.moveTo(0,120);
    c.lineTo(240,120);
    c.stroke();
    */

    // Caluculate index from house number (1st -> 0, 2nd -> 1 etc)
    selectedHouseIndex = quesitedHouse.slice(0, -2);
    selectedHouseIndex = parseInt(selectedHouseIndex) - 1;
    houseTriangles.forEach(function(t, index) {
      c.beginPath();
      (index == selectedHouseIndex) ? c.fillStyle = "#D36135" : c.fillStyle = "#DDDBCB";
      c.strokeStyle = "#F7F6F3";
      c.moveTo(t[0][0], t[0][1]);
      c.lineTo(t[1][0], t[1][1]);
      c.lineTo(t[2][0], t[2][1]);
      c.fill();
      c.stroke();
    });

    c.beginPath();
    c.fillStyle = "#050505";
    c.font = "10px Courier";

    let numberoffset = [10, -7];
    c.fillText(" 1", houseXy.house1[1] + numberoffset[1], houseXy.house1[0] + numberoffset[0]);
    c.fillText(" 2", houseXy.house2[1] + numberoffset[1], houseXy.house2[0] + numberoffset[0]);
    c.fillText(" 3", houseXy.house3[1] + numberoffset[1], houseXy.house3[0] + numberoffset[0]);
    c.fillText(" 4", houseXy.house4[1] + numberoffset[1], houseXy.house4[0] + numberoffset[0]);
    c.fillText(" 5", houseXy.house5[1] + numberoffset[1], houseXy.house5[0] + numberoffset[0]);
    c.fillText(" 6", houseXy.house6[1] + numberoffset[1], houseXy.house6[0] + numberoffset[0]);
    c.fillText(" 7", houseXy.house7[1] + numberoffset[1], houseXy.house7[0] + numberoffset[0]);
    c.fillText(" 8", houseXy.house8[1] + numberoffset[1], houseXy.house8[0] + numberoffset[0]);
    c.fillText(" 9", houseXy.house9[1] + numberoffset[1], houseXy.house9[0] + numberoffset[0]);
    c.fillText("10", houseXy.house10[1] + numberoffset[1], houseXy.house10[0] + numberoffset[0]);
    c.fillText("11", houseXy.house11[1] + numberoffset[1], houseXy.house11[0] + numberoffset[0]);
    c.fillText("12", houseXy.house12[1] + numberoffset[1], houseXy.house12[0] + numberoffset[0]);
    c.fillText("RW", houseXy.house13[1] + numberoffset[1], houseXy.house13[0] + numberoffset[0]);
    c.fillText("LW", houseXy.house14[1] + numberoffset[1], houseXy.house14[0] + numberoffset[0]);
    c.fillText("J", houseXy.house15[1] + numberoffset[1], houseXy.house15[0] + numberoffset[0]);

    c.stroke();

    chartDiv.append(canvas);
    return chartDiv;
  }
};
