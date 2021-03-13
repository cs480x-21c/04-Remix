Assignment 4 - DataVis Remix + Multiple Views
===

Description
===

Terms
===
A few terms are necessary to understand the vis



The Original Vis
===

<p>The original vis(s) are from a complex book on Tuning by Owen H. Jorgensen, published in 1991. I do not know how the author made the origional vis. I chose this vis because I wanted to update it for modern day vis and to work well for people who do not have a deep understanding of music theory.</p>

<p>The origional vis is meant to help people discover the key color contrasts for different well temperament systems, based on the spacing of major third intervals. The user would look up a specific key or browse all the keys to learn the key color contrasts of the well temperament. They would take the major third and derive the major key associated with it. They may compare the different keys based on the spacing of thirds. The circle is meant to symbolize that the spacing of thirds generally follows the circle of 5ths. Then, outside the present work, the user would derive or tune a piano to the well temperament system, following the book's tuning instructions, and play a song in different keys, so the user can hear the different key characteristics. Users may want to compare this variation of well temperament to another well temperament. To do that, they would need to look up where that chart is in the book.</p>

![Original_Vis_1](img/originalVis1.jpg)
[1]

<p>There are a few problems with the vis that make 
the user tasks difficult. Users who do not understand music theory will not know each major key, so deriving the key from the major third may require external knowedge. Comparing two keys can be difficult, especially when they are on oposite sides of the circle. The author always adds specific marks to clarify that certain keys are the same spacing, this form of grouping makes it clear that two or more keys do not contrast eachother. The book provides decent tuning instructions, but tuning a piano takes a long time and can be difficult, so users may not have a good method to hear the key color constrasts for themselves. Comparing different forms of well temperament requires manual look up.</p>

The Remix
===

<p>To help the user derive each key, I added a second view that shows a simple keyboard. The keyboard will show users where every note or letter is and color code notes that are within each key. This change will help users visualize the key. <p>

[TODO: Insert picture]

<p>To help users compare different keys, I ...
[TODO: write more]

[TODO: Insert picture]

<p>To help the user hear the key color contrasts, the keyboard is playable by clicking on it. The keyboard has visual feedback when mousing over keys or clicking on them. The user can hold the control key to sustain any notes they press so they can compare intervals when hearing them simultaneously. The keyboard is tuned to the same well temperament as the visualization.</p>

[TODO: Insert picture]

<p>To help the user compare different well temperaments, I added a simple drop down menu to select different well temperaments from the book. I did not include all the well temperaments from the book due to time constraints. More well temperaments may make it harder to compare them.</p>

[TODO: Insert picture]


[1] Owen H. Jorgensen. 1991. *Tuning: Containing The Perfection of Eigteenth-Century Temperament, The Lost Art of Nineteenth-Century Temperament, and The Science Of Equal Temperament* Michigan State University Press, East Lansing. 





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
