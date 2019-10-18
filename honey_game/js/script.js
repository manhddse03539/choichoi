var frontCard=['card1','card2','card3','card4','card5','card6','card7','card8','card9','card10','card11','card12'];
frontCard= frontCard.concat(frontCard);
var current=null;
var time=0;
var maxScore=frontCard.length/2;
var counttime;
function chien(){
	time=Math.floor(Math.random()*100 + 50);
	$('#option .dialog p:nth-child(4)').html('Ok bạn có '+time+'giây');
	$('#option .dialog p:nth-child(4)').show();
	$('#option .dialog button:nth-child(3)').css('pointer-events', 'none');
		$('#option .dialog button:nth-child(3)').html('Sẵn sàng');
	var count=3;
	var counttime2=setInterval(function(){
		$('#bg-music').attr('src','sound/po_low.mp3');
		document.getElementById('bg-music').play();
		$('#option .dialog button:nth-child(3)').html(count);
		count--;
		if(count==-2){
			clearInterval(counttime2);
			$('#option').hide();
			play();
		} 
	},1000);
}
function replay(){
	$('#option .dialog button:nth-child(3)').css('pointer-events', 'auto');
	$('#option .dialog button:nth-child(3)').html('Chiến');
	$('#option .dialog p:nth-child(4)').hide();
	$('#option-lose').hide();
	$('#option-win').hide();
	var current=null;
	var time=0;
	maxScore=frontCard.length/2;
	$('.grid').replaceWith('');
	$('#option').show();
}
function play(){
	$('.card').attr('onclick','sliceCard(this)');
	frontCard = shuffle(frontCard);
	this.distributeCard();
	$('#time-bar').attr('max',time);
	counttime=setInterval(function(){
		$('#time-bar').attr('value',time);
		if(time==0){
			clearInterval(counttime);
			$('#option-lose').show();
			$('#bg-music').attr('src','sound/fall.mp3');
			document.getElementById('bg-music').play();
		} 
		time--;
	},1000);
}
function sliceCard(card){
	$(card).children().toggleClass('flip');
	if(!current){
		current=$(card);
		$(card).css('pointer-events', 'none');
		$('#bg-music').attr('src','sound/dog.mp3');
		document.getElementById('bg-music').play();
	}else{
		if(current.attr('data-name') != $(card).attr('data-name')){
			$('.card').css('pointer-events', 'none');
			setTimeout(function(){
				$(current).children().toggleClass('flip');
				$(card).children().toggleClass('flip');
				current.css('pointer-events', 'auto');
				$(card).css('pointer-events', 'auto');
				$('#bg-music').attr('src','sound/puin_low.mp3');
				document.getElementById('bg-music').play();
				current=null;
				$('.card').css('pointer-events', 'auto');
			},500);
		}else{
			$('.card').css('pointer-events', 'none');
			setTimeout(function(){
				$('#bg-music').attr('src','sound/puin_high.mp3');
				document.getElementById('bg-music').play();
				current.children().css('opacity',0);
				$(card).children().css('opacity',0);
				current=null;
				maxScore--;
				if(maxScore==0){
					$('#option-win').show();
					$('#bg-music').attr('src','sound/applause.mp3');
					document.getElementById('bg-music').play();
					clearInterval(counttime);
				}
				$('.card').css('pointer-events', 'auto');
			},500);		
		}
	}
}
function shuffle(array){
	var currentIndex=array.length, temporaryValue, randomIndex;
	while(currentIndex !== 0){
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -=1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
function distributeCard(){
	for(var i = 0;i < frontCard.length; i++){
		$('#content').append('<div class="grid">'+
            	'<div class="card" data-name="'+frontCard[i]+'" onclick="sliceCard(this)">'+
                	'<div class="front">'+
                    	'<img src="img/'+ frontCard[i] +'.jpg"/>'+
                    '</div>'+
                   ' <div class="back">'+
                    	'<img src="img/backside.png"/>'+
                   ' </div>'+
               ' </div>'+
           '</div>');
	}
}