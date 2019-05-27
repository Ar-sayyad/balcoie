$(document).ready(function () {
	$("#printBtn").click(function () {
		var mode = 'iframe'; // popup
		var close = mode == "popup";
		var options = {
			mode: mode,
			popClose: close
		};
		$("div.printPage").printArea(options);
	});
	getDashboardData();
});
setInterval(function () {
	getDashboardData();
}, 30000);

var cppDashboard2Analysis = [{
		"title": "OverallStation",
		"path": "path={0}|CPP540&path={0}|IPP600&path={0}|CPP600",
		"table": "OverallStationData",
		"digits": [{
				"name": "1. Availability",
				"decimal": 1
			},
			{
				"name": "2. PLF",
				"decimal": 1
			},
			{
				"name": "3. Gross Generation",
				"decimal": 2
			},
			{
				"name": "4. Aux Consumption",
				"decimal": 1
			},
			{
				"name": "5. Gross Heatrate",
				"decimal": 0
			},
			{
				"name": "6. SCC",
				"decimal": 1
			},
			{
				"name": "7. SOC",
				"decimal": 2
			}
		]
	},
	{
		"title": "CPP540",
		"path": "path={0}|Unit-1&path={0}|Unit-2&path={0}|Unit-3&path={0}|Unit-4",
		"table": "cpp540Data",
		"digits": [{
				"name": "1. Availability",
				"decimal": 1
			},
			{
				"name": "2. PLF",
				"decimal": 1
			},
			{
				"name": "3. Gross Generation",
				"decimal": 2
			},
			{
				"name": "4. Aux Consumption",
				"decimal": 1
			},
			{
				"name": "5. Gross Heatrate",
				"decimal": 0
			},
			{
				"name": "6. SCC",
				"decimal": 1
			},
			{
				"name": "7. SOC",
				"decimal": 2
			}
		]
	},
	{
		"title": "PP1200",
		"path": "path={0}|Unit-1&path={0}|Unit-2&path={0}|Unit-3&path={0}|Unit-4",
		"table": "PowerPlant1200Data",
		"digits": [{
				"name": "1. Availability",
				"decimal": 1
			},
			{
				"name": "2. PLF",
				"decimal": 1
			},
			{
				"name": "3. Gross Generation",
				"decimal": 2
			},
			{
				"name": "4. Aux Consumption",
				"decimal": 1
			},
			{
				"name": "5. Gross Heatrate",
				"decimal": 0
			},
			{
				"name": "6. SCC",
				"decimal": 1
			},
			{
				"name": "7. SOC",
				"decimal": 2
			}
		]
	},
	{
		"title": "CPP540 CEMS",
		"path": "path={0}|PM&path={0}|NOx&path={0}|SOx",
		"table": "cpp2CEMSData",
		"digits": [{
				"name": "Unit-1",
				"decimal": 1
			},
			{
				"name": "Unit-2",
				"decimal": 1
			},
			{
				"name": "Unit-3",
				"decimal": 1
			},
			{
				"name": "Unit-4",
				"decimal": 1
			}
		]
	},
	{
		"title": "PP1200 CEMS",
		"path": "path={0}|PM&path={0}|NOx&path={0}|SOx",
		"table": "PP1200CEMSData",
		"digits": [{
				"name": "Unit-1",
				"decimal": 0
			},
			{
				"name": "Unit-2",
				"decimal": 0
			},
			{
				"name": "Unit-3",
				"decimal": 0
			},
			{
				"name": "Unit-4",
				"decimal": 0
			}
		]
	},
	{
		"title": "Fuel Stock",
		"path": "path={0}|CPP540&path={0}|IPP600&path={0}|CPP600",
		"table": "FuelStockConsumptionData",
		"digits": [{
				"name": "1.Coal Cons.",
				"decimal": 0
			},
			{
				"name": "2.LDO Cons.",
				"decimal": 0
			},
			{
				"name": "3.HFO Cons.",
				"decimal": 0
			},
			{
				"name": "4.Coal Cls Stock",
				"decimal": 0
			},
			{
				"name": "5.LDO Cls Stock",
				"decimal": 0
			},
			{
				"name": "6.HFO Cls Stock",
				"decimal": 0
			}
		]
	},
	{
		"title": "Other Parameters",
		"path": "path={0}|CPP540&path={0}|IPP600&path={0}|CPP600",
		"table": "WaterConsumptionData",
		"digits": [{
				"name": "1.Export",
				"decimal": 2
			},
			{
				"name": "2.Import",
				"decimal": 2
			},
			{
				"name": "3.Raw Wtr Cons",
				"decimal": 0
			},
			{
				"name": "4.DM Wtr Cons",
				"decimal": 0
			}
		]
	}
];

function getDashboardData() {
	$.each(cppDashboard2Analysis, function (key) {
		var rankingElements1 = [];
		var batch1 = {
			"database": {
				"Method": "GET",
				"Resource": baseServiceUrl + "elements?path=\\\\" + afServerName + "\\" + afDatabaseName + "\\KPIs\\Plant Summary\\" + cppDashboard2Analysis[key].title + "&selectedFields=WebId;Name;Path;Links.Elements"
			},
			"elements": {
				"Method": "GET",
				"Resource": "{0}?selectedFields=Items.Name;Items.WebId;Items.Path;&searchFullHierarchy=false",
				"ParentIds": ["database"],
				"Parameters": ["$.database.Content.Links.Elements"]
			},
			"attributes": {
				"Method": "GET",
				"RequestTemplate": {
					"Resource": baseServiceUrl + "attributes/multiple?selectedFields=Items.Object.Name;Items.Object.Path;Items.Object.WebId&" + cppDashboard2Analysis[key].path
				},
				"ParentIds": ["elements"],
				"Parameters": ["$.elements.Content.Items[*].Path"]
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
		var batchStr1 = JSON.stringify(batch1, null, 2);
		var batchResult1 = processJsonContent(baseServiceUrl + "batch", 'POST', batchStr1);
		$.when(batchResult1).fail(function () {
			console.log("Cannot Launch Batch!!!");
		});
		$.when(batchResult1).done(function () {
			var batchResultItems = (batchResult1.responseJSON.attributes.Content.Items);
			var valuesID = 0;

			$.each(batchResultItems, function (elementID) {
				var attrItems = batchResultItems[elementID].Content.Items;
				var elementName1 = batchResult1.responseJSON.elements.Content.Items[elementID].Name;
				var UO = (batchResult1.responseJSON.values.Content.Items[valuesID].Content.UnitsAbbreviation);
				var elementItems1 = [{
					"mw": elementName1
				}, {
					"UOM": UO
				}];
				var decimal = '';
				$.each(cppDashboard2Analysis[key].digits, function (key1) {
					if (cppDashboard2Analysis[key].digits[key1].name == elementName1) {
						decimal = cppDashboard2Analysis[key].digits[key1].decimal;
					}
				});
				attrItems.forEach(function (attr, attrID) {
					var attrValue = "-";
					if (attr !== undefined && attr.Object !== undefined) {
						attrName1 = attr.Object.Name;

						if (batchResult1.responseJSON.values.Content.Items !== undefined && (batchResult1.responseJSON.values.Content.Status === undefined || batchResult1.responseJSON.values.Content.Status < 400) && batchResult1.responseJSON.values.Content.Items[valuesID].Status === 200) {
							var attrV = batchResult1.responseJSON.values.Content.Items[valuesID].Content.Value;
							if (attrV !== "" && !isNaN(attrV)) {
								attrValue = parseFloat((attrV).toFixed(decimal));
								//attrValue = parseFloat((Math.round((attrV) * 100) / 100));
							} else {
								attrValue = batchResult1.responseJSON.values.Content.Items[valuesID].Content.Value.Name;
							}
						}

					}


					if (attrName1 == 'Unit-1') {
						elementItems1.push({
							'one': attrValue
						}); //FIRST
					} else if (attrName1 == 'Unit-2') {
						elementItems1.push({
							'two': attrValue
						});
					} else if (attrName1 == 'Unit-3') {
						elementItems1.push({
							'three': attrValue
						});
					} else if (attrName1 == 'Unit-4') {
						elementItems1.push({
							'four': attrValue
						});

					} else if (attrName1 == 'PM') {
						elementItems1.push({
							'PM': attrValue
						}); //SECOND
					} else if (attrName1 == 'NOx') {
						elementItems1.push({
							'NOx': attrValue
						});
					} else if (attrName1 == 'SOx') {
						elementItems1.push({
							'SOx': attrValue
						});

					} else if (attrName1 == 'CPP540') {
						elementItems1.push({
							'CPP540': attrValue
						}); //THIRD
					} else if (attrName1 == 'CPP600') {
						elementItems1.push({
							'CPP600': attrValue
						});
					} else if (attrName1 == 'IPP600') {
						elementItems1.push({
							'IPP600': attrValue
						});
					}
					valuesID++;
				});
				rankingElements1[elementID] = elementItems1;
			});
			var t = $('#' + cppDashboard2Analysis[key].table).DataTable({
				info: false,
				retrieve: true,
				searching: false,
				paging: false,
				columnDefs: [{
					targets: "_all",
					orderable: false
				}]
			});
			t.clear().draw();
			$.each(rankingElements1, function (key) {
				var rows2 = [];
				if (rankingElements1[key][2].one || rankingElements1[key][2].one == 0) {
					rows2.push(rankingElements1[key][0].mw, rankingElements1[key][1].UOM, rankingElements1[key][2].one, rankingElements1[key][3].two, rankingElements1[key][4].three, rankingElements1[key][5].four);
				} else if (rankingElements1[key][2].PM || rankingElements1[key][2].PM == 0) {
					rows2.push(rankingElements1[key][0].mw, rankingElements1[key][1].UOM, rankingElements1[key][2].PM, rankingElements1[key][3].NOx, rankingElements1[key][4].SOx);
				} else if (rankingElements1[key][2].CPP540 || rankingElements1[key][2].CPP540 == 0) {
					rows2.push(rankingElements1[key][0].mw, rankingElements1[key][1].UOM, rankingElements1[key][2].CPP540, rankingElements1[key][3].IPP600, rankingElements1[key][4].CPP600);
				}
				t.row.add(rows2).draw(!1);
			});
		});
	});
}