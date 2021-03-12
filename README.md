# Assignment 4 - DataVis Remix + Multiple Views
---
[https://pooja-a-patel.github.io/04-Remix/index.html](https://pooja-a-patel.github.io/04-Remix/index.html)
## Requirements
0. Your code should be forked from the GitHub repo and linked using GitHub pages. :heavy_check_mark:
1. Your project should load a dataset you found on the web from the vis you're remixing. You may extract the data by sight if necessary. Put this file in your repo. :heavy_check_mark:
1. Your project should use d3 to build a visualization of the dataset. :heavy_check_mark:
1. Your writeup (readme.md in the repo) should contain the following: :heavy_check_mark:

- Working link to the visualization hosted on gh-pages or other external sources.
- Concise description and screenshot of your visualization.
- Description of the technical achievements you attempted with this visualization.
- Description of the design achievements you attempted with this visualization.

## Critique and Redesign
For this assignment I decided to remix a visualization about CO<sub>2</sub> emissions from [The World Bank](https://data.worldbank.org/indicator/EN.ATM.CO2E.PC?end=2016&name_desc=true&start=1960&view=chart&year=1977).
The data required some re-formatting and I chose to shorten the dataset to only include years from 1990-2010 (the years  with the most filled in data). The values in the dataset include the Country, Country Code, Continent, Region, Year, Emissions Per Capita,and Emissions (thousand metric tons).

The website includes three chart types (Line, Bar, and Map) to visualize the emissions data.

Screenshots of the three visualizations can be found below.
| Line        | Bar         |Map       |
| ----------- | ----------- |----------|
|![line](https://github.com/pooja-a-patel/04-Remix/blob/main/img/originalLine.PNG) |![bar](https://github.com/pooja-a-patel/04-Remix/blob/main/img/originalBar.PNG) |![map](https://github.com/pooja-a-patel/04-Remix/blob/main/img/originalMap.PNG) |

#### Critique of Line Chart
The line chart is depicting the world's total emissions from 1960 to 2016. I can see from the chart the overall trend, however the chart does not seem very interesting or appealing. Moreover, the line chart visualization does not give a 
overview of all the data. Also, with all of the data regarding individual countries it would be more intersting to see what percentage each country takes of the global total emissions. Thus, this line chart does not give a full perspetive to the values of the data.
#### Critique of Bar Chart
Similar to the line chart, the bar chart only depicts the world total emissions for a given year. This visualization does not say to what extent each nation contributes to the global total. Moreover, the bar itself does not change its size regarless of the year, instead the x-axis scale will adjust.
This is a bit misleading because the scale of the bar remains the same regardless of the year or total emissions. It would be  intersting to see what the breakdown is of countries emissions compared to one another in a bar representation. Overall, the bar chart does not give a full scope to  the data.
#### Critique of Map Chart
The map chart is fairly well done. My critque of the map is the color encodings. The colors used in the map are shades of blue, and a dew of them are quite light. In terms of accessibilty for color usage, this chart can be improved upon there. Also, when a user hovers over a country it will only give the user a number, there will be no indicaton of the year or units involved.

## Remix Visualization and Multiple Views
Screenshots of the remixed and linked view visualizations can be seen below.
| Map        | Donut         |
| ----------- | ----------- |
|![map](https://github.com/pooja-a-patel/04-Remix/blob/main/img/Map.PNG) |![donut](https://github.com/pooja-a-patel/04-Remix/blob/main/img/Donut.PNG) |
#### My Redesign (Donut Chart)
Originally, I thought about doing a line chart with a line for each country's emissions over time. However, the dataset includes over 100 countries so visualizing all those lines in one chart would not be ideal or easy to understand.
So then, I went back to my original point of representing each country by its percentage of the total global emissions and decided to to a donut chart. This redesign would allow me to represent each country's emission percatage.
Since I had the continent value associated with each country in the dataset, I color coded each country to it's corresponding continent. One thing to note is that the dataset does not separate North America and South America, instead both are combined into "Americas"
#### My Redesign (Map)
My redesign would use a different color scale, one that is accessible. Also, when a user hovers over on a country, the stats specific to that country will appear.
### Technical Achievements
- **On-Hover Stats**: When a user hovers over a country, specific stats relevant to that country in the given year will apppear. The stats include the year, total emissions, and country name. This was done by using tooltip.
- **Filter the Emissions Data**: I decided to filter the emissions data by continent in the pie chart. Thus, each country represented in the pie chart is color coded according to the continent the country belongs to.
### Design Achievements
- **Accessible Color Scale for Choropleth Map**: I utilized two color palettes and tested them with diffrent color blindness traits to ensure that the colors used in thr chart are accessible.  
- **CSS Styling**: I utilized CSS to style the webpage and position the various elements neatly.
## Resources
[Basic Choropleth Map D3](https://www.d3-graph-gallery.com/graph/choropleth_basic.html)  
[D3 Donut Chart](https://www.d3-graph-gallery.com/donut)  
[Color Scheme/Accessibility](https://davidmathlogic.com/colorblind/#%23648FFF-%23785EF0-%23DC267F-%23FE6100-%23FFB000)

|![map](https://github.com/pooja-a-patel/04-Remix/blob/main/img/MapPalette.PNG) | ![donut](https://github.com/pooja-a-patel/04-Remix/blob/main/img/DonutPalette.PNG) |
|---|---|
