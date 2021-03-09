Assignment 4 - DataVis Remix + Multiple Views.
===

My project can be found at [here](https://bearl.dev/04-Remix/) and it is a remixed of [this](http://bl.ocks.org/mstanaland/6100713) project from bl.ocks.org.

## Project Description

The original viz was a simple stacked bar chart where the X axis represents a year and the Y axis represents the amount of fruit with each bar in the stack representing a different type of fruit. The original article doesn't describe the specifics of the data so all information on it has to be inferred by the data and original viz directly.  Originally, the bar chart looked like this: 

![Original Viz](img\originalViz.PNG)

Looking at the chart I was immediately dissatisfied with the visuals for two major reasons. First was the overall aesthetics and color choice. The choice of reds, yellows and blacks is very hard on the eyes and visually unappealing. Looking directly at the hex values of the colors used, you can see that only this small portion of the color scale.  

 ![](img\ColorScale.PNG)

Looking at the individual colors, the colors used for Anjou Pears and Naval Oranges are very close and almost create a gradient as the light yellow almost fades into the white background.  

My second major issue relates to the first as I, someone who is not visually impaired, has trouble with the colors, I'd image someone who is would struggle as well. Running the photo of the viz through a [color blindness simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/), I've created the following images.

|                       Red Color Blind                        |                      Green Color Blind                       |                       BLue Color Blind                       |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![Red Blind](img\originalVizRedBlind.png) | ![Green Blind](img\originalVizGreenBlind.png) | ![Blue Blind](img\originalVizBlueBlind.png) |

Looking at them, I find that the gradient issue I mentioned earlier is still present and in some cases is much worst such as with those with red color blindness and and green color blindness. With these two, the differences in color between the Anjou Pears and Naval Oranges is almost indistinguishable and requires close looking to spot the difference. Upon this realization, I knew that the color palette had to significantly change and I then began my remix of the project. 

This is what my final viz looked like:

![](img\VizScreenshot.PNG)

For my remix, the first thing I did was to change the color palette to the one you see above. Additionally, I found the article [Inclusice Color Palettes for the Web](https://medium.com/cafe-pixo/inclusive-color-palettes-for-the-web-bbfe8cf2410e) which features three color palettes designed to accommodate those with color blindness. I implemented these palettes and allow the user to chose which one they want by using the four buttons on the far right.  

To add interactivity, I added the chart you see on the right. This chart is the sum of the values of each fruit, separated and organized in a bar chart. By default, the chart displays the average of each fruit for ever year, however, the user is able to brush over the years to see the sum of the values of a select number of years. In the picture below, I brushed over the years of 2009-2013 and the bar graph updated to match the newly selected years. 

![](img\VizScreenshotBrush.PNG)

I also added intractability to the bar chart on the right. By hovering your mouse over a bar, all of the sections said bar represents of the left chart will be highlighted. In the picture below, I'm hovering my mouse over the McIntosh Apples bar on the right, because the bar chart represents the entire chart on the left, all of the McIntosh Apples sections are highlighted. 

![](img\VizScreenshotHighlight.PNG)

This also works when a section is brushed. In the picture below, the left chart has been brushed for the years 2009-2013 so when I hover my mouse over the McIntosh Apples section of the chart on the right, only the McIntosh Apples sections of the brush years will be highlighted.

![](img\VizScreenshotBrushHighlight.PNG)

# Achievements


## **Technical Achievements**

- I converted the project from using d3 v3 into  using d3 v4.
- The data in the project was all stored locally as an array of objects called `data`. I took all of the data and put it into the CSV named `data.csv`. 
- Implemented [d3-interpolate](https://github.com/d3/d3-interpolate) to convert the brush coordinates into the appropriate years the brush covered which I then used to gather the data needed to update the linked bar chart. 

### **Design Achievements**

- For the newly added bar chart, the grid pattern dynamically updates to match the number of ticks on the Y axis legend.
- Besides the default palette, the user has the choice of viewing the charts with three additional palettes. These palettes are taken from the article [Inclusice Color Palettes for the Web](https://medium.com/cafe-pixo/inclusive-color-palettes-for-the-web-bbfe8cf2410e), these palettes are designed to accommodate those with color blindness.  
