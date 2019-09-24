var baseServiceUrl="https://bop-d-01.aquila-syst.com/piwebapi/";
var user="JKashid.Admin";
var pass="ZKWEgLUih1Wi";
var afServerName="AF-P-01";
var afDatabaseName="BOP";
var baseElement="Thalassa";
var baseurl="http://localhost:8080/balcoie/";
var enableBasicAuth=!0;
var processJsonContent=function(url, type, data) {
    return $.ajax( {
        url:encodeURI(url), headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
        , type:type, data:data, contentType:"application/json; charset=UTF-8", crossDomain:!0, xhrFields: {
            withCredentials: !0
        }
        , beforeSend:function(xhr) {
            if(enableBasicAuth) {
                xhr.setRequestHeader("Authorization", makeBasicAuth(user, pass))
            }
        }
    }
    )
}

;
var makeBasicAuth=function(user, password) {
    var tok=user+':'+password;
    var hash=window.btoa(tok);
    return"Basic "+hash
}

var rankingElements=[];
var rankingParameters=[ {
    ElementName: "Active BOP"
}

,
{
    ElementName: "BOP 1"
}

,
{
    ElementName: "BOP 2"
}

];
var pathUrl='';
$.each(rankingParameters, function(key1) {
    pathUrl+='&path=\\\\'+afServerName+'\\'+afDatabaseName+'\\'+baseElement+'\\'+rankingParameters[key1].ElementName+'\\BOP Stack'
}

);
var batch1= {
    "database": {
        "Method": "GET", "Resource": baseServiceUrl+"elements/multiple?selectedFields=Items.Object.Name;Items.Object.Path;Items.Object.WebId;Items.Object.Links.Elements"+pathUrl
    }
    ,
    "elements": {
        "Method":"GET",
        "RequestTemplate": {
            "Resource":"{0}?selectedFields=Items.Name;Items.Path;"
        }
        ,
        "ParentIds":["database"],
        "Parameters":["$.database.Content.Items[*].Object.Links.Elements"]
    }
    ,
    "attributes": {
        "Method":"GET",
        "RequestTemplate": {
            "Resource": baseServiceUrl+"attributes/multiple?selectedFields=Items.Object.Name;Items.Object.Path;Items.Object.WebId&path={0}|State"
        }
        ,
        "ParentIds":["elements"],
        "Parameters":["$.elements.Content.Items[*].Content.Items[*].Path"]
    }
    ,
    "values": {
        "Method":"GET",
        "RequestTemplate": {
            "Resource":baseServiceUrl+"streams/{0}/value"
        }
        ,
        "ParentIds":["attributes"],
        "Parameters":["$.attributes.Content.Items[*].Content.Items[*].Object.WebId"]
    }
}

;
var batchStr=JSON.stringify(batch1, null, 2);
var batchResult=processJsonContent(baseServiceUrl+"batch", 'POST', batchStr);
$.when(batchResult).fail(function() {
    console.log("Cannot Launch Batch!!!")
}

);
var rankingElements=[];
$.when(batchResult).done(function() {
    var batchResultItems=(batchResult.responseJSON.elements.Content.Items);
    $.each(batchResultItems, function(elementID) {
        var attrItems=batchResult.responseJSON.elements.Content.Items[elementID].Content.Items;
        //console.log(rankingParameters[elementID].ElementName);
        var elementItems=[];
        $.each(attrItems, function(key) {
            var elemName=attrItems[key].Name;
            var attrV=batchResult.responseJSON.values.Content.Items[key].Content.Value.Name;
            elementItems.push( {
                'Element': attrItems[key].Name, 'Path': attrItems[key].Path, 'State': attrV
            });
        });
        rankingElements[elementID]=(elementItems);
    });
    console.log(rankingElements)
}

)