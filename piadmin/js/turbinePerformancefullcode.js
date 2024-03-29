$.each(turbinePerformance, function (key) {
	$('#' + turbinePerformance[key].div).html("<img style='margin-top:20%;margin-left:40%;width:75px;height:75px;' src='../piadmin/images/loading.gif'>");
	var rankingElements = [];
	var batch = {
		"database": {
			"Method": "GET",
			"Resource": baseServiceUrl + "elements?path=\\\\" + afServerName + "\\" + afDatabaseName + "\\" + elementName + "\\" + turbinePerformance[key].afname + "&selectedFields=WebId;Links.Elements"
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
				"Resource": baseServiceUrl + "attributes/multiple?selectedFields=Items.Object.Name;Items.Object.Path;Items.Object.WebId&" + turbinePerformance[key].path
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
	$.when(batchResult).fail(function () {
		warningmsg("Cannot Launch Batch!!!")
	});
	$.when(batchResult).done(function () {
		var batchResultItems = (batchResult.responseJSON.attributes.Content.Items);
		var valuesID = 0;
		$.each(batchResultItems, function (elementID) {
			var attrItems = batchResultItems[elementID].Content.Items;
			var elementName = batchResult.responseJSON.elements.Content.Items[elementID].Name;
			attrItems.forEach(function (attr, attrID) {
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
				rankingElements.push({
					mw: elementName,
					color: turbinePerformance[key].color,
					val: attrValue
				});
				valuesID++;
			});
		});
		if (turbinePerformance[key].type === 'serial') {
			AmCharts.makeChart(turbinePerformance[key].div, {
				"type": turbinePerformance[key].type,
				"theme": turbinePerformance[key].theme,
				"categoryField": "mw",
				//"rotate": true,
				"startEffect": "elastic",
				"startDuration": 0,
				"categoryAxis": {
					"gridPosition": "start",
					"position": "left",
					"labelRotation": 0,
					"fontSize": 11,
				},
				"trendLines": [],
				"graphs": [{
					"balloonText": turbinePerformance[key].balloonText,
					"fillAlphas": 0.8,
					"id": "AmGraph-1",
					"lineAlpha": 0.2,
					"type": "column",
					"fillColorsField": "color",
					"valueField": "val",
					"fixedColumnWidth": 25
				}],
				"guides": [],
				"valueAxes": [{
					"id": "ValueAxis-1",
					"position": "bottom",
					"axisAlpha": 1,
					"titleFontSize": 14,
					"fontSize": 11,
					"title": turbinePerformance[key].title
				}],
				"plotAreaFillAlphas": 0.1,
				"depth3D": 3,
				"angle": 0,
				"allLabels": [],
				"balloon": {
					"drop": true,
					"cornerRadius": 5,
					"adjustBorderColor": false,
					"color": "#ffffff",
					"fixedPosition": true,
					"fontSize": 10
				},
				"chartCursor": {
					"pan": true,
					"valueLineEnabled": true,
					"valueLineBalloonEnabled": true,
					"cursorAlpha": 0.05,
					"valueLineAlpha": 0.2,
					"fullWidth": true,
					"valueBalloonsEnabled": false,
					"categoryBalloonEnabled": false
				},
				"titles": [],
				"dataProvider": rankingElements,
				"export": {
					"enabled": true
				}

			});
		} else {
			 AmCharts.makeChart(turbinePerformance[key].div, {
				"type": turbinePerformance[key].type,
				"theme": turbinePerformance[key].theme,
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
				"balloonText": turbinePerformance[key].balloonText,
				"angle": 0,
				"export": {
					"enabled": true
				}
			});
		}

	});
});