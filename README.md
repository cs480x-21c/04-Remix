## Assignment 4 - DataVis Remix + Multiple Views
Danya Baron


https://danyabaron.github.io/04-Remix/

Original Visualization: https://www.reddit.com/r/dataisbeautiful/comments/ls9jlo/oc_last_10_us_presidents_age_when_they_at_the/

## Description

I found this original visualization on r/dataisbeautiful. They took a data set from Wikipedia with all of the US presidents' ages when they started their presidency, and their ages at the end of their presidency. The original visualization was a bar chart comparing these ages of the US Presidents.

Original Viz:
![ScreenShot](https://github.com/danyabaron/04-Remix/blob/main/reddit-vis.png)

Remix Viz:
![ScreenShot](https://github.com/danyabaron/04-Remix/blob/main/double-svg.png)


For my visualization I took the CSV file from Wikipedia and used that data to create a bar chart and a scatter plot. I used primarily d3.js for this assignment. When a user puts their mouse over a bar chart, the corresponding circle in the scatter plot will enlarge and change color. Vice versa, when a user hovers thier mouse over a circle in the scatter plot, the corresponding rectangle will highlight and change color. This is how I decided to link the two SVGs.

![ScreenShot](https://github.com/danyabaron/04-Remix/blob/main/bar-interact.png) 


![ScreenShot](https://github.com/danyabaron/04-Remix/blob/main/circle-interact.png)



Extra Links
---
- http://bl.ocks.org/kbroman/ded6a0784706a109c3a5
- http://bl.ocks.org/1wheel/c3a4feeb5bf20a76d716
- https://observablehq.com/@philippkoytek/d3-part-3-brushing-and-linking
- https://bl.ocks.org/john-guerra/raw/2c00b2d675a6bf1c84a7b140f4536b0d/
- https://github.com/d3/d3-brush
- https://observablehq.com/collection/@d3/d3-brush
- https://observablehq.com/@d3/focus-context?collection=@d3/d3-brush
