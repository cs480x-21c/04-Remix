Assignment 4 - DataVis Remix + Multiple Views By Alexander Bell
===

Remixed Vis: https://datacrayon.com/posts/statistics/data-is-beautiful/league-of-legends-classes/

### Brief Intoduction to the data:

League of Legends is a video game that categorizes it's characters (known as 'Champions') into 6 classes: Assassin, Fighter, Mage, Marksman, Support, and Tank. Some characters have two classfiications, such as being a Mage & a Tank, however others only have one class. There is a an order to the characters with two classifications, and they tend to have more similarities to their first class than their second class. In the original vis, the same data is displayed twice, but with differently colored connections.

### Critique:

This visualization does quite a few things well. First of all, it's very simple and easy to understand. You can hover over bands that connect the classes to find out which characters have both of those classifications. That being said, this vis doesn't take into account the difference between a Character who might have their first class be Mage and their second be Tank versus a character whose first class is Tank and thier second class is Mage. In addition, due to the light color scheme the natrual curvature of the bands, it might be hard to follow certain connection bands if the collide with other similarly sized bands.

![Screeenshot](https://github.com/abell625/04-Remix/blob/main/Screenshot.PNG)

### Redesign:

My inital goal was to fix the first problem I brought up but keep a similar design to the original. I decided to use a circular layout with connections between each of the classes, represented by circles. Using circles would allow me to still encode size to be the amount of characters with a certain class. I also spread the circles out, so it'd be easier to see where each connection leads. As for the second view, I decided I wanted a way to more easily compare the sizes of each class and to be able to see how many of those within the class were only that class, since the first vis I made did not have a way of showing that. A stacked bar chart seemed to be the cleanest way to accomplish this goal. Lastly, I added interaction to both my vis's, so that hovering over a circle, connection, or bar segment highlights it and the associated data on the other view. 

### Technical & Design Acheivements:

I did not attempt to complete any technical or design acheivements for this project.
