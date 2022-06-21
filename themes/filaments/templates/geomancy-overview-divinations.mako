<%inherit file="base.mako"/>

<%block name="content">
  <h1>${page.title}</h1>
  <ul class="directory-list">
  % for c in sorted(page.children, key=lambda i: i.url_path, reverse=True):
    <li><a href="${c.url_path}">${c.title}</a></li>
  % endfor
  </ul>

  <script src="/assets/theme/geomancy/shield-chart.js"></script>
  <script>
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


    function castChart(firstMother, secondMother, thirdMother, fourthMother) {
      sc = Object.create(ShieldChart);

      const chartJson = sc.cast(["/assets/theme/geomancy/figures.json"], firstMother, secondMother, thirdMother, fourthMother).then(
        // Success
        function() {
          let chartTxt = "Template: geomancy.mako\nFirst mother: " + sc.chart.firstRow.firstMother.id + "\nSecond mother: " + sc.chart.firstRow.secondMother.id + "\nThird mother: " + sc.chart.firstRow.thirdMother.id + "\nFourth mother: " + sc.chart.firstRow.fourthMother.id + "\n\n*What do I need to understand about today?*\n\n<pre id=\"house-chart\">\n" + sc.houseChartText() + "\n</pre>\n\n## Morning divination\n\n\n\n## Evening reflection\n\n\n";

          // Copy chart to clipboard
          navigator.clipboard.writeText(chartTxt);
        },
        // Failure
        function() { console.log("Unable to cast chart:(") }
      );
    }


    let castForm = document.createElement("form");

    let firstMotherSelect = figureSelect("1st mama");
    let secondMotherSelect = figureSelect("2nd mama");
    let thirdMotherSelect = figureSelect("3rd mama");
    let fourthMotherSelect = figureSelect("4th mama");

    let castBtn = document.createElement("button");
    castBtn.innerHTML = "🎲 Cast to clipboard";
    castBtn.setAttribute("style", "display: block; margin-bottom: 1.5em;");
    castBtn.addEventListener('click', function() {
      let firstMother = firstMotherSelect.options[firstMotherSelect.selectedIndex].value;
      let secondMother = secondMotherSelect.options[secondMotherSelect.selectedIndex].value;
      let thirdMother = thirdMotherSelect.options[thirdMotherSelect.selectedIndex].value;
      let fourthMother = fourthMotherSelect.options[fourthMotherSelect.selectedIndex].value;

      firstMother = (firstMother == "random") ? false : firstMother;
      secondMother = (secondMother == "random") ? false : secondMother;
      thirdMother = (thirdMother == "random") ? false : thirdMother;
      fourthMother = (fourthMother == "random") ? false : fourthMother;

      castChart(firstMother, secondMother, thirdMother, fourthMother);
    });


    let castH1 = document.getElementsByTagName("H1")[0];
    castH1.parentNode.insertBefore(castBtn, castH1.nextSibling)
    castH1.parentNode.insertBefore(fourthMotherSelect, castH1.nextSibling)
    castH1.parentNode.insertBefore(thirdMotherSelect, castH1.nextSibling)
    castH1.parentNode.insertBefore(secondMotherSelect, castH1.nextSibling)
    castH1.parentNode.insertBefore(firstMotherSelect, castH1.nextSibling)

 </script>
</%block>
