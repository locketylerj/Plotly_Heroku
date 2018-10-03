function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  
  d3.json(`/metadata/${sample}`).then(data => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var box = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    box.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(function([key, value]) {
      box.append("tr").append("tag").text(`${key} : ${value}, `).append("br");
    })

  });
}; 

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {
    var otu_ids = data.otu_ids;
    var sample_values = data.sample_values;
    var otu_labels = data.otu_labels;
     // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var pie1 = [{
      values: sample_values.slice(0,10),
      labels: otu_ids.slice(0,10),
      hovertext: otu_labels,
      type: "pie"
    
    }];

    var layout = {
      height: 400,
      width: 500
    };
    
    Plotly.plot("pie", pie1,layout);

    var tybubble = [{

      x: otu_ids,
      y: sample_values,
      mode: "markers",
      text: otu_labels,
      marker: {
        color: otu_ids,
        size: sample_values,
      }
    }];
  
    b_layout = {
      title: `Belly Button Bacteria Makeup for our Sample Population`,
      
      xaxis: {
        title: "Operational Taxonomic Unit ID (organisms studied)" 
      },
      yaxis: {
        title: "Sample Values"
      }

    };

    Plotly.plot("bubble", tybubble,b_layout);
  }   
  );
    // @TODO: Build a Bubble Chart using the sample data

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
