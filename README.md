Assignment 4 - DataVis Remix + Multiple Views
===
Name: Haowen Wei

In this visualization I used http://bl.ocks.org/timelyportfolio/5c136de85de1c2abb6fc as a reference.
COVID-19 is keep impacting our community. In this Homework I used the covid-19 data set in MA "massachusetts-history.csv". 
This dataset is in the repo.
Here is a overview of this homework:
![image](https://user-images.githubusercontent.com/59973823/111015033-d05af900-8374-11eb-9579-d40e0f7d6d57.png)

The first graph is "Total Death vs Time", the second graph is "Daily Death vs Time", and the third graph is “Total recover vs Time ”.
The X axis is the Time and the Y axis is the number of people.

The two way linking view is between the first graph and second graph. (Total death in MA and the Daily Death in MA. The third graph is reference)
The linking view between the "total recover" and "total death" is one way.

Instead of using a smooth region for daily death, the daily death region is encoded to many small bars. 
Here is the demo:
Total Death link to Daily Death:
![image](https://user-images.githubusercontent.com/59973823/111015229-d2718780-8375-11eb-98ef-f11eb9e28f21.png)

Daily Death link to Total Death:
![image](https://user-images.githubusercontent.com/59973823/111015259-eb7a3880-8375-11eb-9065-9a23608e2f23.png)

Total Recover link to Total Death:
![image](https://user-images.githubusercontent.com/59973823/111015305-15cbf600-8376-11eb-9a63-2ee335401d94.png)

After applying the brush to one graph, the linked graph will only display the corresponding time region, and users can view the detail of this dataset.
Note: before using the brush on another graph, users need clean the brush on previous graph.

On the top I have several buttons to change the color of the graph. By clicking those buttons users can change the color of the graph.

![image](https://user-images.githubusercontent.com/59973823/111015509-17e28480-8377-11eb-9a4c-834839347d53.png)

technical achievements
---
Instead of the two way link, I have a extra one way link view between the total recover and total death.
I add the button control in this assignment, and users can change the color with their preference.
I tested this visualization and I do not find any bug.
The animation is smooth.
The axis tick will change while using brush.

Design achievement
---
All the graphs are aligned in the same region. 
The brushing is prefect LOL
Users can change the color of the graph with their preference.
The axis tick will change while using brush.

Note:
---
Before I hand on this visualization, I tried the world map visaulizaton with bar chart linking, but I gave up after I finishing the map :( It is toooooo hard :(

I still pushed this visualization and you can find it in index2.html.
![image](https://user-images.githubusercontent.com/59973823/111016059-c8ea1e80-8379-11eb-95a6-d1e4b8d002e8.png)




Requirements 
---
All the reqirements are done :)
0. Your code should be forked from the GitHub repo and linked using GitHub pages. 
1. Your project should load a dataset you found on the web from the vis you're remixing. You may extract the data by sight if necessary. Put this file in your repo.
2. Your project should use d3 to build a visualization of the dataset. 
3. Your writeup (readme.md in the repo) should contain the following:

- Working link to the visualization hosted on gh-pages or other external sources.
- Concise description and screenshot of your visualization.
- Description of the v you attempted with this visualization.
- Description of the design achievements you attempted with this visualization.

Reference
---

- https://observablehq.com/@philippkoytek/d3-part-3-brushing-and-linking
- https://bl.ocks.org/john-guerra/raw/2c00b2d675a6bf1c84a7b140f4536b0d/
- https://github.com/d3/d3-brush
- https://observablehq.com/collection/@d3/d3-brush
- https://observablehq.com/@d3/focus-context?collection=@d3/d3-brush
- http://bl.ocks.org/timelyportfolio/5c136de85de1c2abb6fc
- https://vizhub.com/
- https://observablehq.com/@john-clarke/programmatically-control-a-d3-brush
- https://observablehq.com/@d3/pannable-chart
- https://www.youtube.com/watch?v=_8V5o2UHG0E&t=45216s
