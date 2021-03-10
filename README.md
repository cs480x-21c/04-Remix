Assignment 4 - DataVis Remix + Multiple Views
===

Original vis - https://www.reddit.com/r/dataisbeautiful/comments/lqhe0h/oc_its_beautiful_to_see_covid19_numbers_heading/

### Task

- Critique the original vis
- Redesign some aspect of it, using better task abstractions, encodings, etc.
- Implement your redesign

- Have two separate visualizations (likely separate SVGs), that visualize data using different idioms
- Linked views means that interacting in one updates the other, and vice versa. Think about the interaction flow that leads to good user experience and aligns with tasks you've identified.

Examples of linked views include:
- A large central map or scatterplot, with ancillary histograms that can be used to filter-- perhaps time or other dimensions

- a brief writeup with your remix.
Communicate what the original vis was, what the major issues were, and what new things can be seen with your redesign.
You could have text directly on the page, an "info" button, an about page, etc.

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
