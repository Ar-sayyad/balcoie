function sort_table() {
	var tbody = document.getElementById("sortTable");
	var col = 0;
	var asc = 1;
	var rows = tbody.rows,
		rlen = rows.length,
		arr = new Array(),
		i, j, cells, clen;
	// fill the array with values from the table
	for (i = 0; i < rlen; i++) {
		cells = rows[i].cells;
		clen = cells.length;
		arr[i] = new Array();
		for (j = 0; j < clen; j++) {
			arr[i][j] = cells[j].innerHTML;
		}
	}
	// sort the array by the specified column number (col) and order (asc)
	arr.sort(function (a, b) {
		var first = parseInt(a[col]);
		var second = parseInt(b[col]);
		return (first == second) ? 0 : ((first > second) ? asc : -1 * asc);
	});
	// replace existing rows with new rows created from the sorted array
	for (i = 0; i < rlen; i++) {
		rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
	}
}

//var sr=1;    
// console.log(cpp540coalAnalysis.length);
$.each(cpp540coalAnalysis, function (key) {
	var batch = {
		"database": {
			"Method": "GET",
			"Resource": baseServiceUrl + "attributes?path=" + cpp540coalAnalysis[key].tag_path + "|" + cpp540coalAnalysis[key].parameter
		},
		"values": {
			"Method": "GET",
			"RequestTemplate": {
				"Resource": baseServiceUrl + "streams/{0}/value"
			},
			"ParentIds": [
				"database"
			],
			"Parameters": [
				"$.database.Content.WebId"
			]
		}
	};
	var batchStr = JSON.stringify(batch, null, 2);
	var batchResult = processJsonContent(baseServiceUrl + "batch", 'POST', batchStr);
	$.when(batchResult).fail(function () {
		warningmsg("Cannot Launch Batch!!!")
	});

	$.when(batchResult).done(function () {
		var valuesID = 0;
		var WebId = batchResult.responseJSON.database.Content.WebId;
		var uom = batchResult.responseJSON.database.Content.DefaultUnitsNameAbbreviation;
		var attrValue = "-";
		if (batchResult.responseJSON.values.Content.Items !== undefined && (batchResult.responseJSON.values.Content.Status === undefined || batchResult.responseJSON.values.Content.Status < 400) && batchResult.responseJSON.values.Content.Items[valuesID].Status === 200) {
			var attrV = (batchResult.responseJSON.values.Content.Items[0].Content.Value);
			if (attrV !== "" && !isNaN(attrV)) {
				attrValue = (Math.round((attrV) * 100) / 100);
			}
		}
                     
		$('#tableData tbody').append("<tr><td>" + cpp540coalAnalysis[key].title + "</td><td>" + uom + "</td><td><input type='text' id='value" + cpp540coalAnalysis[key].sr + "' data-id='" + cpp540coalAnalysis[key].sr + "' data-WebId='" + WebId + "' value='" + attrValue + "' class='form-control input-manual WebId'></td><td><div class='status" + cpp540coalAnalysis[key].sr + "'></div></td><td>" + cpp540coalAnalysis[key].sr + "</td></tr>")
		//  sr++;
		//sort_table();
	});

});


/****Each Save Button START***/
function saveValue(Id, WebId, Value) {
	var date = $("#dateTime").val();
	var time = $("#time").val();
	var dateTime = (date + ' ' + time);
	var url = baseServiceUrl + 'streams/' + WebId + '/value?WebId=' + WebId + '&updateOption=Replace';
	var data = {
		"Timestamp": dateTime,
		"Good": true,
		"Questionable": false,
		"Value": Value
	};
	var postData = JSON.stringify(data);
	var postAjaxEF = processJsonContent(url, 'POST', postData, null, null);
	$.when(postAjaxEF).fail(function () {
		//errormsg("Cannot Post The Data.");
		$(".status" + Id).html("<span style='color:red;font-weight:500;font-size: 18px;'><i class='fa fa-times-circle'></i> Failed.</span>");
	});
	$.when(postAjaxEF).done(function () {
		var response = (JSON.stringify(postAjaxEF.responseText));
		if (response == '""') {
			//successmsg("Data Updated successfully.");
			$(".status" + Id).html("<span style='color:green;font-weight:500;font-size: 18px;'><i class='fa fa-check-circle'></i> Success.</span>");
		} else {
			var failure = postAjaxEF.responseJSON.Items;
			$.each(failure, function (key) {
				// warningmsg("Status: " + failure[key].Substatus + " <br> Message: " + failure[key].Message);
				$(".status" + Id).html("<span style='color:red;font-weight:500;font-size: 18px;'><i class='fa fa-times-circle'></i> Failed.</span>");
			})
		}
	});
}
/****Each Save Button END***/