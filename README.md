Chronos - Data Visualization for the Layman

Chronos is a data visualization interface that allows users to create and share high quality interactive graphics without being expert software engineers.

Project Stack:
React-Redux, Semantic-UI, D3.js, react-faux-dom, Firebase Realtime Database

Originally developed using Agile PM by Peter Coyle, Chung Lin, Steven Loder and Mario Villacreses as a capstone project for Fullstack Academy of Code.

A deployed version of the project can be found here: https://chronos-d08ff.firebaseapp.com/

The project currently supports the following chart types:

* Timeline
* Map of US States
* Sankey Diagram

Supported User Stories

As a user I can...

...view a full list of the chart templates I have to chose from
...view individual charts and edit their size, color, and data points
...persist saved charts to my account so I can finish them later
...view charts that others have created and 'published'

CURRENTLY SUPPORTED CUSTOMIZATIONS
Timeline
...add events to the timeline by specifying a date
...create a customizable date range for the timeline
...change the prominence of specific events by specifying a size for the event
...group events by specifying the 'height' to change the position on the y-axis
...group events by choosing a color for an event
...add data to each event which will appear on interactions, including...
...image and video urls which appear when a user clicks a specified event
...event name and exact date, which will display 'on hover'
...event specific description that will appear on click
...import and export JSON objects to aid in bulk creation of timeline events.

Map of US States
...change the color of individual states by clicking and selecting from a color wheel
...change the color of individual states by specifying RGBA or Hex values
...specify the dimensions of the map
...import and export JSON objects to aid in bulk coloring of individual states

Sankey Diagram
...add nodes to the diagram from the toolbar
...add links between nodes from the toolbar, specifying a weight
...color nodes and links by clicking and selecting from a color wheel
...change the color of individual nodes and links by specifying RGBA or Hex values
...specify names for individual nodes and links through the toolbar or by clicking the node
...see the names nad values of nodes and links by hovering over them

ACCOUNT MANAGEMENT
...create an account with an email and password
...create an account and login using my Google credentials

SHARING
...publish projects to share with other Chronos users
...send others the url for my project so they can view or edit
