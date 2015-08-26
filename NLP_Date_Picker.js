//credit to erikwett at branch.qlik.com. I used his extension as the basis for this http://branch.qlik.com/projects/showthread.php?396-qsVariable&highlight=qsvariable
//I used his code because I liked the functionality of easily creating a variable

define(["http://code.jquery.com/jquery-2.1.4.min.js", "qlik", "http://sugarjs.com/release/current/sugar.min.js"], function(jquery, qlik, sugarjs) {
	
	var val = "";
	var dateTxt = "";
	
	return {
		initialProperties : {
			version : 0.1,
			variableValue : {},
			variableName : "",
			render : "f",
			alternatives : []
		},
		definition : {
			type : "items",
			component : "accordion",
			items : {
				settings : {
					uses : "settings",
					items : {
						variable : {
							type : "items",
							label : "Variable",
							items : {
								varName : {
									ref : "variableName",
									label : "Name",
									type : "string",
									change : function(data) {
										//create variable - ignore errors
										qlik.currApp().variable.create(data.variableName);
										data.variableValue.qStringExpression = '=' + data.variableName;
									}
								}
							}
						}
					}
				}
			}
		},
		paint : function($element, layout) {
			var html = "", ext = this;
			
			html += '<input id="textbox_' + layout.variableName + '" style="width:95%;" type="text" value="' + val + '" /><br><div id="foundDate">' + layout.variableValue + '</div>';
			//html += '<input id="textbox_' + layout.variableName + '" style="width:80%;" type="text"/>';
			$element.html(html);
			
			$('#textbox_' + layout.variableName).on('input', function() {
				val = $(this).val() + '';
				dateTxt = Date.create(val).ddmmyyyy();
				$("#foundDate").text(dateTxt + ' (Press enter to apply filter)');
			});
			
			$('#textbox_' + layout.variableName).on("keypress", function(e) {
					if (e.keyCode == 13) {
						//alert("Enter pressed");
						qlik.currApp(ext).variable.setContent(layout.variableName, dateTxt);
						$("#foundDate").text(dateTxt);
						return false; // prevent the button click from happening
					}
			});

		}
	};

});

//Credit to o-o on stack overflow for this function. http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
Date.prototype.ddmmyyyy = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return (dd[1]?dd:"0"+dd[0]) + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + yyyy;
  };

  