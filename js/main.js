// Irvin Reaves
// Project 2
// Visual Frameworks (VFW) 1204
// Mobile Development
// Full Sail University
// Music Catalog js

//wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	function addSongsInfo(){
		var formTag		= document.getElementsByTagName( "form" ),
			selectLi = $( 'songInfo' ),
			makeSelect = document.createElement( 'select' );
			makeSelect.setAttribute( "id", "songsInfo" );
		for( var i = 0, j = songInfo.length; i < j; i++ ){
			var makeOption = document.createElement( 'option' );
			var optText = songInfo[i];
			makeOption.setAttribute( "value", optText );
			makeOption.innerHTML = optText;
			makeSelect.appendChild( makeOption );
		}
		selectLi.appendChild( makeSelect );
	}
	
	// Find value of a selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].favorites;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				favoritevalue = radios[i].value;
			}
		}
	}
	
	function getCheckboxValue(){
		if($('fav').checked){
			favValue = $('fav').value;
		}else{
			favValue = "No"
		}
	} 
	
	function toggleControls( n ){
		switch( n ){
			case "on":
				$('songForm').style.display    = "none";
				$('clear').style.display       = "inline";
				$('displayData').style.display = "none";
				$('addNew').style.display      = "inline";
				break;

			case "off":
				$('songForm').style.display    = "block";
				$('clear').style.display       = "inline";
				$('displayData').style.display = "inline";
				$('addNew').style.display      = "none";
				$('items').style.display       = "none";
				break;

			default:
				return false;	
		}
	}
	
	function storeData(){
		
		var id 			= Math.floor( Math.random() *10001 );
		
		getSelectedRadio();
		getCheckboxValue();
		var item			= {};
		item.songInfo 		= ["Select Song Type:" , $('songsInfo').value];
		item.sname 			= ["Name of Song:" , $('sname').value];
		item.aname 			= ["Album:" , $('aname').value];
		item.arname 		= ["Artist:" , $('arname').value];
		item.url 			= ["Music Down website:" , $('url').value];
		/*Item.favorite		= ["Favorite:", favoritevalue]; 
		Item.fav			= ["Save as Favorite:", favValue]; 	 
		Item.range	 		= ["Rating", $('range').value];
		Item.date			= ["Date", $('date').value];
		Item.notes			= ["Notes", $('notes').value]; */
		
		localStorage.setItem(id, JSON.stringify( item ));
		alert( "Song Added!" );
	}
	
	function getData()
	{
		toggleControls( "on" );
		if( localStorage.length === 0 ){
			alert( "No Saved Songs." );
		}
		var makeDiv  = document.createElement( 'div' );
		makeDiv.setAttribute( "id", "items" );
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild( makeList );
		document.body.appendChild( makeDiv );
		$( 'items' ).style.display = "block";
		for( var i = 0, len = localStorage.length; i < len; i++ )
		{
			var makeli      = document.createElement( 'li' );
			makeList.appendChild( makeli );
			var key         = localStorage.key( i );
			var value       = localStorage.getItem( key );
			var obj         = JSON.parse( value );
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild( makeSubList );
			for( var n in obj )
			{
				var makeSubli       = document.createElement( 'li' );
				makeSubList.appendChild( makeSubli );
				var optSubText      = obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML = optSubText;
			} 
		}
	}	
	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "No Saved Songs." );
		}else{
			localStorage.clear();
			alert( "All Songe have been deleted!" );
			window.location.reload();
			return false;
		}
	}

	var songInfo = ["--Choose Music Type--", "Party", "Relaxed", "Fun", "Other"],
		favoritevalue,
		favValue = "No"
	;
	addSongsInfo();
	
	var displayLink = $( 'displayData' );
	displayLink.addEventListener("click", getData);
	var clearLink   = $( 'clear' );
	clearLink.addEventListener( "click", clearLocal );
	var save        = $( 'submit' );
	save.addEventListener( "click", storeData );
	

});		
