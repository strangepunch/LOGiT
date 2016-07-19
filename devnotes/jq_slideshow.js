/**in the header (or referenced externally) 
>>I only use ad1 below but it's designed for 2 or maybe more which could give us 
>>layout options (side by side, top and bottom etc)

**/
<script type="text/javascript" src="resources/js/jquery.panelgallery-2.0.0.min.js"></script>
<script type="text/javascript">
$(function(){
	$('#ad1').panelGallery({
		viewDuration: 5000,
		transitionDuration: 500,
		boxSize: 50,
		boxFadeDuration: 500,
		boxTransitionDuration: 50
	});
	$('#ad2').panelGallery({
		viewDuration: 5000,
		transitionDuration: 500,
		boxSize: 50,
		boxFadeDuration: 500,
		boxTransitionDuration: 50
	});
});
</script>

<style type="text/css">
#ad1 {
	text-align:left
	margin: 25px auto 0 auto;
	-moz-box-shadow: 0px 0px 10px #333;
	-webkit-box-shadow:  0px 0px 10px #333;
	box-shadow:  0px 0px 10px #333;
	clear:right;
}
#ad2 {
	margin: 25px auto 0 auto;
	-moz-box-shadow: 0px 0px 10px #333;
	-webkit-box-shadow:  0px 0px 10px #333;
	box-shadow:  0px 0px 10px #333;
	clear:right;
}
</style>


/** in the HTML Body (or partial view) **/

<div id="ad1">
      <img alt="" src="ads/bberry/enjoy_speed.jpg" width="450" height="172" />
      <img alt="" src="ads/ad_strange_punch_mobile_apps.jpg" width="450" height="172" />
      <img alt="" src="cities/images/Dunedin/water-sports-wakatipu-queenstown.jpg" width="450" height="172" />
      <img alt="" src="cities/images/Invercargill/Invercargill-sundial-sculpture.jpg" width="450" height="172" />
      <img alt="" src="ads/bberry/events_bberryA.jpg" width="450" height="172" />
      <img alt="" src="ads/bberry/events_bberry.jpg" width="450" height="172" />
      <img alt="" src="ads/venues/eden_park_game_shot.jpg" width="450" height="172" />
</div> <!-- ad ends -->
