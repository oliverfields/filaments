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
    function figureSelect() {
      let figSelect = document.createElement("select");
      let figDefault = document.createElement("option");
      figDefault.setAttribute("selected", "selected");
      figDefault.setAttribute("value", "random");
      figDefault.innerHTML = "Random figure";

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
    let firstMotherSelect = figureSelect();
    let secondMotherSelect = figureSelect();
    let thirdMotherSelect = figureSelect();
    let fourthMotherSelect = figureSelect();

    let castH1 = document.getElementsByTagName("H1")[0];
    castH1.parentNode.insertBefore(firstMotherSelect, castH1.nextSibling)
    castH1.parentNode.insertBefore(secondMotherSelect, castH1.nextSibling)
    castH1.parentNode.insertBefore(thirdMotherSelect, castH1.nextSibling)
    castH1.parentNode.insertBefore(fourthMotherSelect, castH1.nextSibling)
    sc = Object.create(ShieldChart);

    const chartJson = sc.cast(["/assets/theme/geomancy/figures.json"]).then(
      // Success
      function() {
        let chartTxt = "Template: geomancy.mako\nFirst mother: " + sc.chart.firstRow.firstMother.id + "\nSecond mother: " + sc.chart.firstRow.secondMother.id + "\nThird mother: " + sc.chart.firstRow.thirdMother.id + "\nFourth mother: " + sc.chart.firstRow.fourthMother.id + "\n\n*What do I need to understand about today?*\n\n<pre id=\"house-chart\">\n" + sc.houseChartText() + "\n</pre>\n\n## Morning divination\n\n\n\n## Evening reflection\n\n\n";

        let copyBtn = document.createElement("button");
        copyBtn.innerHTML = "🎲 Cast to clipboard";
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(chartTxt);
        }
        copyBtn.setAttribute("style", "display: block; margin-bottom: 1.5em;");

        let castH1 = document.getElementsByTagName("H1")[0];
        castH1.parentNode.insertBefore(copyBtn, castH1.nextSibling)
      },
      // Failure
      function() { console.log("Unable to cast chart:(") }
    );
  </script>
</%block>
