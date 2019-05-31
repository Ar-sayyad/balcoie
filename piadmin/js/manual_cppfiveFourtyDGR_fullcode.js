   $("#sendToPi").click(function() {
    var time = $("#time").val();
    if (time === '') {
     warningmsg("Time Selection Required..!");
    } else {
     $.each($(".WebId"), function() {
      var Value = $(this).val();
      var Id = $(this).attr("data-Id");
      var WebId = $(this).attr("data-WebId");
      $(".status" + Id).html("<img style='width:30px;height:30px;' src='" + baseurl + "/piadmin/images/loady.gif'>");
      saveValue(Id, WebId, Value);
     });
    }
   });
   $("#editTime").click(function() {
  $("#time").removeAttr("readonly");
  $("#sendToPi").attr('disabled', true); 
  $('input[type="time"][name="time"]').attr({
   'value': '05:00:00'
  });
 });
 $("#saveTime").click(function() {
  $("#time").attr('readonly', true); 
  $("#sendToPi").removeAttr('disabled');  
 });
   $("#refresh").click(function() {
    $.each($(".WebId"), function() {
     var Id = $(this).attr("data-Id");
     $(this).val(0);
     $(".status" + Id).html('');
    });
   });

   function sort_table(tbodyId) {
    var tbody = document.getElementById(tbodyId);
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
    arr.sort(function(a, b) {
     var first = parseInt(a[col]);
     var second = parseInt(b[col]);
     return (first == second) ? 0 : ((first > second) ? asc : -1 * asc);
    });
    // replace existing rows with new rows created from the sorted array
    for (i = 0; i < rlen; i++) {
     rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
    }
   }

   var now = new Date();
   $(function() {
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
     month = "0" + month;
    if (day < 10)
     day = "0" + day;
    var today = month + '/' + day + '/' + now.getFullYear();
    $("#dateTime").val(today);
    $("#dateTime").datepicker({
     dateFormat: 'mm/dd/yy',
     maxDate: '0'
    });
   });

   $(function() {
    var h = now.getHours(),
     m = now.getMinutes(),
     s = now.getSeconds();
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    $('input[type="time"][name="time"]').attr({
     'value': '05:00:00'
    });
   });
$(document).ready(function(){ 
        var pathUrl='';
   $.each(cpp540DGR, function(key) {
        pathUrl += '&path=\\\\BLDB\\BALCOPOWER\\VEDANTA\\BALCO\\CPP%20-%20540MW\\Unit%201|' + cpp540DGR[key].parameter;
});
    var batch = {
     "database": {
      "Method": "GET",
      "Resource": baseServiceUrl + "attributes/multiple?selectedFields=Items.Object.Name;Items.Object.WebId"  +pathUrl
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
        "$.database.Content.Items[*].Object.WebId"
      ]
     }
    };
    var batchStr = JSON.stringify(batch, null, 2);
    var batchResult = processJsonContent(baseServiceUrl + "batch", 'POST', batchStr);
    $.when(batchResult).fail(function() {
     console.log("Cannot Launch Batch!!!")
    });

    $.when(batchResult).done(function() {
      var batchResultItems = (batchResult.responseJSON.database.Content.Items);
        var valuesID = 0;
        $.each(batchResultItems, function (elementID) {
            var attrItems = batchResultItems[elementID];
            var elementName = batchResultItems[elementID].Object.Name;
            var emName="";            
            var sr = "";
            var unit="";
            $.each(cpp540DGR, function(i){  
                    if(elementName===cpp540DGR[i].parameter){
                          emName  = cpp540DGR[i].title;
                          sr = cpp540DGR[i].sr;
                          unit = cpp540DGR[i].unitname;
                    }
            });
            var WebId = batchResultItems[elementID].Object.WebId;
            var elementItems = [];
            elementItems.push(emName);   
             elementItems.push(unit);   
            $.each(attrItems,function (attrID) {
                var attrValue = "-";
                if (batchResult.responseJSON.values.Content.Items[valuesID].Status === 200) {
                        var attrV = (batchResult.responseJSON.values.Content.Items[valuesID].Content.Value);
                         var uom = (batchResult.responseJSON.values.Content.Items[valuesID].Content.UnitsAbbreviation);
                    if (attrV !== "" && !isNaN(attrV)) {
                        attrValue = (Math.round((attrV) * 100) / 100);
                    }
                }
                elementItems.push(uom);
                elementItems.push(attrValue);
                valuesID++;
                console.log(elementItems);
                $('#' + unit + ' tbody').append("<tr><td>" + sr + "</td><td>" + emName + "</td><td>" + uom + "</td><td><input type='text' id='value" + sr + "' data-id='" + sr + "' data-WebId='" + WebId + "' value='" + attrValue + "' class='form-control input-manual WebId'></td><td><div class='status" + sr + "'></div></td></tr>")
            });  
            sort_table("tbody" + unit);
        });
     
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
    $.when(postAjaxEF).fail(function() {
     //errormsg("Cannot Post The Data.");
     $(".status" + Id).html("<span style='color:red;font-weight:500;font-size: 18px;'><i class='fa fa-times-circle'></i> Failed.</span>");
    });
    $.when(postAjaxEF).done(function() {
     var response = (JSON.stringify(postAjaxEF.responseText));
     if (response == '""') {
      //successmsg("Data Updated successfully.");
      $(".status" + Id).html("<span style='color:green;font-weight:500;font-size: 18px;'><i class='fa fa-check-circle'></i> Success.</span>");
     } else {
      var failure = postAjaxEF.responseJSON.Items;
      $.each(failure, function(key) {
       // warningmsg("Status: " + failure[key].Substatus + " <br> Message: " + failure[key].Message);
       $(".status" + Id).html("<span style='color:red;font-weight:500;font-size: 18px;'><i class='fa fa-times-circle'></i> Failed.</span>");
      })
     }
    });
   }
   /****Each Save Button END***/