//credit to erikwett at branch.qlik.com. I used his extension as the basis for this http://branch.qlik.com/projects/showthread.php?396-qsVariable&highlight=qsvariable
//I used his code because I liked the functionality of easily creating a variable

define(["qlik", "http://sugarjs.com/release/current/sugar.min.js"], function(qlik, sugarjs) {


	return {
		initialProperties : {
			version : 1.0,
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
										//data.variableValue.qStringExpression = '=' + data.variableName;
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

			html += '<input type="text"  />';
				
			$element.html(html).find('select, input').on('change', function() {
				var val = $(this).val() + '';
				var dateVal = Date.create(val);
				var dateTxt = dateVal.ddmmyyyy();
				qlik.currApp(ext).variable.setContent(layout.variableName, dateTxt);
				
			})
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
