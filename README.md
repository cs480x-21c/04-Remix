# CS4802 Assignment IV (Remix)

## Overview

A live and up-to-date version of my visualization can be found at [https://4802a4.dcole.dev](https://4802a4.dcole.dev).

For this assignment, I chose the WPI Covid Dashboard to remix. I identified a number of flaws:
* Rolling averages only given for the current day
* No easy way to visually compare case counts between days
* Difficult to contextualize case counts relative to test results on that day

To that end, I implemented the following improvements in my version:
* Case counts and test results for each day are shown on the same bar chart
* The bar chart features a 7-day rolling average line of both cases & results
* A bubble chart on the right shows each day's case count
* The charts are linked so that you can select a day and it will be highlighted by clicking on the bar chart or bubble chart

## Achievements

### Design
* Colored everything according to WPI's color guidelines to match up with WPI's dashboard
* Utilized tailwind CSS to style the page nicely

### Technical
* Used React (Preact technically, which is a leaner alternative) to modularize code and update state easily
