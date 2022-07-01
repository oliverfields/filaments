<%inherit file="base.mako"/>

<%block name="content">
  <h1>${page.title}</h1>

  <h2>Archive</h2>
  <ul class="directory-list">
  % for c in sorted(page.children, key=lambda i: i.url_path, reverse=True):
    <li><a href="${c.url_path}">${c.title}</a></li>
  % endfor
  </ul>

  <script src="/assets/theme/geomancy/shield-chart.js"></script>
  <script>
    function planetarySpiritSelect() {
      let planetarySpirits = [
        {
          "name": "Zazel",
          "planet": "Saturn",
          "planetSymbol": "♄",
          "intelligence": "Agiel",
          "sigil": "Zazel.png",
          "governs": "Time, death, agriculture and building, abstract thought and philosophy and all things beloning to the past"
        },
        {
          "name": "Hismael",
          "planet": "Jupiter",
          "planetSymbol": "♃",
          "intelligence": "Yophiel",
          "sigil": "Hismael.png",
          "governs": "Good fortune, growth and expansion, formal ceremonies and rites of passage, charity, feasting, and advancement in ones profession or in any organization"
        },
        {
          "name": "Bartzabel",
          "planet": "Mars",
          "planetSymbol": "♂",
          "intelligence": "Graphiel",
          "sigil": "Bartzabel.png",
          "governs": "Competition, war, destruction, surgery, male sexuality, and matters connected with livestock"
        },
        {
          "name": "Sorath",
          "planet": "Sun",
          "planetSymbol": "☉",
          "intelligence": "Nakhiel",
          "sigil": "Sorath.png",
          "governs": "Power, leadership, positions of authority, success, balance and reconciliation, and sports and games involving physical effort"
        },
        {
          "name": "Kedemel",
          "planet": "Venus",
          "planetSymbol": "♀",
          "intelligence": "Hagiel",
          "sigil": "Kedemel.png",
          "governs": "Art, music and dance, social occasions and enjoyments, pleasure, love, the emotions generally and female sexuality"
        },
        {
          "name": "Taphthartharath",
          "planet": "Mercury",
          "planetSymbol": "☿",
          "intelligence": "Tiriel",
          "sigil": "Taphthartharath.png",
          "governs": "Learning, messages, communication, all intellectual pursuits, gambling, medicine and healing, trade, economic matters, trickery, deception and theft"
        },
        {
          "name": "Chashmodai",
          "planet": "Moon",
          "planetSymbol": "☾",
          "intelligence": "Malkah be-Tarshishim va-ad Ruachoth and Shad Barshemoth ha-Shartathan",
          "sigil": "Chashmodai.png",
          "governs": "Journeys, the sea, hunting and fishing, biological cycles, reporduction and childbirth, psychic phenomona, dreams, the unconcious, and the unknown."
        }
      ];

      let table = document.createElement("table");
      table.setAttribute("style", "display: block; height: 100px; overflow: auto;");

      let headerRow = document.createElement("tr");

      let headerName = document.createElement("th");
      headerName.innerHTML = "Name";
      let headerGoverns = document.createElement("th");
      headerGoverns.innerHTML = "Governs";

      headerRow.append(headerName);
      headerRow.append(headerGoverns);

      //table.append(headerRow);

      planetarySpirits.forEach((s, index) => {
        let planetSigil = document.createElement("img");
        let planetRow = document.createElement("tr");
        let planetName = document.createElement("td");

        planetSigil.setAttribute("src", "/assets/theme/geomancy/planetary-spirit-sigils/" + s.sigil);
        planetSigil.setAttribute("width", "16");
        planetSigil.setAttribute("height", "16");
        planetSigil.setAttribute("alt", s.name + " sigil");

        let selectPlanet = document.createElement("input");
        selectPlanet.setAttribute("type", "radio");
        selectPlanet.setAttribute("name", "planetary-spirit");
        selectPlanet.setAttribute("value", s.name);

        if (index == 0) selectPlanet.checked = true;

        planetName.setAttribute("style", "font-size: .8em; font-weight: bold;");
        planetName.innerHTML = " " + s.name + "<br /><em style=\"font-size: .8em;\">" + s.planet + " " + s.planetSymbol + " / " + s.intelligence + "</em>";
        planetName.prepend(planetSigil);
        planetName.prepend(selectPlanet);


        let planetGoverns = document.createElement("td");
        planetGoverns.setAttribute("style", "font-size: .8em;");
        planetGoverns.innerHTML = s.governs;

        planetRow.append(planetName);
        planetRow.append(planetGoverns);

        table.append(planetRow);

      });
      return table;
    }

    function figureSelect(name) {
      let figSelect = document.createElement("select");
      figSelect.setAttribute("style", "margin: 0 .5em .5em 0;");
      let figDefault = document.createElement("option");
      figDefault.setAttribute("selected", "selected");
      figDefault.setAttribute("value", "random");
      figDefault.innerHTML = "Random " + name;

      figSelect.append(figDefault);

      let figures = [
        "laetitia",
        "caput-draconis",
        "fortuna-minor",
        "amissio",
        "puer",
        "rubeus",
        "acquisitio",
        "conjunctio",
        "populus",
        "via",
        "albus",
        "puella",
        "fortuna-major",
        "tristitia",
        "cauda-draconis",
        "carcer"
      ];

      figures.sort(() => Math.random() - 0.5).forEach(function(fig) {
        let figOption = document.createElement("option");
        figOption.setAttribute("value", fig);
        let name = fig.replace(/^(.)/, function(v) { return v.toUpperCase();});
        name = name.replace(/-(.)/, function(v) { return v.toUpperCase();});
        name = name.replace("-", " ");
        figOption.innerHTML = name;
        figSelect.append(figOption);
      });

      return figSelect;
    }


    let castForm = document.createElement("form");
    let buttonsDiv = document.createElement("div");

    let firstMotherSelect = figureSelect("1st mama");
    let secondMotherSelect = figureSelect("2nd mama");
    let thirdMotherSelect = figureSelect("3rd mama");
    let fourthMotherSelect = figureSelect("4th mama");

    let castControl = document.createElement("div");
    castControl.setAttribute("class", "geomancy-casting-control");
    let castControlHeading = document.createElement("h2");
    castControlHeading.innerHTML = "Geomancy casting";

    let questionHeading = document.createElement("h3");
    questionHeading.setAttribute("style", "margin-top: 0;");
    questionHeading.innerHTML = "Question";

    let planetarySpiritHeading = document.createElement("h3");
    planetarySpiritHeading.innerHTML = "Planetary spirit";

    let figuresHeading = document.createElement("h3");
    figuresHeading.innerHTML = "Figures";

    let question = document.createElement("input");
    question.setAttribute("name", "question");
    question.setAttribute("style", "width: 98%;");
    question.setAttribute("value", "What do I need to understand about today?");

    let castBtn = document.createElement("button");
    buttonsDiv.append(castBtn);
    buttonsDiv.setAttribute("style", "margin-top: 2em;");
    castBtn.innerHTML = "Cast chart 🎲";
    castBtn.setAttribute("style", "margin-right: 1em;");
    castBtn.addEventListener('click', function() {
      let firstMother = firstMotherSelect.options[firstMotherSelect.selectedIndex].value;
      let secondMother = secondMotherSelect.options[secondMotherSelect.selectedIndex].value;
      let thirdMother = thirdMotherSelect.options[thirdMotherSelect.selectedIndex].value;
      let fourthMother = fourthMotherSelect.options[fourthMotherSelect.selectedIndex].value;

      firstMother = (firstMother == "random") ? false : firstMother;
      secondMother = (secondMother == "random") ? false : secondMother;
      thirdMother = (thirdMother == "random") ? false : thirdMother;
      fourthMother = (fourthMother == "random") ? false : fourthMother;

      sc = Object.create(ShieldChart);

      const chartJson = sc.cast(["/assets/theme/geomancy/figures.json"], firstMother, secondMother, thirdMother, fourthMother).then(
        // Success
        function() {
          let selectedPlanetarySpirit = document.querySelector('input[name="planetary-spirit"]:checked').value;
          let chartTxt = "Template: geomancy.mako\nFirst mother: " + sc.chart.firstRow.firstMother.id + "\nSecond mother: " + sc.chart.firstRow.secondMother.id + "\nThird mother: " + sc.chart.firstRow.thirdMother.id + "\nFourth mother: " + sc.chart.firstRow.fourthMother.id + "\n\n## " + question.value + "\n\n<img alt=\"Planetary spirit " + selectedPlanetarySpirit + "\" title=\"" + selectedPlanetarySpirit + "\" class=\"planetary-spirit-sigil\" src=\"/assets/theme/geomancy/planetary-spirit-sigils/" + selectedPlanetarySpirit + ".png\" />\n\n<pre id=\"house-chart\">\n" + sc.houseChartText() + "\n</pre>\n\n## Morning divination\n\n\n\n## Evening reflection\n\n\n";
          // Copy chart to clipboard
          let copyChartBtn = document.createElement("button");
          copyChartBtn.innerHTML = "Copy chart 📋";
          copyChartBtn.setAttribute("id", "copyChartBtn");
          copyChartBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(chartTxt);
          });
          let oldCopyBtn = document.getElementById("copyChartBtn");
          if (oldCopyBtn) oldCopyBtn.remove();
          castBtn.parentNode.insertBefore(copyChartBtn, castBtn.nextSibling);
        },
        // Failure
        function() { console.log("Unable to cast chart:(") }
      );
    });

    castControl.append(questionHeading);
    castControl.append(question);
    castControl.append(planetarySpiritHeading);
    castControl.append(planetarySpiritSelect());
    castControl.append(figuresHeading);
    castControl.append(firstMotherSelect);
    castControl.append(secondMotherSelect);
    castControl.append(thirdMotherSelect);
    castControl.append(fourthMotherSelect);
    castControl.append(buttonsDiv);

    let castH1 = document.getElementsByTagName("H1")[0];
    castH1.parentNode.insertBefore(castControl, castH1.nextSibling)
    castH1.parentNode.insertBefore(castControlHeading, castH1.nextSibling)

 </script>
</%block>
