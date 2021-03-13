Assignment 4 - DataVis Remix + Multiple Views
===
Rachael Sallie

https://resallie.github.io/04-Remix/


Info: This visualization is a remix of the following: https://i.redd.it/h6c7ppi38ll61.png
The original viz was meant to communicate the tools used by the data visualization community, but I found parts of it to be misleading, with it counting the percentage of the userbase being professionals.
In my remix, I've chosen to instead measure the percentage of the datavis community using each datavis tool with a bar chart. Additionally, I added a new network vis to display the crossover of users between different tools.
Click a bar to set the center of the network, and hover over nodes to see the percentage of that tool's users that use every other tool. The population of the userbase is additionally highlighted in the bar graph. 


Design Achievements:
- My network graph uses multiple levels of encoding to get across information. Both proximity to the center node, as well as node size, indicate the percentage of the center node's users that also use the tool represented by the external node. Additionally, the viewer can hover over a node to see the name of the tool and the precise percentage.
-I use a variety of animations and color changes to provide user feedback as a viewer interacts with my viz. Hovering over bars or nodes cause their fill color to change, and clicking a bar has an animation quickly fading through a color with different brightness back to the original. The highlighted percentage of the bars the appears when hovering over a node has animations to draw the user's attention to the updated part of the vis.
- I researched distinct colors to use for each of my 18 categories, and I ultimately used the set found here: https://sashamaps.net/docs/resources/20-colors/ that has 99% accessibility.

Tech Achievements: 
-A lot of work went in to manipulating the data into a form I could make these graphs out of. I ended up editing titles in the original dataset to make it easier to use. A lot of grouping had to happen to get all of the data I needed into a useful form (this was a massive help: https://observablehq.com/@d3/d3-group). The original dataset I found very difficult to work with and I spent many hours learning how to wrangle it into the forms needed for the bar chart and the network/force-directed graph. 

-I created a force directed graph for my second visualization (I learned a lot from this source: https://observablehq.com/@d3/force-directed-graph).

-I learned how to use and then made use of a variety of animations (with a lot learned from here: https://www.tutorialsteacher.com/d3js/animation-with-d3js)
