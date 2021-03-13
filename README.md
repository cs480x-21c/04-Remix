Assignment 4 - DataVis Remix + Multiple Views
===

Project Description
---
Link to visualization hosted on gh-pages: 
http://haleyhauptfeld.com/04-Remix/index.html

Original visualization: https://wid.world/country/usa/

The data I chose to remix is the income inequality within the USA from 1913-2019. The data consists of different percentiles and their shared percentage of the total income in the USA amongst different percentiles. The four percentiles that I focused on were the top 10% share, the middle 40% share, the bottom 50% share, and the top 1% share. The original visualization had an overwhelming amount of data that made it hard to focus on one piece of information, so I decided to simplify by only focusing on the data I just described. I visualize the data in three ways: line chart, bar chart, and scatterplot. The linked view happens from the bar chart to the line chart. When users hover over the bars in the bar chart, it links to the line chart, where the line chart displays a number that represents the percentile that bar being hovered over is associated with. The associations are as follows:
* 10 = top 10%
* 40 = middle 40%
* 50 = bottom 50%
* 1 = top 1%

There is currently no working link from the line chart to the bar chart. There are also no links to or from the scatterplot. The scatterplot is intended to count as my technical achievement.

If I had more time to work on this project, I would definitely try adding more things to make my visualization more clear, and get rid of some bugs that make the visualization confusing. 

Some bugs that currently occur are:
* The number that appears on the line chart do not go away after you hover over the bar linked to it. They end up overlapping the other displayed number when multiple bars are hovered over the visualization before refreshing the page.
* The line chart should have had four separate colors to represent the four different percentiles that I'm trying to display. They are all currently gray due to the implementation of the linked view.
* The bar chart should have had four separate colors to represent the four different percentiles that I'm trying to display. They are all currently red.

Some things that I would try to add to make my visualization more clear are:
* A legend for each visualization so that users can tell which color corresponds to each percentile.
* An explanation of what each percentile represents, perhaps in the form of a tooltip where users can hover over each percentile and it explains what that percentile represents.

I understand my visualization is very buggy, but I was still able to connect two views together using the sources that I've referenced at the bottom of this readme. I was also able to implement a third visualization that clarifies the data a little easier so that the user can understand it a little better.

Screenshot
---
![image](https://user-images.githubusercontent.com/34756903/111009927-ee1f6280-8362-11eb-8e12-c3f623ceddb8.png)


Technical Achievement
---
I added a third visualization of the given data using a scatterplot.

Design Achievement
---
I added titles to the x-axis and y-axis of each visualization to clarify what they represent.

References
---
* https://www.d3-graph-gallery.com/graph/line_several_group.html
* http://bl.ocks.org/mattykuch/40ba19de703632ea2afbbc5156b9471f
* https://bl.ocks.org/mbostock/3183403
* https://www.d3-graph-gallery.com/graph/barplot_basic.html
* https://bl.ocks.org/mbostock/3183403
* https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
* http://www.d3noob.org/2013/01/adding-title-to-your-d3js-graph.html
