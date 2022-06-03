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
  castChart: function(json, firstMother=false, secondMother=false, thirdMother=false, fourthMother=false) {
    this.figures = json;

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
  }
};
