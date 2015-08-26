# sense-nlp

This project is an extension for Qlik Sense which uses the SugarJS library to convert a date in natural lanugage to a variable of the actual date.

Examples here: http://sugarjs.com/dates

This extension is in early stages of development. Happy for anyone to contribute! :)

Love Qlik Sense. New to javascript.

See wiki on github for a todo list.

To use this extension on desktop:
1. Download the zip file from github
2. Unzip the file to your Qlik Sense extensions folder e.g. C:\users\{your username}\Documents\Qlik\Sense\Extensions\
3. Drag the extension "Natural Language Processing Date Picker" on to your canvas
4. In the variable tab set a variable name e.g. vDate (this will be automatically created)
5. Use that variable in an expression e.g. date(if([Report Date]>= date#('$(vDate)', 'DD/MM/YYYY'), [Report Date], null()))
6. Type in something in the text box e.g. two weeks ago. This will set the vDate variable to a date in the format DD/MM/YYYY