# Belly Button Biodiversity

![Bacteria by filterforge.com](Images/bacteria_by_filterforgedotcom.jpg)

An interactive dashboard that visualizes the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/).

##Plotly.js

Plotly.js is used to build interactive charts for a web dashboard.

* PIE chart that uses data from the samples route (`/samples/<sample>`) to display the top 10 samples.

  * Uses `sample_values` as the values for the PIE chart

  * Uses `otu_ids` as the labels for the pie chart

  * Uses `otu_labels` as the hovertext for the chart

  ![PIE Chart](Images/pie_chart.png)

* A Bubble Chart that uses data from the samples route (`/samples/<sample>`) to display each sample.

  * Uses `otu_ids` for the x values

  * Uses `sample_values` for the y values

  * Uses `sample_values` for the marker size

  * Uses `otu_ids` for the marker colors

  * Uses `otu_labels` for the text values

  ![Bubble Chart](Images/bubble_chart.png)

* Displays the sample metadata from the route `/metadata/<sample>`

  * Displays each key/value pair from the metadata JSON object.

* Updates all of the plots any time that a new sample is selected from the dropdown list.

##  Heroku

The Flask app is deployed in Heroku: https://tybbb.herokuapp.com/

* An sqlite file is used for the database.


## Additional Notes

* `pip install -r requirements.txt` before you start your server.
