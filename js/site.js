$(function() {
	var editor = ace.edit("ace-editor");
	editor.setOptions({
		maxLines: 80
	});

	var $tabPanel = $('#ace-editor-tabs');
	var $tabs = $tabPanel.children('li');
	$tabs.children('a').click(function(e) {
		e.preventDefault();
		$tabs.toggleClass('active', false);
		$(this).closest('li').toggleClass('active', true);
	});

	$tabPanel.find(".tab-helloworld > a").click(function() {
		var code = "IT'S SHOWTIME\n" +
			'TALK TO THE HAND "Hello World"\n' +
			"YOU HAVE BEEN TERMINATED";
		editor.setValue(code);
	});
	$tabPanel.find(".tab-factorial > a").click(function() {
		var code = "IT'S SHOWTIME\n" + 
			"\n" + 
			"HEY CHRISTMAS TREE n\n" + 
			"\tYOU SET US UP 0\n" + 
			"\n" + 
			'TALK TO THE HAND "Input: "\n' + 
			"GET YOUR ASS TO MARS n\n" + 
			"DO IT NOW\n" + 
			"I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY\n" + 
			"\n" + 
			"HEY CHRISTMAS TREE result\n" + 
			"\tYOU SET US UP 0\n" + 
			'TALK TO THE HAND "Result is: "\n' + 
			"GET YOUR ASS TO MARS result\n" + 
			"DO IT NOW factorial n\n" + 
			"TALK TO THE HAND result\n" + 
			"\n" + 
			"YOU HAVE BEEN TERMINATED\n" + 
			"\n" + 
			"LISTEN TO ME VERY CAREFULLY factorial\n" + 
			"\tI NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE n\n" + 
			"\tGIVE THESE PEOPLE AIR\n" + 
			"\n" + 
			"\tHEY CHRISTMAS TREE Condition\n" + 
			"\t\tYOU SET US UP 0\n" + 
			"\tGET TO THE CHOPPER Condition\n" + 
			"\tHERE IS MY INVITATION n\n" + 
			"\tYOU ARE NOT YOU YOU ARE ME 1\n" + 
			"\tENOUGH TALK\n" + 
			"\n" + 
			"\tBECAUSE I'M GOING TO SAY PLEASE Condition\n" + 
			"\t\tI'LL BE BACK n\n" + 
			"\tBULLSHIT\n" + 
			"\n" + 
			"\t\tHEY CHRISTMAS TREE value\n" + 
			"\t\t\tYOU SET US UP n\n" + 
			"\t\tGET TO THE CHOPPER value\n" + 
			"\t\t\tHERE IS MY INVITATION n\n" + 
			"\t\t\tGET DOWN 1\n" + 
			"\t\tENOUGH TALK\n" + 
			"\n" + 
			"\t\tHEY CHRISTMAS TREE result\n" + 
			"\t\t\tYOU SET US UP n\n" + 
			"\t\tGET YOUR ASS TO MARS result\n" + 
			"\t\tDO IT NOW factorial value\n" + 
			"\t\tGET TO THE CHOPPER result\n" + 
			"\t\t\tHERE IS MY INVITATION result\n" + 
			"\t\t\tYOU'RE FIRED n\n" + 
			"\t\tENOUGH TALK\n" + 
			"\t\tI'LL BE BACK result\n" + 
			"\n" + 
			"\tYOU HAVE NO RESPECT FOR LOGIC\n" + 
			"HASTA LA VISTA, BABY\n";
		editor.setValue(code);
	});
	$tabPanel.find(".tab-fibonacci > a").click(function() {
		var code = "IT'S SHOWTIME\n" +
			"HEY CHRISTMAS TREE prev\n" +
			"YOU SET US UP -1\n" +
			"HEY CHRISTMAS TREE result\n" +
			"YOU SET US UP 1\n" +
			"HEY CHRISTMAS TREE sum\n" +
			"YOU SET US UP 0\n" +
			"HEY CHRISTMAS TREE loop\n" +
			"YOU SET US UP @NO PROBLEMO\n" +
			"HEY CHRISTMAS TREE index\n" +
			"YOU SET US UP 0\n" +
			"HEY CHRISTMAS TREE limit\n" +
			"YOU SET US UP 10\n" +
			"\nSTICK AROUND loop\n" +
			"\tGET TO THE CHOPPER sum\n" +
			"\tHERE IS MY INVITATION result\n" +
			"\tGET UP prev\n" +
			"\tENOUGH TALK\n" +
			"\n\tGET TO THE CHOPPER prev\n" +
			"\tHERE IS MY INVITATION result\n" +
			"\tENOUGH TALK\n\t" +
			"\n\tGET TO THE CHOPPER result\n" +
			"\tHERE IS MY INVITATION sum\n" +
			"\tENOUGH TALK\n\t" +
			"\n\tGET TO THE CHOPPER index\n" +
			"\tHERE IS MY INVITATION index\n" +
			"\tGET UP 1\n" +
			"\tENOUGH TALK\n\t" +
			"\n\tGET TO THE CHOPPER loop\n" +
			"\tHERE IS MY INVITATION limit\n" +
			"\tLET OFF SOME STEAM BENNET index\n" +
			"\tENOUGH TALK\n\t" +
			"\n\tTALK TO THE HAND sum\n" +
			"CHILL\n" +
			"\nYOU HAVE BEEN TERMINATED";
		editor.setValue(code);
	});

	// Click the first tab to populate some code in the editor
	$tabs.filter(':first').children('a:first').click();


	var $arnoldcOutputSection = $('#arnoldc-output-section');
	var $arnoldcOutput = $arnoldcOutputSection.children('pre');
	$('.action-arnoldc-execute').click(function(e) {
		e.preventDefault();

		$arnoldcOutput.text('');

		var code = editor.getValue();
		console.log('code', code);
		try {
			var output = [];
			var executeOptions = {
				log: function (x) { 
					$arnoldcOutput.append(document.createTextNode(x + "\n"));
				}
			};
			arnoldc.transpileToJsAndExecute(code, executeOptions);
		} catch (err) {
			console.log('err', err);
			var errorMessage =  err.message;
			$arnoldcOutput.append(document.createTextNode(errorMessage  + "\n"));
		}
		$arnoldcOutputSection.show();
	});
});