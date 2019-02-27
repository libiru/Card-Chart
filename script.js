/* ----------------BAR1--------------------*/
var data2 = [4, 8, 15, 16, 23, 42];
var x = d3.scale.linear()
  .domain([0, d3.max(data2)])
  .range([0, 420]);

d3.select(".chart1")
  .selectAll("div")
  .data(data2)
  .enter().append("div")
  .style("width", function (d) { return x(d) + "px"; })
  .attr({ class: 'shadow' })
  .text(function (d) { return d; });
/* ----------------BAR2--------------------*/

var data3 = [5, 9, 15, 16, 23, 42];

var x = d3.scale.linear()
  .domain([0, d3.max(data3)])
  .range([0, 420]);

d3.select(".chart2")
  .selectAll("div")
  .data(data3)
  .enter().append("div")
  .style("width", function (d) { return x(d) + "px"; })
  .attr({ class: 'shadow' })
  .text(function (d) { return d; });

/* ----------------DONUT--------------------*/
var dataset = [
  { name: 'Ex1', percent: 39.10 },
  { name: 'Ex2', percent: 32.51 },
  { name: 'Ex3', percent: 13.68 },
  { name: 'Ex4', percent: 8.71 },
  { name: 'Others', percent: 6.01 }
];

var pie = d3.layout.pie()
  .value(function (d) { return d.percent })
  .sort(null)
  .padAngle(.03);

var w = 300, h = 300;

var outerRadius = w / 2;
var innerRadius = 100;

var color = d3.scale.category10();

var arc = d3.svg.arc()
  .outerRadius(outerRadius)
  .innerRadius(innerRadius);

var svg = d3.select("#chart")
  .append("svg")
  .attr({
    width: w,
    height: h,
    class: 'shadow'
  }).append('g')
  .attr({
    transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
  });
var path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr({
    d: arc,
    fill: function (d, i) {
      return color(d.data.name);
    }
  });

path.transition()
  .duration(1000)
  .attrTween('d', function (d) {
    var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
    return function (t) {
      return arc(interpolate(t));
    };
  });


var restOfTheData = function () {
  var text = svg.selectAll('text')
    .data(pie(dataset))
    .enter()
    .append("text")
    .transition()
    .duration(200)
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".4em")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.data.percent + "%";
    })
    .style({
      fill: '#fff',
      'font-size': '10px'
    });

  var legendRectSize = 20;
  var legendSpacing = 7;
  var legendHeight = legendRectSize + legendSpacing;


  var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr({
      class: 'legend',
      transform: function (d, i) {
        //Just a calculation for x & y position
        return 'translate(-35,' + ((i * legendHeight) - 65) + ')';
      }
    });
  legend.append('rect')
    .attr({
      width: legendRectSize,
      height: legendRectSize,
      rx: 20,
      ry: 20
    })
    .style({
      fill: color,
      stroke: color
    });

  legend.append('text')
    .attr({
      x: 30,
      y: 15
    })
    .text(function (d) {
      return d;
    }).style({
      fill: '#929DAF',
      'font-size': '14px'
    });
};

setTimeout(restOfTheData, 1000);
