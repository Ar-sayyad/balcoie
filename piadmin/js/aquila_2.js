var baseServiceUrl="https://bop-d-01.aquila-syst.com/piwebapi/";
var user="JKashid.Admin";
var pass="ZKWEgLUih1Wi";
var afServerName="AF-P-01";
var afDatabaseName="BOP";
var baseElement = "Thalassa";
var baseurl="http://localhost:8080/balcoie/";
var enableBasicAuth=!0;
var processJsonContent=function (url, type, data) {
    return $.ajax( {
        url: encodeURI(url), headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
        , type: type, data: data, contentType: "application/json; charset=UTF-8", crossDomain: !0, xhrFields: {
            withCredentials: !0
        }
        , beforeSend: function (xhr) {
            if (enableBasicAuth) {
                xhr.setRequestHeader("Authorization", makeBasicAuth(user, pass))
            }
        }
    }
    )
};

var makeBasicAuth=function (user, password) {
    var tok=user + ':' + password;
    var hash=window.btoa(tok);
    return "Basic " + hash
}

var rankingParameters = [
        {ElementName: "Active BOP"},
        {ElementName: "BOP 1"},
        {ElementName: "BOP 2"}
];

 var pathUrl = '';
    $.each(rankingParameters, function (key1) {
        pathUrl += '&path=\\\\' + afServerName + '\\' + afDatabaseName + '\\'+baseElement+'\\' + rankingParameters[key1].ElementName+'\\BOP Stack';
    });

var batch1 = {
                     "database": {
			"Method": "GET",
			"Resource": baseServiceUrl + "elements/multiple?selectedFields=Items.Object.Name;Items.Object.Path;Items.Object.WebId;Items.Object.Links.Elements"+pathUrl
		},
		"elements": {
			"Method": "GET",
                                        "RequestTemplate": {
                                                "Resource": "{0}?selectedFields=Items.Name;Items.Path;"
                                           },
			"ParentIds": ["database"],
			"Parameters": ["$.database.Content.Items[*].Object.Links.Elements"]
		},
		"attributes": {
			"Method": "GET",
			"RequestTemplate": {
				"Resource": baseServiceUrl + "attributes/multiple?selectedFields=Items.Object.Name;Items.Object.Path;Items.Object.WebId&path={0}|State&path={0}|Tag Abbreviation"
			},
			"ParentIds": ["elements"],
			"Parameters": ["$.elements.Content.Items[*].Content.Items[*].Path"]
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

var batchStr=JSON.stringify(batch1, null, 2);
var batchResult=processJsonContent(baseServiceUrl + "batch", 'POST', batchStr);
       // console.log(batchStr);
$.when(batchResult).fail(function () {
    console.log("Cannot Launch Batch!!!");
});
var rankingElements = [];
rankingElements.push(rankingParameters);
$.when(batchResult).done(function () {
		var batchResultItems = (batchResult.responseJSON.attributes.Content.Items);                    
                    //console.log(batchResultItems);
		var valuesID = 0;
		$.each(batchResultItems, function (elementID) {
                            var attrItems = batchResult.responseJSON.elements.Content.Items[elementID].Content.Items;       
                            console.log(attrItems);
			//var elementItems = [];
//			attrItems.forEach(function (attr, attrID) {    
//                                       var elemName = attrItems[valuesID].Name;
//                                       //console.log(elemName);
////				var state = "-";
////                                                      var abbrv = "-";
////				if (attr !== undefined) {
////					if (batchResult.responseJSON.values.Content.Items !== undefined && batchResult.responseJSON.values.Content.Items[valuesID].Status === 200) {
////						var attrV =batchResult.responseJSON.values.Content.Items[valuesID].Content.Value.Name;    
////                                                            
////						if (attrV !== undefined) {
////							state = attrV;
////                                                                        console.log("1:State -  "+state);
////                                                                                //console.log("2: "+attrV.Name);
////						} else {
////                                                                                         abbrv = batchResult.responseJSON.values.Content.Items[valuesID].Content.Value;
////                                                                                         
////                                                                                console.log("2: Tag Abbreviation - "+abbrv);
////						}                                                          
////					}
////				}
//                                                        elementItems[valuesID] = ({ 'elements': elemName});
//                                                          				
//				valuesID++;
//                                      //  rankingElements[elementID] = elementItems;
//                                        
//			});
                             
                             // console.log(elementItems);
			//
                        valuesID++;
                              
		});
                    // console.log(rankingElements);
		//
});