# Assignment 4 - DataVis Remix + Multiple Views

## Original Visualization

The original visualization which mine is based off of is from [this post](https://www.reddit.com/r/dataisbeautiful/comments/m0z52s/oc_today_almost_half_of_the_6900_languages_spoken/) to [r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/):

![Original Visualization](./img/orig.png)

When I first saw this visual I was rather confused, not just because it's a little unclear what it is trying to show, but also because there isn't really a lot of meaning behind it. The distribution of critically endangered languages relative to their number of native speakers isn't really a useful statistic (looking at languages within a category isn't as meaningful as comparing to other categories). As such, I made it my goal not just to remix this data to make it more usable, but also to make it more meaningful in general by putting the data in perspective. Rather than just looking at critically endangered languages, I'd look at all degrees of endangerment (including extinction), as well as where geographically endangerment is occuring.

## First Attempt

My first attempt at remixing this visualization was to build a map with all the languages plotted on it as dots (the dataset came with longitude and latitude values for each entry), colored by their endangerment status. The dots on the map could be highlighted to get information about the language, and the legend on the right could be used to filter the map. The bar graph underneath the map showed overall numbers for how many languages fit into a certain category, and hovering over one of the bars would show only the corresponding dots on the map (clicking on it would lock this selection). 

![First Attempt](./img/try1.png)

The problem I had with this visualization is it didn't feel like there was a meaningful connection between the bar graph and the map. The bar graph felt like it was just sort of "there". The map also was kind of clunky to use and less responsive than I'd like, and for the purpose of the assignment it didn't really fill the requirements as while something done to the bar graph affected the map, nothing happened the other way around. While not a bad visualization (and in my opinion much better than the original), I wasn't really happy with it in the end, leading me to rewrite most of the visualization from scratch to try a different route.

## Second Attempt

In my second attempt I decided to have less of a focus on the individual languages, and more on the overall trends. Something that was missing from my first attempt was information about where the languages were spoken. Many languages, despite having a single location, were listed as being spoken in multiple countries. As such I did some modification to the data so as to be able to get more meaningful insight out of it (this also means that one language may contribute to the counts of multiple countries, but personally I believe that is okay, if not a better way to handle this). Now, instead of using dots to indicate every single language, I colored each country by how many vulnerable, endangered, and/or extinct languages are/were spoken in them. When not hovering over a country, the bar graph displays the overall values for the world. When hovering over a country the bar graph displays the breakdown for the selected country. When hovering over one of the bars in the bar graph, the map will adjust to exclusively show languages in that category (e.g. if you hover over "Extinct" the map will only show counts for extinct languages). Lastly if you click while hovering over a country, you can toggle the tooltip to show the list of vulnerable, endangered, and extinct languages spoken in that country and the number of speakers. The tooltip isn't perfect and will go off the screen and/or cover content when hovering over countries with lots of languages, such as Brazil, Russia, or the USA, but it is interesting to see nonetheless and if I had more time I very much would have liked to improve the tooltips.

![Second Attempt](./img/try2.png)

## Final Implementation

For my final implementation I decided that rather than completely scrapping my original code, that I could improve the meaningfulness of the visualization by linking both versions. As such, both versions (which are on separate pages) are accessible at [https://nyoma-diamond.github.io/04-Remix](https://nyoma-diamond.github.io/04-Remix). While on its own my second attempt is (in my opinion) a good and meaningful visualization, it is improved when it can be used in conjunction with my first attempt, so both are available.
