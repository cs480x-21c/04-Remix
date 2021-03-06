# Assignment 4 - DataVis Remix + Multiple Views
===

### Original Vis and Critique

Original Vis, Uncovered on r/dataisbeautiful subreddit
![Original Vis](./OriginalVis.png)

(Post linked [Here](https://www.reddit.com/r/dataisbeautiful/comments/lz8t2i/fertility_vs_life_expectancy_1850_vs_2015_oc_see/))

This original vis has a very specific use case in my opinion. It is meant to show the person looking at the picture that since 1850, there have been dramatic increases in life expectancy and birth rates accross the entire world. My first thought was that I could do a lot more with the data that was linked in the description. Thing is, it was already done on the site where the data was stored! There was a much more professional looking vis that I will be remixing, pictured below


![Well done Vis](./SecondSourceVis.PNG)
(Link [Here](https://www.gapminder.org/fw/world-health-chart/))

To make this a viable project for myself, I could not do every data dimension on every axis, for data manipulation choices alone. The primary improvement I could notice in this geographical aspects of the data were being lost. There is a color that shows what region a country is from, but this doesn't really encode its position in the world. 

#### Use Case For Remix

When a user is utilizing a two axis scatter that changes over time, they may want to explore a tight geographical region. The vis on this website did have a search feature, but then you have to search one at a time and they are organized by name. I found myself intrigued by the life expectancy dip during WWI in many countries, I would love to zoom in on Europe and see how the life expectancies changes geographically year over year, but this isn't possible in the current vis  

Therefore, I am choosing to add a geographical component to give the data additional context and allow for a new method of exploration. 





By two linked views, we mean:

- Have two separate visualizations (likely separate SVGs), that visualize data using different idioms
- Linked views means that interacting in one updates the other, and vice versa. Think about the interaction flow that leads to good user experience and aligns with tasks you've identified.

Examples of linked views include:
- A large central map or scatterplot, with ancillary histograms that can be used to filter-- perhaps time or other dimensions


**Remember: the intent of this assignment is for you to demonstrate your understanding of the theory (e.g. concepts from Munzner's book) and practice (d3, and any tools you use for exploring the data) of visualization.**

Incorporating a brief writeup with your remix is a good idea.
Communicate what the original vis was, what the major issues were, and what new things can be seen with your redesign.
You could have text directly on the page, an "info" button, an about page, etc.

### More on Two Linked Views 
One of the most powerful techniques for mitigating the shortcomings of a given visualization is to link it with other views.

Linking a map to a bar or scatterplot, for instance, may allow you to overcome the shortcomings of a map.

In general, linking visualizations allows you to explore different parts of the data between views, and mitigates the shortcomings of a given view by pairing it with other views.

For this assignment, we want to see at least two linked views, in that interactions in one view updates the other, and vice versa. Many multiple views visualizations use more than two views, so consider such directions as possibilities for tech/design achievements. Be sure to think about what views work best for given tasks, and try to iterate/prototype if possible.

Requirements
---

0. Your code should be forked from the GitHub repo and linked using GitHub pages.
1. Your project should load a dataset you found on the web from the vis you're remixing. You may extract the data by sight if necessary. Put this file in your repo.
2. Your project should use d3 to build a visualization of the dataset. 
3. Your writeup (readme.md in the repo) should contain the following:

- Working link to the visualization hosted on gh-pages or other external sources.
- Concise description and screenshot of your visualization.
- Description of the technical achievements you attempted with this visualization.
- Description of the design achievements you attempted with this visualization.

Extra Links
---

- https://observablehq.com/@philippkoytek/d3-part-3-brushing-and-linking
- https://bl.ocks.org/john-guerra/raw/2c00b2d675a6bf1c84a7b140f4536b0d/
- https://github.com/d3/d3-brush
- https://observablehq.com/collection/@d3/d3-brush
- https://observablehq.com/@d3/focus-context?collection=@d3/d3-brush
