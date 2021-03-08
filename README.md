Assignment 4 - DataVis Remix + Multiple Views
===

The primary aim of this assignment is to showcase your **individual** skills at critiquing, redesigning, and extending visualizations on the web.

## Vis to Remix

I wanted to remix a UMAP visualization that I created in ggplot.

![orig](photos/orig_vis.png)

One thing that I don't like about this vis is the color. I find ggplot's default colors difficult to differentiate after 10 clusters. Some of the clusters are difficult to tell the difference between. This plot had 22 clusters that required different colors. I used colorgorical to generate a 22-element color palette with the highest perceptual difference possible.

![plot1](photos/nohover.png)

I also wanted to add an element where you can clearly see information about the expression data driving the embedding. UMAPs are very interesting and create clusters based on expression profile, but you cannot glean any specific infomration about that profile from the plot itself.

![plot2](photos/exhover.png)

I added to the UMAP plot a bar chart that takes the average of expression profiles for marker genes associated with a particular cell type. On hover over a point, the average expression profile for that cell's cluster is displayed on the bar chart. The above image shows a hover over a cell that appears to be an excitatory neuron cluster.

Technical achievments:

Design achievments:

### Your Task

Your task is to choose a visualization, remix it, and add at least two linked-views.

By remix, we mean:

- Critique the original vis
- Redesign some aspect of it, using better task abstractions, encodings, etc.
- Implement your redesign

Examples of remixes include:
- taking a static choropleth map with a bad color scale, implementing a new version in d3, adding interactivity, and improving the color scale to show the original data in a more effective way
- finding a poorly designed or hard-to-use interactive visualization, and making a new version with better interaction design, such as features that enable the user to explore the data in new ways, by adding new views

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
