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
