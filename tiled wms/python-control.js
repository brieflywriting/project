import "heatmap.js";

var csv = require('./jquery.csv.js');
var citizens = csv.toObjects("../assets/new/test.csv");
print(citizens);

var heatmap = h337.create({
    container: domElement
  });
  for(var i =0;i<citizens[0].length() ;i++){
    
  }
  
  heatmap.setData({
    max: 5,
    data: [{ x: 10, y: 15, value: 5}, ...]
  });