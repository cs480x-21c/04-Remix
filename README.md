Assignment 4 - DataVis Remix + Multiple Views
===


- Changed geojson name Ajaria to Adjara

Resources used:
Geojson for Georgia: https://github.com/bumbeishvili/geojson-georgian-regions
hover tool https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2

The primary aim of this assignment is to showcase your **individual** skills at critiquing, redesigning, and extending visualizations on the web.

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
