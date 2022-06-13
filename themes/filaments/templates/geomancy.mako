<%inherit file="base.mako"/>
<%block name="content">
	<h1>${page.title}</h1>
	<%include file="article-meta.mako" args="**context.kwargs" />

	${page.html}
    <script src="/assets/theme/geomancy/shield-chart.js"></script>
	<script>
      sc = Object.create(ShieldChart);

      const chartJson = sc.cast(
        ["/assets/theme/geomancy/figures.json"],
        firstMother = "${page.custom_headers['first mother']}",
        secondMother = "${page.custom_headers['second mother']}",
        thirdMother = "${page.custom_headers['third mother']}",
        fourthMother = "${page.custom_headers['fourth mother']}"
      ).then(
        // Success
        function() {
          const preSc = document.getElementById("house-chart");
          preSc.parentNode.replaceChild(sc.houseChartHtml(), preSc);
        },
        // Failure
        function() { console.log("Unable to cast chart:(") }
      );
    </script>
</%block>
