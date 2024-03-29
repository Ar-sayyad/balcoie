$.each(elementPerformance, function (key1) {
	$.each(plantPerformance, function (key) {
		$('#' + plantPerformance[key].div + elementPerformance[key1].afname).html("<img style='margin-top:20%;margin-left:40%;width:75px;height:75px;' src='../piadmin/images/loading.gif'>");
		var rankingElements = [];
		var batch = {
			"database": {
				"Method": "GET",
				"Resource": baseServiceUrl + "elements?path=\\\\" + afServerName + "\\" + afDatabaseName + "\\PERFORMANCE\\OverallPlant\\" + elementPerformance[key1].afname + "\\" + plantPerformance[key].afname + "&selectedFields=WebId;Links.Elements"
			},
			"elements": {
				"Method": "GET",
				"Resource": "{0}?selectedFields=Items.Name;Items.Path;&searchFullHierarchy=true",
				"ParentIds": [
					"database"
				],
				"Parameters": [
					"$.database.Content.Links.Elements"
				]
			},
			"attributes": {
				"Method": "GET",
				"RequestTemplate": {
					"Resource": baseServiceUrl + "attributes/multiple?selectedFields=Items.Object.Name;Items.Object.Path;Items.Object.WebId&" + plantPerformance[key].path
				},
				"ParentIds": [
					"elements"
				],
				"Parameters": [
					"$.elements.Content.Items[*].Path"
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
		$.when(batchResult).fail(function () {
			warningmsg("Cannot Launch Batch!!!");
		});
		$.when(batchResult).done(function () {
			var batchResultItems = (batchResult.responseJSON.attributes.Content.Items);
			var valuesID = 0;
			$.each(batchResultItems, function (elementID) {
				var attrItems = batchResultItems[elementID].Content.Items;
				var elementName = batchResult.responseJSON.elements.Content.Items[elementID].Name;
				var elementItems = [];
				elementItems[0] = ({
					"mw": elementName
				});
				attrItems.forEach(function (attr, attrID) {
					if (attr !== undefined && attr.Object !== undefined) {
						attrName = attr.Object.Name;
						if (batchResult.responseJSON.values.Content.Items !== undefined && (batchResult.responseJSON.values.Content.Status === undefined || batchResult.responseJSON.values.Content.Status < 400) && batchResult.responseJSON.values.Content.Items[valuesID].Status === 200) {
							var attrV =batchResult.responseJSON.values.Content.Items[valuesID].Content.Value;
						}
					}
                                                                if(attrName =='color'){
                                                                        elementItems[attrID + 1] = ({
                                                                        'color': attrV
                                                                        });
                                                                }else if(attrName =='StartValue'){
                                                                        elementItems[attrID + 1] = ({
                                                                        'StartValue': attrV
                                                                        });
                                                                }else if(attrName =='endValue'){
                                                                        elementItems[attrID + 1] = ({
                                                                        'endValue': attrV
                                                                        });
                                                                }else if(attrName =='Realtime_MW'){
                                                                        elementItems[attrID + 1] = ({
                                                                        'Realtime_MW': attrV
                                                                        });
                                                                }
					valuesID++;
				});
				rankingElements[elementID] = elementItems;
			});
			var marker = rankingElements[2][2].StartValue;
			var StartValue = rankingElements[0][2].StartValue;
			var endval = rankingElements[0][3].endValue;
			var valueInterval = Math.round(rankingElements[0][3].endValue / 4);
			var cols = [];
			$.each(rankingElements, function (key1) {
				cols.push({
					"balloonText": rankingElements[key1][3].endValue,
					"color": rankingElements[key1][1].color,
					"startValue": rankingElements[key1][2].StartValue,
					"endValue": rankingElements[key1][3].endValue,
					"innerRadius": "105%",
					"radius": "170%",
					"gradientRatio": [0.5, 0, -0.5]
				});
			});
			AmCharts.makeChart(plantPerformance[key].div + elementPerformance[key1].afname, {
				"theme": "none",
				"type": "gauge",
				"rotate": true,
				"startDuration": 1,
				"axes": [{
					"topTextFontSize": 10,
					"topTextYOffset": 10,
					"topTextColor": "#0288c5",
					"color": "#ffef61",
					"fontSize": 12,
					"axisColor": "#31d6ea",
					"startValue": StartValue,
					"endValue": endval,
					"radius": "70%",
					"valueInterval": valueInterval,
					"tickColor": "#67b7dc",
					"startAngle": -90,
					"endAngle": 90,
					//"unit": "%",
					"bandOutlineAlpha": 0,
					"axisThickness": 1,
					"gridInside": false,
					"inside": false,
					"bands": cols
				}],
				"allLabels": [],
				"balloon": {
					"drop": true,
					"adjustBorderColor": false,
					"color": "#FFFFFF",
					"fontSize": 13
				},
				"arrows": [{
					"alpha": 1,
					"innerRadius": "10%",
					"nailRadius": 10,
					"color": "#cccc00",
					"radius": "160%",
					"value": marker
				}]
			});

		});

	});
});