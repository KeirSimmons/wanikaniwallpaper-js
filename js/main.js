require(["api", "canvasdrawer", "settings"], function(api, canvasDrawer, settings) {

	console.log(settings)

	function makeRequest() {
		api.load(function() {

			canvasDrawer.draw(api.characters);

		});
		return false;
	}
	
	if (settings.api_key) {
		makeRequest();
	}
	
});
