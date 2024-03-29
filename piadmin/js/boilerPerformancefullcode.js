$.each(boilerPerformance, function(key) {
        $('#'+boilerPerformance[key].div).html("<img style='margin-top:20%;margin-left:40%;width:75px;height:75px;' src='../piadmin/images/loading.gif'>");
    var rankingElements = [];
    var batch = {
        "database": {
            "Method": "GET",
            "Resource": baseServiceUrl + "elements?path=\\\\" + afServerName + "\\" + afDatabaseName + "\\" + elementName + "\\" + boilerPerformance[key].afname + "&selectedFields=WebId;Name;Path;Links.Attributes"
        },
        "attributes": {
            "Method": "GET",
            "RequestTemplate": {
                "Resource": baseServiceUrl + "attributes/multiple?selectedFields=Items.Object.Name;Items.Object.Path;Items.Object.WebId&" + boilerPerformance[key].path
            },
            "ParentIds": [
                "database"
            ],
            "Parameters": [
                "$.database.Content.Path"
            ]
        },
        "values": {
            "Method": "GET",
            "RequestTemplate": {
                "Resource": baseServiceUrl + "streams/{0}/value"
            },
            "ParentIds": [
                "attributes"
            ],
            "Parameters": [
                "$.attributes.Content.Items[*].Content.Items[*].Object.WebId"
            ]
        }
    };
    var batchStr = JSON.stringify(batch, null, 2);
    var batchResult = processJsonContent(baseServiceUrl + "batch", 'POST', batchStr);
    $.when(batchResult).fail(function() {
        warningmsg("Cannot Launch Batch!!!");
    });
    $.when(batchResult).done(function() {
        var batchResultItems = (batchResult.responseJSON.attributes.Content.Items);
        var valuesID = 0;       
        $.each(batchResultItems, function(elementID) {
            var attrItems = batchResultItems[elementID].Content.Items;
            attrItems.forEach(function(attr, attrID) {
                var elementName = batchResult.responseJSON.attributes.Content.Items[elementID].Content.Items[attrID].Object.Name;
                var attrValue = "-";
                if (attr !== undefined && attr.Object !== undefined) {
                    attrName = attr.Object.Name;
                    if (batchResult.responseJSON.values.Content.Items !== undefined &&
                        (batchResult.responseJSON.values.Content.Status === undefined || batchResult.responseJSON.values.Content.Status < 400) &&
                        batchResult.responseJSON.values.Content.Items[valuesID].Status === 200) {
                        var attrV =batchResult.responseJSON.values.Content.Items[valuesID].Content.Value;
                        if (attrV !== "" && !isNaN(attrV)) {
                            attrValue = (Math.round((attrV) * 100) / 100);
                        }
                    }
                }
                rankingElements.push({
                    mw: elementName,
                    val: attrValue
                });
                valuesID++;
            });
        });
                AmCharts.makeChart(boilerPerformance[key].div, {
                "type": boilerPerformance[key].type,
                "theme": boilerPerformance[key].theme,
                "titles": [],
                "dataProvider": rankingElements,
                "balloon": {
                    "drop": true, //"cornerRadius": 5,
                    "adjustBorderColor": false,
                    "color": "#ffffff",
                    "fixedPosition": true,
                    "fontSize": 9
                },
                "valueField": "val",
                "titleField": "mw",
                "adjustBorderColor": false, //"startEffect": "elastic",
                "startDuration": 0,
                "labelsEnabled": false,
                "labelRadius": 10,
                pullOutRadius: 60,
                "outlineColor": "",
                "depth3D": 5,
                "balloonText": boilerPerformance[key].balloonText,
                "angle": 0,
                "export": {
                    "enabled": true
                }
            });
     

    });

}); ///json array    

$.each(allBoilerEfficiency, function(key) {
        $('#'+allBoilerEfficiency[key].div).html("<img style='margin-top:20%;margin-left:40%;width:75px;height:75px;' src='../piadmin/images/loading.gif'>");
    var rankingElements = [];
    var batch = {
        "database": {
            "Method": "GET",
            "Resource": baseServiceUrl + "elements?path=\\\\" + afServerName + "\\" + afDatabaseName + "\\"+ elementName + "\\" + allBoilerEfficiency[key].afname + "&selectedFields=WebId;Links.Elements"
        },
        "elements": {
            "Method": "GET",
            "Resource": "{0}?selectedFields=Items.Name;Items.Path;&searchFullHierarchy=true",
            "ParentIds": ["database"],
            "Parameters": ["$.database.Content.Links.Elements"]
        },
        "attributes": {
            "Method": "GET",
            "RequestTemplate": {
                "Resource": baseServiceUrl + "attributes/multiple?selectedFields=Items.Object.Name;Items.Object.Path;Items.Object.WebId&" + allBoilerEfficiency[key].path
            },
            "ParentIds": ["elements"],
            "Parameters": ["$.elements.Content.Items[*].Path"]
        },
        "values": {
            "Method": "GET",
            "RequestTemplate": {
                "Resource": baseServiceUrl + "streams/{0}/value"
            },
            "ParentIds": ["attributes"],
            "Parameters": ["$.attributes.Content.Items[*].Content.Items[*].Object.WebId"]
        }
    };
    var batchStr = JSON.stringify(batch, null, 2);
    var batchResult = processJsonContent(baseServiceUrl + "batch", 'POST', batchStr);
    $.when(batchResult).fail(function() {
        warningmsg("Cannot Launch Batch!!!")
    });
    $.when(batchResult).done(function() {
        var batchResultItems = (batchResult.responseJSON.attributes.Content.Items);
        var valuesID = 0;
        $.each(batchResultItems, function(elementID) {
            var attrItems = batchResultItems[elementID].Content.Items;
            var elementName = batchResult.responseJSON.elements.Content.Items[elementID].Name;
            var elementItems = [];
            elementItems[0] = ({
                "mw": elementName
            });
            attrItems.forEach(function(attr, attrID) {
                var attrValue = "-";
                if (attr !== undefined && attr.Object !== undefined) {
                    attrName = attr.Object.Name;
                    if (batchResult.responseJSON.values.Content.Items !== undefined && (batchResult.responseJSON.values.Content.Status === undefined || batchResult.responseJSON.values.Content.Status < 400) && batchResult.responseJSON.values.Content.Items[valuesID].Status === 200) {
                        var attrV =batchResult.responseJSON.values.Content.Items[valuesID].Content.Value;
                        if (attrV !== "" && !isNaN(attrV)) {
                            attrValue = (Math.round((attrV) * 100) / 100);
                        }
                    }
                }
                if(attrName =='HL'){
                        elementItems[attrID + 1] = ({
                        'HL': attrValue
                        });
                 }else if(attrName =='IO'){
                        elementItems[attrID + 1] = ({
                        'IO': attrValue
                        });
                  }else if(attrName =='value'){
                        elementItems[attrID + 1] = ({
                        'value': attrValue
                        });
                  }
                valuesID++;
            });
            rankingElements[elementID] = elementItems;
        });
        var cols = [];
         if (allBoilerEfficiency[key].type === 'serial') {
                $.each(rankingElements, function(key1) {
                        cols.push({
                            mw: rankingElements[key1][0].mw,
                            io: rankingElements[key1][2].IO,
                            hl: rankingElements[key1][1].HL
                        });            
                });
           AmCharts.makeChart(allBoilerEfficiency[key].div, {
            "type": allBoilerEfficiency[key].type,
            "theme": allBoilerEfficiency[key].theme,
            "categoryField": "mw",
            "startEffect": "elastic",
            "startDuration": 0,
            "categoryAxis": {
                "gridPosition": "start",
                "position": "left",
                "labelRotation": 90,
                "fontSize": 11
            },
            "trendLines": [],
            "graphs": allBoilerEfficiency[key].graph,
            "guides": [],
            "valueAxes": [{
                "id": "ValueAxis-1",
                "position": "bottom",
                "axisAlpha": 1,
                "titleFontSize": 14,
                "fontSize": 11,
                "title": allBoilerEfficiency[key].title
            }],
            "plotAreaFillAlphas": 0.1,
            "depth3D": 3,
            "angle": 10,
            "allLabels": [],
            "balloon": {
                "drop": !0,
                "cornerRadius": 5,
                "adjustBorderColor": !1,
                "color": "#ffffff",
                "fixedPosition": !0,
                "fontSize": 10
            },
            "chartCursor": {
                "pan": !0,
                "valueLineEnabled": !0,
                "valueLineBalloonEnabled": !0,
                "cursorAlpha": 0.05,
                "valueLineAlpha": 0.2,
                "fullWidth": !0,
                "valueBalloonsEnabled": !1,
                "categoryBalloonEnabled": !1
            },
            "legend": {
                "useGraphSettings": !0,
                "position": "bottom",
                "bulletType": "round",
                "equalWidths": !1,
                "valueWidth": 50
            },
            "titles": [],
            "dataProvider": cols,
            "export": {
                "enabled": !0
            }
        });
         }else{
                 $.each(rankingElements, function(key1) {
                        cols.push({
                            mw: rankingElements[key1][0].mw,
                            val: rankingElements[key1][1].value
                        });            
                });                
                 AmCharts.makeChart(allBoilerEfficiency[key].div, {
                "type": allBoilerEfficiency[key].type,
                "theme": allBoilerEfficiency[key].theme,
                "titles": [],
                "dataProvider": cols,
                "balloon": {
                    "drop": true, //"cornerRadius": 5,
                    "adjustBorderColor": false,
                    "color": "#ffffff",
                    "fixedPosition": true,
                    "fontSize": 9
                },
                "valueField": "val",
                "titleField": "mw",
                "adjustBorderColor": false, //"startEffect": "elastic",
                "startDuration": 0,
                "labelsEnabled": false,
                "labelRadius": 10,
                pullOutRadius: 60,
                "outlineColor": "",
                "depth3D": 3,
                "balloonText": allBoilerEfficiency[key].balloonText,
                "angle": 0,
                "export": {
                    "enabled": true
                }
            });
         }
        
    });
});