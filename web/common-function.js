/*jshint strict:false, node:false */
/*exported run_tests, read_settings_from_cookie, beautify, submitIssue, copyText, selectAll, clearAll, changeToFileContent*/

//const { tags } = require("mustache");

/*
https://javascript-minifier.com/ 
*/
var the = {

    uploadedFiles: null, //SM:Added
    captcha: null, //SM:Added
    savedSongsList_LclJson: null,
    firstIndexItemId: 11,
    movieSeq :1,
    //message: '',
	//shippingMethod: null,
};



function any(a, b) {
    return a || b;
}




function getMySavedSongsList() {

    //tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
    tags = sessionStorage.getItem("savedSongsList");
    
    /*
    if (tags != null) {
        if (tags != "") {
            populateOrders();
            return;
        }
    }
	*/

    var customeremail = localStorage.getItem("userEmail");
    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getsavedSongsList",
            customeremail: customeremail
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {

            if (tags != null) {
                if ((tags != "") && (tags != "null"))  {
                    // var x = tags.lovedsongs;
                    // var y = x.split(',');
                    // var ExistingSongsCount = y.length;
                    // NewSongsCount = ((response.lovedsongs).split(',')).length
                    var localStLovedSongList = JSON.parse(tags)[0].lovedsongs;
                    if (localStLovedSongList == undefined){
                        localStLovedSongList = ",";
                    }
                    var dbLovedSongList =JSON.parse(response)[0].lovedsongs;
                    if (dbLovedSongList == undefined){
                        dbLovedSongList = ",";
                    }
                    var localStstarsongList = JSON.parse(tags)[0].starsongs;
                    if (localStstarsongList == undefined){
                        localStstarsongList = ",";
                    }
                    var dbstarsongList =JSON.parse(response)[0].starsongs;                    
                    if (dbstarsongList == undefined){
                        dbstarsongList = ",";
                    }
                    if (dbLovedSongList.split(',').length < localStLovedSongList.split(',').length){
                        return;
                    }
                    if (dbstarsongList.split(',').length < localStstarsongList.split(',').length){
                        return;
                    }                    
                }
            }            
            sessionStorage.setItem("savedSongsList", response);




        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
        }
    });
}

function showMdaItems() {

    if (localStorage.getItem("userLoggedIn") == "n") {
        return;

    } else if (localStorage.getItem("userLvl") != "9") {
        return;
    }
    //var tags = the.itemList_LclJson;
    tags = JSON.parse(sessionStorage.getItem("mdaItemList"));

    /*
    if (tags != null) {
        if (tags != "") {
			populateMdaItemList();
            return;
        }
    }
	*/

    var customeremail = localStorage.getItem("userEmail");
    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getMdaItemsList",
            customeremail: customeremail
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {
            //alert(response);
            //var tags = JSON.parse(response);
            //sessionStorage.setItem("LanguageHelpCodeAndIds", JSON.stringify(response));
            //console.log(response);
            //the.itemList_LclJson = response;
            sessionStorage.setItem("mdaItemList", JSON.stringify(response));

            populateMdaItemList();

        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
        }
    });
}

function getMdaItems() {

    if (localStorage.getItem("userLoggedIn") == "n") {
        return;

    } else if (localStorage.getItem("userLvl") != "9") {
        return;
    }
    //var tags = the.itemList_LclJson;
    tags = JSON.parse(sessionStorage.getItem("mdaItemList"));

    /*
    if (tags != null) {
        if (tags != "") {
			populateMdaItemList();
            return;
        }
    }
	*/

    var customeremail = localStorage.getItem("userEmail");
    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getMdaItemsList",
            customeremail: customeremail
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {
            //alert(response);
            //var tags = JSON.parse(response);
            //sessionStorage.setItem("LanguageHelpCodeAndIds", JSON.stringify(response));
            //console.log(response);
            //the.itemList_LclJson = response;
            sessionStorage.setItem("mdaItemList", JSON.stringify(response));

            //populateMdaItemList();

        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
        }
    });
}


function getItemList() {
    //var tags = the.itemList_LclJson;
    var tags = JSON.parse(sessionStorage.getItem("itemList"));

    
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }
	

    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getItemsList"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {
            //alert(response);
            //var tags = JSON.parse(response);
            //sessionStorage.setItem("LanguageHelpCodeAndIds", JSON.stringify(response));
            //console.log(response);
            //the.itemList_LclJson = response;

            tags = JSON.parse(response);
            the.firstIndexItemId = tags[0].itemid;
            sessionStorage.setItem("itemList", JSON.stringify(response));

            getMaxCounts();

            // var rows = tags;
            // var categoryCount = 0;
            // for (var i = 0; i < rows.length; i++) {
            //     if (i == 0) {
            //     } else if (rows[i].category != rows[i - 1].category) {
            //         sessionStorage.setItem("max-count-" + rows[i - 1].category, categoryCount) ;
            //         categoryCount = 0;
            //     }
            //     categoryCount = categoryCount + 1;

            //     if (i == rows.length - 1) {
            //         sessionStorage.setItem("max-count-" + rows[i].category, categoryCount) ;
            //         categoryCount = 0;
            //     }
            // }



        },
        error: function(xhr, status, error) {
            //console.log(error);//
            //console.log(xhr);
        }
    });
}

function getMovieList(){
    var tags = JSON.parse(sessionStorage.getItem("movieList"));

    
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }
	

    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getMovieList"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {
            tags = JSON.parse(response);
            the.firstIndexItemId = tags[0].itemid;
            sessionStorage.setItem("movieList", JSON.stringify(response));

        },
        error: function(xhr, status, error) {

        }
    });   
}

function getMaxCounts() {
    //var tags = the.itemList_LclJson;
    var tags = JSON.parse(sessionStorage.getItem("max-count-A"));

    
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }
	

    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getMaxCounts"
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {
            //alert(response);
            //var tags = JSON.parse(response);
            //sessionStorage.setItem("LanguageHelpCodeAndIds", JSON.stringify(response));
            //console.log(response);
            //the.itemList_LclJson = response;

            tags = JSON.parse(response);
 
            var rows = tags;
            var categoryCount = 0;
			var defaultDisplayCount = 10;
            for (var i = 0; i < rows.length; i++) {
                sessionStorage.setItem("max-count-" + rows[i].category, rows[i].count)
				sessionStorage.setItem("display-count-" + rows[i].category, defaultDisplayCount)
            }

            //populateItemListInDropDown();

        },
        error: function(xhr, status, error) {
            //console.log(error);
            //console.log(xhr);
        }
    });
}

function getRandomMovieUrl(){
    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/',path.indexOf('antakshar')) + 1) + "random-movie-name-generator/" ;
    window.location.href = myUrl;   
}

function getRandomMovie(){

    document.getElementById("homeDivId").style.display = "block";
    document.getElementById("filtersDivId").style.display = "none";

    var newHTML = "<div id='movieGenerator'><div id='movienameDiv'>" ;
    newHTML = newHTML + "<img class='movieImageCls' alt ='' src='/Antaksharee/img/"+ "Jab We Met" +".png'> <br>" +  "Jab We Met" + "</div><button   type='button' class='rndmBtn' onclick=updateMovieName() >Generate New</button></div><br><br><br><br><br><br><br><br><br><br><br><br>";

    document.getElementById("cardsContainerDivId").innerHTML = newHTML;

    var metaDesc = "Generate random bollywood movie name. Can be used to play Dumb Charades"   ;

    var metaKey = "bollywood, hindi, movie, name, generator, dumb, charades " ;

    document.getElementById("homeSubDiv4").innerHTML = "<div id='movieBannerNm'>Dumb Charades: <br> Random Movie Name  <br>Generator</div>";

    document.getElementById("howToPlay").innerHTML = '<b>How To Play Dumb Charades</b><br><br>Dumb Charades involves explaining the name of the movie through acting. A person is not allowed to talk and is required to act out the name by using different gestures, facial expressions, and body language. Form 2 or more teams, each with at least 2 members. Team A decides the movie name and calls one member from another team, say Team B, and tell him/her secretly the word or the phrase. The identified member from Team B has to enact the film name his/her without any lip movement to the remaining members of his team. Others in his team have to guess the name of the movie by following the gestures.<a id="howToGoHome" href="javascript:goToHome()"> <em>Go Home</em></a>';


    document.querySelector('meta[name="description"]').setAttribute("content", metaDesc);
    document.querySelector('meta[name="keywords"]').setAttribute("content", metaKey);
    document.title = "Random Bollywood Movie Name Generator " ;

    const structuredData = {
        "@context": "https://schema.org/",
        "@type":"WebSite",
        "name": "Random Bollywood Movie Name Generator",
        "url": "https://antaksharee.com/random-movie-name-generator/",
        "datePublished": "2022-07-10",
        "description": "Generate random bollywood movie names to play party games such as Dumb Charades.",
        "thumbnailUrl": "https://antaksharee.com/images/banner.png"    
      };
      
      let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
      jsonLdScript.innerHTML = JSON.stringify(structuredData);


}

function updateMovieName(){
    var tf = JSON.parse(sessionStorage.getItem("movieList"));
    var tags = JSON.parse(tf);
    var max = tags.length - 1
    //var nbr = Math.floor(Math.random() * max);
    var nbr = the.movieSeq + 1;
    the.movieSeq = nbr;
    var movie = tags[nbr].moviename;

    document.getElementById("movienameDiv").innerHTML = "<img class='movieImageCls'  alt ='' src='/Antaksharee/img/"+ movie +".png'>" + "<br>" +  movie;
    //document.getElementById("movienameDiv").innerHTML = '<object class="movieImageClsLyrics" data="/Antaksharee/img/' + movie + '.png" type="image/png"><img src="/Antaksharee/img/backup.png" /></object>' + "<br>" +  movie;

	const id = 'movieGenerator';
	const yOffset = -50; 
	const element = document.getElementById(id);
	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
}

function hideMe(image){
    image.style.display = "none";
}

function getItemLyrics(origsongtitle) {

    
    songtitle = origsongtitle.replaceAll("-", " ")

    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getItemLyrics",
            songtitle: songtitle
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {

            tags = JSON.parse(response);
            var itemid = tags[0].itemid;
            var songlyrics = tags[0].songlyrics;
            var hindilyrics = tags[0].hindilyrics;
            var actor1 = tags[0].actor1;
            var actor2 = tags[0].actor2;
            var actor3 = tags[0].actor3;
            var singer = tags[0].singer;
            var singer2 = tags[0].singer2;
            var moviename = tags[0].moviename;
            var year = tags[0].year;
            var songgenre1 = tags[0].songgenre1;
            var songgenre2 = tags[0].songgenre2;
            var songwriter = tags[0].songwriter;
            var musiccomposer = tags[0].musiccomposer;
            var lovecount = tags[0].lovecount;
            var starcount = tags[0].starcount;
            var checkcount = tags[0].checkcount;
            var discontinue = tags[0].discontinue;
            var category = tags[0].category;

            var path = window.location.pathname;
            var myUrl = path.substring(0, path.indexOf('/',path.indexOf('antakshar')) + 1)

            document.getElementById("homeDivId").style.display = "block";
            document.getElementById("filtersDivId").style.display = "none";
            var newHTML = "<div class = 'songContainer' >";
            newHTML = newHTML + "<div class = 'songContainerSub' > <h1 class='songContainerH1' > Song Title: " + songtitle + "</h1></div>";

            if (localStorage.getItem("userLoggedIn") == "n") {
       
            } else if (localStorage.getItem("userLvl") == "9") {
                //newHTML = newHTML + '<a href="#" class="btn" onclick="editItem(' + "'" + itemid + "'," + "'" + category + "'," + "'" + songtitle + "'," + "'" + songlyrics + "',"+ "'" + hindilyrics + "',"+ "'" + actor1 + "',"+ "'" + actor2 + "',"+ "'" + actor3 + "',"+ "'" + singer + "',"+ "'" + singer2 + "',"+ "'" + moviename + "',"+ "'" + year + "'," + "'" + songgenre1 + "'," + "'" + songgenre2 + "'," + "'" + songwriter + "',"+ "'" + musiccomposer + "',"+ "'" + lovecount + "',"+"'" + starcount + "',"+"'" + checkcount + "',"+"'" + discontinue + "'"+');return false;" >Edit</a>';

                newHTML = newHTML + '<button class="btn" data-itemid= "' + itemid + '" data-category= "' + category + '" data-songtitle= "' + songtitle + '" data-songlyrics= "' + songlyrics + '" data-hindilyrics= "' + hindilyrics + '" data-actor1= "' + actor1 + '" data-actor2= "' + actor2 + '" data-actor3= "' + actor3 + '" data-singer= "' + singer + '" data-singer2= "' + singer2 + '" data-songwriter= "' + songwriter + '" data-musiccomposer= "' + musiccomposer + '" data-lovecount= "' + lovecount + '" data-starcount= "' + starcount + '" data-checkcount= "' + checkcount + '" data-discontinue= "' + discontinue + '" data-moviename= "' + moviename + '" data-year= "' + year + '" data-songgenre1= "' + songgenre1 + '" data-songgenre2= "' + songgenre2 + '" onclick="editItem(this)" >Edit</button>';
            }
            newHTML = newHTML + '<div class="songDeltsNImg">';
            newHTML = newHTML + '<div class="songDelts">'
            if (singer != ""){
                singerURL= myUrl + "singer/bollywood-songs-of-singer-" + singer.replaceAll(" " , "-");
                newHTML = newHTML + "<br>" + "<h6 class='songContainerH6'  >Singer: " + '<a href="' + singerURL + '" >' + singer + '</a>' ;
                if (singer2 != ""){
                    singerURL= myUrl + "singer/bollywood-songs-of-singer-" + singer2.replaceAll(" " , "-");
                    //newHTML = newHTML + ", " + singer2 ;
                    newHTML = newHTML + ", " + '<a href="' + singerURL + '" >' + singer2 + '</a>' ;
                }
                newHTML = newHTML + "</h6>";
            }



            if (songwriter != ""){
                writerURL= myUrl + "writer/bollywood-songs-of-writer-" + songwriter.replaceAll(" " , "-");
                //newHTML = newHTML + "<br>" + "<h6 class='songContainerH6' >Song Writer: " + songwriter + "</h6>";
                newHTML = newHTML + "<br>" + "<h6 class='songContainerH6' >Song Writer: " + '<a href="' + writerURL + '" >' + songwriter + '</a>' + "</h6>";
            }

            if (musiccomposer != ""){
                musicURL= myUrl + "music/bollywood-songs-of-" + musiccomposer.replaceAll(" " , "-");
                //newHTML = newHTML + "<br>" + "<h6 class='songContainerH6' >Music: " + musiccomposer + "</h6>" ;
                newHTML = newHTML + "<br>" + "<h6 class='songContainerH6' >Music: " + '<a href="' + musicURL + '" >' + musiccomposer + '</a>' + "</h6>" ;
            }

            if (moviename != ""){
                movieURL= myUrl + "movie/bollywood-songs-of-movie-" + moviename.replaceAll(" " , "-");
                //newHTML = newHTML + "<br>" + "<h6 class='songContainerH6' >Movie: " + moviename ;
                newHTML = newHTML + "<br>" + "<h6 class='songContainerH6' >Movie: " + '<a href="' + movieURL + '" >' + moviename + '</a>' ;
                if (year != ""){
                    if (year != "0"){
                        newHTML = newHTML + " (" +  year + ")" ;
                    }
                }
                newHTML = newHTML + "</h6>";
            }



            if (actor1 != ""){
                newHTML = newHTML + "<br>" + "<h6 class='songContainerH6' >Actor: " + actor1 ;
                if (actor2 != ""){
                    newHTML = newHTML + ", " + actor2 ;
                }
    
                if (actor3 != ""){
                    newHTML = newHTML + ", " + actor3 ;
                }
                newHTML = newHTML + "</h6>";
                
            }
            newHTML = newHTML + '</div>';
            if (moviename != ""){
            newHTML = newHTML + '<img class="movieImageClsLyrics" alt="' + moviename + '" onerror="hideMe(this)" src="/Antaksharee/img/' + moviename + '.png">';
            //newHTML = newHTML + '<object class="movieImageClsLyrics" data="/Antaksharee/img/' + moviename + '.png" type="image/png"><img src="/Antaksharee/img/backup.png" /></object>';   
            }
            newHTML = newHTML + '</div>';

            newHTML = newHTML + "<hr>"  + "<h2 > Lyrics </h2>" + "<div class = 'songLyrics' >" +  songlyrics ;
            
            if (hindilyrics != undefined){
                if (hindilyrics != ""){
                    newHTML = newHTML + "<hr>" +"<div class = 'songLyrics' lang='hi'>" + hindilyrics + "</div>";
                }
            }

            newHTML = newHTML + "</div>";
            newHTML = newHTML + "</div>";
            if (songlyrics == undefined){
                newHTML = "<div class = 'songContainer' >Page not found</div>";
            }
            document.getElementById("cardsContainerDivId").innerHTML = newHTML;

            var metaDesc = songtitle + " Lyrics of bollywood hindi song "   ;

            var metaKey = "Lyrics, bollywood, hindi, song, " + songtitle;

            if (moviename != ""){
                metaDesc = metaDesc + " from movie " + moviename ;
                metaKey = metaKey + ", movie," + moviename ;
            }
            if (singer != ""){
                metaDesc = metaDesc + " sung by " + singer ;
                metaKey = metaKey + ", singer, " + singer ;
            }
            if (singer2 != ""){
                metaDesc = metaDesc + " and " + singer2 ;
                metaKey = metaKey + ", " + singer2 ;
            }
            if (songwriter != ""){
                metaDesc = metaDesc + " written by " + songwriter ;
                metaKey = metaKey + ", writer, " + songwriter ;
            }
            if (musiccomposer != ""){
                metaDesc = metaDesc + " music by " + musiccomposer ;
                metaKey = metaKey + ", music, " + musiccomposer ;
            }
            
            document.querySelector('meta[name="description"]').setAttribute("content", metaDesc);
            document.querySelector('meta[name="keywords"]').setAttribute("content", metaKey);
            document.title = "Song Lyrics - " + songtitle;

            const structuredData = {
                "@context": "https://schema.org/",
                "@type":"WebSite",
                "name": "Song Lyrics - " + songtitle ,
                "url": "https://antaksharee.com/lyrics/" + origsongtitle,
                "datePublished": "2022-07-10",
                "description": metaDesc,
                "thumbnailUrl": "https://antaksharee.com/images/banner.png"    
              };
              
              let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
              jsonLdScript.innerHTML = JSON.stringify(structuredData);

        },
        error: function(xhr, status, error) {
            //console.log(error);
            //console.log(xhr);
        }
    });
}

function editItem( btn ){
    itemid = btn.dataset.itemid;
    category = btn.dataset.category;
    songtitle = btn.dataset.songtitle;
    songlyrics = btn.dataset.songlyrics;
    hindilyrics = btn.dataset.hindilyrics;
    actor1 = btn.dataset.actor1;
    actor2 = btn.dataset.actor2;
    actor3 = btn.dataset.actor3;
    singer = btn.dataset.singer;
    singer2 = btn.dataset.singer2;
    moviename = btn.dataset.moviename;
    year = btn.dataset.year;
    songgenre1 = btn.dataset.songgenre1;
    songgenre2 = btn.dataset.songgenre2;
    songwriter = btn.dataset.songwriter;
    musiccomposer = btn.dataset.musiccomposer;
    lovecount = btn.dataset.lovecount;
    starcount = btn.dataset.starcount;
    checkcount = btn.dataset.checkcount;
    discontinue = btn.dataset.discontinue;


    //function editItem(itemid, category, songtitle, songlyrics ,hindilyrics , actor1 , actor2 , actor3 , singer , singer2 , moviename , year , songgenre1, songgenre2, songwriter , musiccomposer, lovecount,starcount, checkcount, discontinue)

    var newHTML = "<div class = 'songContainer' >";
    newHTML = newHTML + " ";
    


    newHTML = newHTML +
            "<div class = 'editFieldHead'>Title: </div><br>"
            +
            "<input type='text'  id='songtitle-" + itemid + "' style='width:95%; margin:auto;' value='" + songtitle + "'>" 
            + "";

    newHTML = newHTML + "<br><br><div class = 'editFieldHead'>Starting Character: </div><br>" +
    "<input type='text' id='category-" + itemid + "' style='width:95%; margin:auto;'  value='" + category + "'>" ;

    newHTML = newHTML +
            "<br><br><div class = 'editFieldHead'>Singer: </div><br>" +
            "<input type='text' id='singer-" + itemid + "' style='width:95%; margin:auto;' value='" + singer + "'>";
            
    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>Singer2: </div><br>" +
    "<input type='text' id='singer2-" + itemid + "' style='width:95%; margin:auto;' value='" + singer2 + "'>";

    newHTML = newHTML +
            "<br><br><div class = 'editFieldHead'>Song Writer: </div><br>" +
            "<input type='text' id='songwriter-" + itemid + "' style='width:95%; margin:auto;' value='" + songwriter + "'>";

    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>Music Composer: </div><br>" +
    "<input type='text' id='musiccomposer-" + itemid + "' style='width:95%; margin:auto;' value='" + musiccomposer + "'>";

    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>Movie Name: </div><br>" +
    "<input type='text' id='moviename-" + itemid + "' style='width:95%; margin:auto;' value='" + moviename + "'>";

    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>Year: </div><br>" +
    "<input type='text' id='year-" + itemid + "' style='width:95%; margin:auto;' value='" + year + "'>";

    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>Actor 1: </div><br>" +
    "<input type='text' id='actor1-" + itemid + "' style='width:95%; margin:auto;' value='" + actor1 + "'>";

    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>Actor 2: </div><br>" +
    "<input type='text' id='actor2-" + itemid + "' style='width:95%; margin:auto;' value='" + actor2 + "'>";

    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>Actor 3: </div><br>" +
    "<input type='text' id='actor3-" + itemid + "' style='width:95%; margin:auto;' value='" + actor3 + "'>";


    newHTML = newHTML + "<br><br><div class = 'editFieldHead'>Song Genre:</div> <br>"
    +
    "<input type='text' id='songgenre1-" + itemid + "' style='width:95%; margin:auto;' value='" + songgenre1 + "'>"
    +
    "<br><br><div class = 'editFieldHead'>Song Genre 2:</div> <br>" +
    "<input type='text' id='songgenre2-" + itemid + "' style='width:95%; margin:auto;' value='" + songgenre2 + "'>" ;




    newHTML = newHTML + "<hr>"  + "<h2 > Lyrics </h2>" + "<div class = 'songLyrics' >"  ;
    
    newHTML = newHTML + "<br><br>" +
    "<div contenteditable='true'  class='span2 fullWidth lyricsDiv' id='songlyrics-" + itemid + "' style='width:95%; ' >" + songlyrics + "</div>";


    newHTML = newHTML + "<hr>" +"<div class = 'songLyrics' lang='hi'>" ;

    newHTML = newHTML + "<br>" +
    "<div contenteditable='true'  class='span2 fullWidth lyricsDiv' id='hindilyrics-" + itemid + "' style='width:95%; ' >" + hindilyrics + "</div>"


    newHTML = newHTML +
    "<br><br><div class = 'editFieldHead'>Love Count: </div><br>" +
    "<input type='text' id='lovecount-" + itemid + "' style='width:95%; margin:auto;' value='" + lovecount + "'>" 

    +
    "<br><br><div class = 'editFieldHead'>Star Count: </div><br>" +
    "<input type='text' id='starcount-" + itemid + "' style='width:95%; margin:auto;' value='" + starcount + "'>" 

    +
    "<br><br><div class = 'editFieldHead'>Check Count: </div><br>" +
    "<input type='text' id='checkcount-" + itemid + "' style='width:95%; margin:auto;' value='" + checkcount + "'>"     +
    "<br><br><div class = 'editFieldHead'>Discontinue: </div> <br>" +
    "<input type='text' id='discontinue-" + itemid + "' style='width:95%; margin:auto;' value='" + discontinue + "'>" 

    +
    "<label id='updateitemerrormsg-" + itemid + "' style='color: #cc0000; font-size: 14px; min-height: 20px;'></label>";

    newHTML = newHTML +
    "<div class = 'saveChangesDivCls'>" + 
    "<button  type='button' class='btn btn-primary' onclick=updateItem('" + itemid + "','n') >Save Changes</button><br>" +
    "<button   type='button' class='btn btn-primary' onclick=updateItem('" + itemid + "','y') >Save As New Item</button><br>" +
    "<button   type='button' class='btn btn-danger' onclick=refreshPage() >Cancel</button><br>" +
    "</div>" +
    "<br></div></div>";

    newHTML = newHTML + "</div>";
    newHTML = newHTML + "</div>";
    newHTML = newHTML + "</div>";

    document.getElementById("cardsContainerDivId").innerHTML = newHTML;

}

function refreshPage(){
    var path = window.location.pathname;
    window.location.href = path;
}	

function getSongsStarting(starting){
    //starting/
    metaDesc = "List of bollywood hindi songs starting with "+ starting;
    metaKey = "bollywood, hindi, songs, lyrics, starting, with," + starting;

    document.querySelector('meta[name="description"]').setAttribute("content", metaDesc);
    document.querySelector('meta[name="keywords"]').setAttribute("content", metaKey);
    document.title = metaDesc ;
    document.getElementById("homeDivId").style.display = "block";

    showCategorySongs(starting);
}
function getSongsOfSinger (artist){
    artist = artist.replaceAll("-" , " ");
    metaDesc = "List of bollywood hindi songs of singer "+ artist;
    metaKey = "bollywood, hindi, songs, of, singer," + artist;

    document.querySelector('meta[name="description"]').setAttribute("content", metaDesc);
    document.querySelector('meta[name="keywords"]').setAttribute("content", metaKey);
    document.title = metaDesc ;
    document.getElementById("homeDivId").style.display = "block";

    showSingerSongs(artist);
}

function getSongsOfMovie(parm){
    parm = parm.replaceAll("-" , " ");
    metaDesc = "List of bollywood hindi songs of movie "+ parm;
    metaKey = "bollywood, hindi, songs, of, movie," + parm;

    document.querySelector('meta[name="description"]').setAttribute("content", metaDesc);
    document.querySelector('meta[name="keywords"]').setAttribute("content", metaKey);
    document.title = metaDesc ;
    document.getElementById("homeDivId").style.display = "block";

    showMovieSongs(parm);
}
function getSongsOfMusicComposer(parm){
    parm = parm.replaceAll("-" , " ");
    metaDesc = "List of bollywood hindi songs of "+ parm;
    metaKey = "bollywood, hindi, songs, of," + parm;

    document.querySelector('meta[name="description"]').setAttribute("content", metaDesc);
    document.querySelector('meta[name="keywords"]').setAttribute("content", metaKey);
    document.title = metaDesc ;
    document.getElementById("homeDivId").style.display = "block";

    showMusicComposerSongs(parm);
}

function getSongsOfWriter(parm){
    parm = parm.replaceAll("-" , " ");
    metaDesc = "List of bollywood hindi songs of writer "+ parm;
    metaKey = "bollywood, hindi, songs, of, writer," + parm;

    document.querySelector('meta[name="description"]').setAttribute("content", metaDesc);
    document.querySelector('meta[name="keywords"]').setAttribute("content", metaKey);
    document.title = metaDesc ;
    document.getElementById("homeDivId").style.display = "block";

    showWriterSongs(parm);    
}
function populateMdaItemList() {
    var xyz = JSON.parse(sessionStorage.getItem("mdaItemList"));
    var itemArray = JSON.parse(xyz);

    var output = "";
    var params = "";
    output = "<button  style='float: right' type='button' class='btn btn-primary' onclick=updateItem('','y') >Add New Song</button>";

    for (var i = 0; i < itemArray.length; i++) {

        output += "<div class=' songgenre2item-" + itemArray[i].songgenre2 + " orderIdHdrDivCls' data-toggle='collapse' data-target='#table-" + itemArray[i].itemid + "' style='padding-bottom: 30px;'>  Song Title: " + itemArray[i].songtitle + "<br> Starting Character: " + itemArray[i].category ;

        //output += "<div style='height: 200px; width:200px; border-radius:5px; background-size: cover; background-repeat: no-repeat; background-color:#fff;  background-image:url(" + '"img/' + itemArray[i].actor3 + '"' + ") '></div>";

        output += "<i style='font-size:18px; float: right;' class='fa'>&#xf0b2;</i></div> <div class='collapse' id='table-" + itemArray[i].itemid + "'><table class='table'>";




        output += "<tr style='background-color:#FCFBFB; box-shadow: 1px 1px 2px #222222; '>" +
            "<td style='position: relative; padding-top:60px'>"



        output += "</td>" +
            "</tr>";


        output += "</table><div class='addressOnMyOrders'>"

            +
            "<div class='itemInfoDisplayDivCls'> <div class='categoryHeader'>Song Details</div>" +
            "Title: <br>"

            +
            "<input type='text'  id='songtitle-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].songtitle + "'>" +
            "<br><br>Song Lyrics: <br>" +
            "<div contenteditable='true'  class='span2 fullWidth lyricsDiv' id='songlyrics-" + itemArray[i].itemid + "' style='width:95%; ' >" + itemArray[i].songlyrics + "</div>"
            +
            "<p contenteditable='true' class='span2 fullWidth lyricsDiv' id='hindilyrics-" + itemArray[i].itemid + "' style='width:95%;  '  >" + itemArray[i].hindilyrics + "</p>"
            +

            "Starting Character: <br>" +
            "<input type='text' id='category-" + itemArray[i].itemid + "' style='width:95%; margin:auto;'  value='" + itemArray[i].category + "'>" +
            "<br><br>Actor 1: <br>" +
            "<input type='text' id='actor1-" + itemArray[i].itemid + "' style='width:95%; margin:auto;'  value='" + itemArray[i].actor1 + "'>" +
            "<br><br>Actor 2:<br>" +
            "<input type='text' id='actor2-" + itemArray[i].itemid + "' style='width:95%; margin:auto;'  value='" + itemArray[i].actor2 + "'>" +


            "Actor 3:" +
            "<input type='text' id='actor3-" + itemArray[i].itemid + "' style='width:95%; margin:auto;'  value='" + itemArray[i].actor3 + "'>"
            +
            "<br>Singer: <br>" +
            "<input type='text' id='singer-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].singer + "'>"
            +

            "<br><br>Singer 2<br>" +
            "<input type='text' id='singer2-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].singer2 + "'>" +

            "<br><br>Song Writer<br>" +
            "<input type='text' id='songwriter-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].songwriter + "'>" +

            "<br><br>Music Composer<br>" +
            "<input type='text' id='musiccomposer-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].musiccomposer + "'>" +


            "<br><br>Song Genre <br>"
            +
            "<input type='text' id='songgenre1-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].songgenre1 + "'>"
            +
            "Song Genre 2 <br>" +
            "<input type='text' id='songgenre2-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].songgenre2 + "'>" +


          
            "<br><br>Movie Name: <br>" +
            "<input type='text' id='moviename-" + itemArray[i].itemid + "' style='width:95%; margin:auto;'  value='" + itemArray[i].moviename + "'>"

            +
            "<br>Year: <br>" +
            "<input type='text' id='year-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].year + "'>" 

            +
            "<br>Love Count: <br>" +
            "<input type='text' id='lovecount-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].lovecount + "'>" 

            +
            "<br>Star Count: <br>" +
            "<input type='text' id='starcount-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].starcount + "'>" 

            +
            "<br>Check Count: <br>" +
            "<input type='text' id='checkcount-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].checkcount + "'>" 

            +
            "<br>Discontinue: <br>" +
            "<input type='text' id='discontinue-" + itemArray[i].itemid + "' style='width:95%; margin:auto;' value='" + itemArray[i].discontinue + "'>" +


            "</div>"
            +
            "</div>"
	
            // +

            // "</div>"




            +
            "<label id='updateitemerrormsg-" + itemArray[i].itemid + "' style='color: #cc0000; font-size: 14px; min-height: 20px;'></label>"

            +
            "<div class = 'saveChangesDivCls'><button  type='button' class='btn btn-primary' onclick=updateItem('" + itemArray[i].itemid + "','n') >Save Changes</button>" +
            "<button   type='button' class='btn btn-primary' onclick=updateItem('" + itemArray[i].itemid + "','y') >Save As New Item</button></div>" +
            "<br></div></div>";


    }

    document.getElementById("loginDivId").style.display = "none";
    document.getElementById("contactusDivId").style.display = "none";
    document.getElementById("homeDivId").style.display = "none";
    document.getElementById("showOrdersDivId").innerHTML = output;
    document.getElementById("showOrdersDivId").style.display = "block";
}

function getsavedSongsList() {
    var tags = the.savedSongsList_LclJson;
    if (tags != null) {
        if (tags != "") {
            return;
        }
    }

    var emailid = localStorage.getItem("userEmail");

    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getsavedSongsList",
            customeremail: emailid
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {
            //alert(response);
            //var tags = JSON.parse(response);
            //sessionStorage.setItem("LanguageHelpCodeAndIds", JSON.stringify(response));
            //console.log(response);
            the.savedSongsList_LclJson = response;
        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
        }
    });
}

//Do not delete
function toggleSubNavContent(){
	if (document.getElementById("subnav-content-div").style.display == "block"){
		document.getElementById("subnav-content-div").style.display = "none";
	} else{
		document.getElementById("subnav-content-div").style.display = "block";
	}
}


function showCreateAccount() {
    document.getElementById("loginSecDivId").style.display = "none";
    document.getElementById("registerSecDivId").style.display = "block";
}

function showLogin() {
    document.getElementById("loginSecDivId").style.display = "block";
    document.getElementById("registerSecDivId").style.display = "none";
    document.getElementById("forgotPasswordSecDivId").style.display = "none";
    document.getElementById("accActivatedDivId").style.display = "none";
    document.getElementById("forgotPWDivId").style.display = "none";
}

function showForgotPassword() {
    document.getElementById("loginSecDivId").style.display = "none";
    document.getElementById("forgotPasswordSecDivId").style.display = "block";
}


function listVideos() {

    var tf = JSON.parse(sessionStorage.getItem("HowToVideos"));

    if (tf == null) {
        return;
    }
    var rows = JSON.parse(tf);

    if (rows.length < 2) {
        return;
    }
    var innerHTML = '';

    innerHTML = innerHTML + "<div class='videoListContainer'>";

    innerHTML = innerHTML + '<div id="prjSelectionMsg" style=" padding: 5px; text-align: justify; text-justify: inter-word; border: 1px solid #ccc; color: #f1f1f1;background: rgba(9, 84, 132, 1); margin-Bottom: 0px">How to videos</div>';



    for (var i = 0; i < rows.length; i++) {
        var description = rows[i].description;
        var url = rows[i].url;

        innerHTML = innerHTML + "<div class='videoDescription'>" + description + "</div> <div class='videoIframeDiv'><iframe class='videoIframe' src= '" + url + "'> </iframe>"
    }
    innerHTML = innerHTML + "</div>";

    document.getElementById("howtoDivId").innerHTML = innerHTML;

}






function checkURL() {
    //console.log("inside checkURL");



    var myUrl = window.location.protocol + "//" + window.location.host +
        window.location.pathname;

    var LocationSearchStr = location.search;
    var find = '%20';
    var re = new RegExp(find, 'g');
    var pageName = "home";
    var path = window.location.pathname;

    LocationSearchStr = LocationSearchStr.replace(re, ' ');

    if (localStorage.getItem("cookieAccepted") == "y") {
        document.getElementById("cookie-div-id").style.display = "none"
    }

    var myCookie = getCookie("cookname");

    if (myCookie == null) {
        localStorage.setItem("userLoggedIn", "n");
        if (!onMobileBrowser()) {
        }
        document.getElementById("logoutLinkId").style.display = "none";

    } else {

        localStorage.setItem("userLvl", getCookie("cookuserLvl"));

        localStorage.setItem("userLoggedIn", "y");
        document.getElementById("loginLinkId").style.display = "none";
        document.getElementById("logoutLinkId").style.display = "block";
        getMySavedSongsList();

        if (localStorage.getItem("userLvl") == "9") {
            document.getElementById("mdaItems").style.display = "block";
		
        }
    }

    if (LocationSearchStr.indexOf('passkey=') > 0) {
        var ar = LocationSearchStr.split('passkey=');
        var accountactivationkey = ar[1];
        activateAccount(accountactivationkey);
        return;
    }
    


    if (path.indexOf('lyrics/') > 0) {
        //var songtitle = path.replaceAll("/antaksharee/lyrics/","");
        var songtitle = path.substring(path.indexOf("lyrics/") + 7);
        getItemLyrics(songtitle);
        return;
    }

    if (path.indexOf('random-movie-name-generator/') > 0) {
        getRandomMovie();
        return;
    }

    if (path.indexOf('starting/') > 0) {
        //var songtitle = path.replaceAll("/antaksharee/lyrics/","");
        var starting = path.substring(path.indexOf("starting/") + 39);
        onlyProceedWhenItemListIsAvailable();
        getSongsStarting(starting);
        return;
    }

    if (path.indexOf('movie/') > 0) {
        //var songtitle = path.replaceAll("/antaksharee/lyrics/","");
        var movie = path.substring(path.indexOf("movie/") + 31);
        onlyProceedWhenItemListIsAvailable();
        getSongsOfMovie(movie);
        return;
    }

    if (path.indexOf('writer/') > 0) {
        //var songtitle = path.replaceAll("/antaksharee/lyrics/","");
        var writer = path.substring(path.indexOf("writer/") + 33);
        onlyProceedWhenItemListIsAvailable();
        getSongsOfWriter(writer);
        return;
    }

    if (path.indexOf('music/') > 0) {
        //var songtitle = path.replaceAll("/antaksharee/lyrics/","");
        var artist = path.substring(path.indexOf("music/") + 25);
        onlyProceedWhenItemListIsAvailable();
        getSongsOfMusicComposer(artist);
        return;
    }

    if (path.indexOf('singer/') > 0) {
        //var songtitle = path.replaceAll("/antaksharee/lyrics/","");
        var singer = path.substring(path.indexOf("singer/") + 33);
        onlyProceedWhenItemListIsAvailable();
        getSongsOfSinger(singer);
        return;
    }

    if (LocationSearchStr.indexOf('resetkey=') > 0) {
        var ar = LocationSearchStr.split('resetkey=');
        var passwordresetkey = ar[1];
        //resetPassword(passwordresetkey);
        sessionStorage.setItem("passwordresetkey", passwordresetkey);


        document.getElementById("productDivId").style.display = "none";
        document.getElementById("contactusDivId").style.display = "none";
        document.getElementById("homeDivId").style.display = "none";
        document.getElementById("showCartDivId").style.display = "none";
        document.getElementById("addToCartModal").style.display = "none";
        document.getElementById("orderConfirmationDivId").style.display = "none";
        document.getElementById("showOrdersDivId").style.display = "none";
        document.getElementById("loginDivId").style.display = "block";

        document.getElementById("loginerrormsg").innerHTML = "";

        document.getElementById("loginSecDivId").style.display = "none";
        document.getElementById("forgotPWDivId").style.display = "block";
        return;
    }

    if (LocationSearchStr.indexOf('target=') > 0) {
        var ar = LocationSearchStr.split('target=');
        pageName = ar[1];
    }

	
    document.getElementById("loginDivId").style.display = "none";
    document.getElementById("contactusDivId").style.display = "none";
    document.getElementById("howtoDivId").style.display = "none";
    document.getElementById("homeDivId").style.display = "none";

    if (localStorage.getItem("cookieAccepted") == "y") {
        document.getElementById("cookie-div-id").style.display = "none"
    }

    //populateLanguages("helpTopics-lang-box");
    try {
        x = document.getElementById(pageName + "LinkId");
        x.className += " active";
        //x.style.display = "block";
    } catch {}

    if (pageName == "login") {

        document.getElementById("loginDivId").style.display = "block";
    } else if (pageName == "contactus") {
        document.getElementById("contactusDivId").style.display = "block";



        refreshCaptcha();

        //showHelpDivMessage("Contact us if you have any questions, feedback or are interested in purchasing the software. Some features have been disabled on the web version for security reasons. Full feature software can be used for software training/development, creating references and documentation for the software application. <br><br> If you found the site helpful, you can support our work by buying me a coffee by clicking on the coffee button at the top.");

    } else if (pageName == "home") {
        document.getElementById("homeDivId").style.display = "block";
        document.getElementById("contactusDivId").style.display = "none";
        document.getElementById("howtoDivId").style.display = "none";

        if (document.getElementById("cardsContainerDivId").innerHTML == "add-here"){
            populateItemList();
        }
        
    } 
}

function onlyProceedWhenItemListIsAvailable(){
    var tags = JSON.parse(sessionStorage.getItem("itemList"));
    //if (the.itemList_LclJson == null) {
    if (tags == null) {
		document.getElementById("loaderRingDivId").style.display = "block";
        setTimeout(function() {
			document.getElementById("loaderRingDivId").style.display = "none";
            checkURL();
        }, 1000);
        return;
    }
}
function populateItemList() {


    //console.log(document.getElementById("cardsContainerDivId").innerHTML);

    var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rows = JSON.parse(tf);
    var innerHTML = "";
    var categoryListHTML = '<ul class="categoryListCls">';
    var itemName = "";
    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/',path.indexOf('antakshar')) + 1)
    var categorySqueezed = ""

    var defaultDisplayCount = 10;
    var categoryMaxCount = 0;
    var currDisplayCount = 0;
    
	for (var i = 0; i < rows.length; i++) {

        itemName = rows[i].songtitle;
        itemName = itemName.replaceAll(" " , "-");
        songTitleURL = myUrl + "lyrics/" + itemName;

        categorySqueezed = rows[i].category;		 
		categorySqueezed = categorySqueezed.replaceAll(' ', '')

        categoryMaxCount = sessionStorage.getItem("max-count-" + categorySqueezed);

        if (i == 0) {
            innerHTML = innerHTML + '<div id="menucardparent-' + categorySqueezed + '" class="cardsContainerDivClassPadd"  > <div class="categoryHeader" >' + rows[i].category + 
			
			 '<label class="switch categoryToggleLbl"  ><input class="toggleInput"  type="checkbox" checked data-cat="'+ rows[i].category + '"  onchange="handleShowToggle(this);" ><span class="slider round"></span></label>' +
			
			'</div>';
            //categoryListHTML = categoryListHTML + '<li>' + '<a href="#"  onclick="showCategorySongs(' + "'" + rows[i].category + "'" + ');return false;" >' + rows[i].category + '</a>' + '</li>';
            startingCharURL= myUrl + "starting/bollywood-songs-starting-with-" + rows[i].category;

            categoryListHTML = categoryListHTML + '<li>' + '<a href="' + startingCharURL + '"  >' + rows[i].category + '</a>' + '</li>';
        } else if (rows[i].category != rows[i - 1].category) {

            
            if (sessionStorage.getItem("max-count-" +  rows[i - 1].category) > defaultDisplayCount) {
                sessionStorage.setItem("display-count-" + rows[i - 1].category, defaultDisplayCount) ;
                innerHTML = innerHTML + '<div class="menucard categoryFooter ' + rows[i - 1].category + ' " >'  + 			
                '<button id="showmore-'+ rows[i - 1].category +'"  type="button" class="showmore-btn" onclick=showMoreSongs("' + rows[i - 1].category + '") >Show More</button>' +          
                '</div>';
            } else {
                sessionStorage.setItem("display-count-" + rows[i - 1].category, currDisplayCount) ;
            }

           currDisplayCount = 0;

            innerHTML = innerHTML + '</div><div id="menucardparent-' + categorySqueezed + '" class="cardsContainerDivClassPadd"  ><div class="categoryHeader">' + rows[i].category + 
			 '<label class="switch categoryToggleLbl"  ><input class="toggleInput"   type="checkbox" checked data-cat="'+ rows[i].category + '"  onchange="handleShowToggle(this);" ><span class="slider round"></span></label>' +
			'</div>';

            startingCharURL= myUrl + "starting/bollywood-songs-starting-with-" + rows[i].category;
            categoryListHTML = categoryListHTML + '<li>' + '<a href="' + startingCharURL + '"  >' + rows[i].category + '</a>' + '</li>';

            //categoryListHTML = categoryListHTML + '<li>' + '<a href="#"  onclick="showCategorySongs(' + "'" + rows[i].category + "'" + ');return false;" >' + rows[i].category + '</a>' + '</li>';
        }

		currDisplayCount = currDisplayCount + 1;

        if (currDisplayCount >= defaultDisplayCount){
            continue;
        }

        innerHTML = innerHTML + '<div class="menucard '+ categorySqueezed +'" >';

        // if (currDisplayCount < defaultDisplayCount){
        //     innerHTML = innerHTML + '<div class="menucard '+ categorySqueezed +'" >';
        // }else {
        //     innerHTML = innerHTML + '<div class="menucard '+ categorySqueezed + ' displayNone " >';
        // }
        

        innerHTML = innerHTML +  '<a href ="'+ songTitleURL +'"> <span class="songTitleSpan"  > <h2 class="songTitleH2" >' + rows[i].songtitle + '  <img class="movieImageClsMini" onerror="hideMe(this)" alt="' + rows[i].moviename + '" src="/Antaksharee/img/' + rows[i].moviename + '.png"></h2> </span> </a>' ;

        innerHTML = innerHTML + '<div id = "hiddenDiv' + i + '" class="hiddencontent">';
        innerHTML = innerHTML + rows[i].songlyrics;
        innerHTML = innerHTML + '</div>';

        innerHTML = innerHTML + '<div class="songTags">';
        if (rows[i].actor1 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink actor" onclick="showActorSongs(' + "'" + rows[i].actor1 + "'" + ');return false;" > <h3 class="songTagH3" >' + rows[i].actor1 + '</h3></a>';
        }

        if (rows[i].actor2 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink actor" onclick="showActorSongs(' + "'" + rows[i].actor2 + "'" + ');return false;" > <h3 class="songTagH3" >' + rows[i].actor2 + '</h3></a>';
        }

        if (rows[i].actor3 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink actor" onclick="showActorSongs(' + "'" + rows[i].actor3 + "'" + ');return false;" > <h3 class="songTagH3" >' + rows[i].actor3 + '</h3></a>';
        }

        if (rows[i].singer != "") {

            singerURL= myUrl + "singer/bollywood-songs-of-singer-" + rows[i].singer.replaceAll(" " , "-");;
            innerHTML = innerHTML + '<a href="' + singerURL + '" class="songTagLink singer"> <h3 class="songTagH3" >' + rows[i].singer + '</h3></a>';

            //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showSingerSongs(' + "'" + rows[i].singer + "'" + ');return false;" >' + rows[i].singer + '</a>';
        }

        if (rows[i].singer2 != "") {
            singerURL= myUrl + "singer/bollywood-songs-of-singer-" + rows[i].singer2.replaceAll(" " , "-");;
            //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showSingerSongs(' + "'" + rows[i].singer2 + "'" + ');return false;" >' + rows[i].singer2 + '</a>';
            innerHTML = innerHTML + '<a href="'+ singerURL +'" class="songTagLink singer" > <h3 class="songTagH3" >' + rows[i].singer2 + '</h3></a>';

        }

        if (rows[i].songwriter != "") {
            writerURL= myUrl + "writer/bollywood-songs-of-writer-" + rows[i].songwriter.replaceAll(" " , "-");;

            //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showWriterSongs(' + "'" + rows[i].songwriter + "'" + ');return false;" >' + rows[i].songwriter + '</a>';
            innerHTML = innerHTML + '<a href="'+writerURL+'" class="songTagLink singer" > <h3 class="songTagH3" >' + rows[i].songwriter + '</h3></a>';

        }

        if (rows[i].musiccomposer != "") {
            musicURL= myUrl + "music/bollywood-songs-of-" + rows[i].musiccomposer.replaceAll(" " , "-");;

            //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showMusicComposerSongs(' + "'" + rows[i].musiccomposer + "'" + ');return false;" >' + rows[i].musiccomposer + '</a>';
            innerHTML = innerHTML + '<a href="'+musicURL+'" class="songTagLink singer" );return false;" ><h3 class="songTagH3" >' + rows[i].musiccomposer + '</h3></a>';

        }


        if (rows[i].moviename != "") {
            movieURL= myUrl + "movie/bollywood-songs-of-movie-" + rows[i].moviename.replaceAll(" " , "-");;

            // innerHTML = innerHTML + '<a href="#" class="songTagLink movie" onclick="showMovieSongs(' + "'" + rows[i].moviename + "'" + ');return false;" >' + rows[i].moviename + '</a>';
            innerHTML = innerHTML + '<a href="' + movieURL + '" class="songTagLink movie" ><h3 class="songTagH3" >' + rows[i].moviename + '</h3></a>';

        }

        if (rows[i].year != "") {
			if (rows[i].year != "0") {
				innerHTML = innerHTML + '<a href="#" class="songTagLink year" onclick="return false;" ><h3 class="songTagH3" >' + rows[i].year + '</h3></a>';
			}
        }

        if (rows[i].songgenre1 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink genre" onclick="showGenreSongs(' + "'" + rows[i].songgenre1 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].songgenre1 + '</h3></a>';
        }

        if (rows[i].songgenre2 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink genre" onclick="showGenreSongs(' + "'" + rows[i].songgenre2 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].songgenre2 + '</h3></a>';
        }
        var tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
        var lovedsongs = "";
        var starsongs = "";
        var checkedsongs = "";
        var loveditemFound = 0;
        var staritemFound = 0;
        var checkeditemFound = 0;
        var itemId = rows[i].itemid;

        if (tags == null){
        }else {
            lovedsongs = tags[0].lovedsongs ;
            starsongs = tags[0].starsongs ;
            checkedsongs = tags[0].checkedsongs ;
    
            if (lovedsongs != null){
                songsArr = lovedsongs.split(',') ;
                for (t = 0; t < songsArr.length; t++){
                    if (songsArr[t] == itemId){
                        loveditemFound = 1;
                    }
                } 
            }        
            if (starsongs != null){
                songsArr = starsongs.split(',') ;
                for (t = 0; t < songsArr.length; t++){
                    if (songsArr[t] == itemId){
                        staritemFound = 1;
                    }
                } 
            }    

            if (checkedsongs != null){
                songsArr = checkedsongs.split(',') ;
                for (t = 0; t < songsArr.length; t++){
                    if (songsArr[t] == itemId){
                        checkeditemFound = 1;
                    }
                } 
            }  

        }

        innerHTML = innerHTML + '<div class="tagDivClass">';

        if (loveditemFound == 1){
            innerHTML = innerHTML + '<i class="iconhover fa fa-heart tagStyleRedB"  id="heart-'+ rows[i].itemid +'" onclick="toggleToMyLoved('+ rows[i].itemid +');" ></i> ';
        }else {
            innerHTML = innerHTML + '<i class="iconhover fa fa-heart-o fa-heart tagStyleRedB"  id="heart-'+ rows[i].itemid +'" onclick="toggleToMyLoved('+ rows[i].itemid +');" ></i> ';
        }

        if (staritemFound == 1){
            innerHTML = innerHTML + '<i class="iconhover fa fa-star tagStyleOrangeB"  id="star-'+ rows[i].itemid +'" onclick="toggleToMyStar('+ rows[i].itemid +');" ></i> ';
        }else {
            innerHTML = innerHTML + '<i class="iconhover fa fa-star-o fa-star tagStyleOrangeB"  id="star-'+ rows[i].itemid +'" onclick="toggleToMyStar('+ rows[i].itemid +');" ></i> ';
        }

        if (checkeditemFound == 1){
            innerHTML = innerHTML + '<i class="iconhover fa fa-bell tagStylePurpleB"  id="checked-'+ rows[i].itemid +'" onclick="toggleToMyChecked('+ rows[i].itemid +');" ></i> ';
        }else {
            innerHTML = innerHTML + '<i class="iconhover fa fa-bell-o fa-bell tagStylePurpleB" id="checked-'+ rows[i].itemid +'" onclick="toggleToMyChecked('+ rows[i].itemid +');" ></i> ';
        }

        innerHTML = innerHTML + '</div>';

        innerHTML = innerHTML + '</div>';


	
        innerHTML = innerHTML + '</div>';
		
        if (i == rows.length - 1) {
            innerHTML = innerHTML + '</div>';
        }

    }
    if (sessionStorage.getItem("max-count-" +  categorySqueezed) > defaultDisplayCount) {
        sessionStorage.setItem("display-count-" + categorySqueezed, defaultDisplayCount) ;
        innerHTML = innerHTML + '<div class="menucard categoryFooter '+ categorySqueezed + ' " >'  + 			
        '<button id="showmore-"'+ rows[i - 1].category +' type="button" class="showmore-btn" onclick=showMoreSongs("' + categorySqueezed + '") >Show More</button>' +          
        '</div>';
    }else {
        sessionStorage.setItem("display-count-" + categorySqueezed, currDisplayCount) ;
    }

    innerHTML = innerHTML + '</div>';
    document.getElementById("cardsContainerDivId").innerHTML = innerHTML;
    categoryListHTML = categoryListHTML + '</ul>';
    document.getElementById("categoryListDivId").innerHTML = categoryListHTML;
}


function toggleToMyStar(itemId){
    x = document.getElementById("star-" + itemId);
    x.classList.toggle("fa-star-o");
    tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
    var lovedsongs = "";
    var starsongs = "";
    var checkedsongs = "";
    if (tags == null){
        starsongs = itemId + ",";
    }else {
        lovedsongs = tags[0].lovedsongs ;
        starsongs = tags[0].starsongs ;
        checkedsongs = tags[0].checkedsongs ;

        if (starsongs == null){
            starsongs = itemId + ",";
        } else {
            var itemFound = 0;
            var newstarsongs = "";
            songsArr = starsongs.split(',') ;
            for (i = 0; i < songsArr.length; i++){
                if (songsArr[i] == ""){
                    continue;
                }
                if (songsArr[i] == itemId){
                    itemFound = 1;
                } else {
                    if (i == songsArr.length -1 ){
                        newstarsongs = newstarsongs + songsArr[i] ;
                    }else {
                        newstarsongs = newstarsongs + songsArr[i] + ",";
                    }
                    
                }
            } 
            if (itemFound == 0){
                if (newstarsongs == "") {
                    newstarsongs = newstarsongs + itemId + ","
                } else {
                    newstarsongs = newstarsongs + "," + itemId + ","
                }

            }
            starsongs = newstarsongs;
        }        
    }
    var songList = [{ 'lovedsongs': lovedsongs, 'starsongs': starsongs, 'checkedsongs': checkedsongs }];  
    sessionStorage.setItem("savedSongsList", JSON.stringify(songList)) ;
    UpdateSavedSongsList();
}
function toggleToMyLoved(itemId){
    x = document.getElementById("heart-" + itemId);
    x.classList.toggle("fa-heart-o");
    tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
    var lovedsongs = "";
    var starsongs = "";
    var checkedsongs = "";
    if (tags == null){
        lovedsongs = itemId + ",";
        UpdateLoveCount(itemId);
    }else {
        lovedsongs = tags[0].lovedsongs ;
        starsongs = tags[0].starsongs ;
        checkedsongs = tags[0].checkedsongs ;

        if (lovedsongs == null){
            lovedsongs = itemId + ",";
            UpdateLoveCount(itemId);
        } else {
            var itemFound = 0;
            var newLovedSongs = "";
            songsArr = lovedsongs.split(',') ;
            for (i = 0; i < songsArr.length; i++){
                if (songsArr[i] == ""){
                    continue;
                }
                if (songsArr[i] == itemId){
                    itemFound = 1;
                } else {
                    if (i == songsArr.length - 1){
                        newLovedSongs = newLovedSongs + songsArr[i] ;
                    }else {
                        newLovedSongs = newLovedSongs + songsArr[i] + ",";
                    }
                    
                }
            } 
            if (itemFound == 0){                
                if (newLovedSongs == "") {
                    newLovedSongs = newLovedSongs + itemId + ","
                } else {
                    newLovedSongs = newLovedSongs + "," + itemId + ","
                }
                UpdateLoveCount(itemId);
                
            }
            lovedsongs = newLovedSongs;
        }        
    }
    var songList = [{ 'lovedsongs': lovedsongs, 'starsongs': starsongs, 'checkedsongs': checkedsongs }];  
    sessionStorage.setItem("savedSongsList", JSON.stringify(songList)) ;
    UpdateSavedSongsList();
    
    
}


function toggleToMyChecked(itemId){
    x = document.getElementById("checked-" + itemId);
    x.classList.toggle("fa-bell-o");
    tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
    var lovedsongs = "";
    var starsongs = "";
    var checkedsongs = "";
    if (tags == null){
        checkedsongs = itemId + ",";
    }else {
        lovedsongs = tags[0].lovedsongs ;
        starsongs = tags[0].starsongs ;
        checkedsongs = tags[0].checkedsongs ;

        if (checkedsongs == null){
            checkedsongs = itemId + ",";
        } else {
            var itemFound = 0;
            var newcheckedsongs = "";
            songsArr = checkedsongs.split(',') ;
            for (i = 0; i < songsArr.length; i++){
                if (songsArr[i] == ""){
                    continue;
                }                
                if (songsArr[i] == itemId){
                    itemFound = 1;
                } else {
                    if (i == songsArr.length -1 ){
                        newcheckedsongs = newcheckedsongs + songsArr[i] ;
                    }else {
                        newcheckedsongs = newcheckedsongs + songsArr[i] + ",";
                    }
                    
                }
            } 
            if (itemFound == 0){
                if (newcheckedsongs == "") {
                    newcheckedsongs = newcheckedsongs + itemId + ","
                } else {
                    newcheckedsongs = newcheckedsongs + "," + itemId + ","
                } 

            }
            checkedsongs = newcheckedsongs;
        }        
    }
    var songList = [{ 'lovedsongs': lovedsongs, 'starsongs': starsongs, 'checkedsongs': checkedsongs }];  
    sessionStorage.setItem("savedSongsList", JSON.stringify(songList)) ;
    UpdateSavedSongsList();
    
}

function setCollapsible(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("callapseactive");
        //var content = this.nextSibling;
        var butnid = this.id;
        var hiddenDivId = butnid.replace('collapse','hidden');

        //var content = this.nextElementSibling;
        var content = document.getElementById(hiddenDivId)
        if (content.style.maxHeight){
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        } 
    });
    }    
}

function goToPage(itemid){
    var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rows = JSON.parse(tf);
    var itemName = "";
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].itemid == itemid) {
            itemName = rows[i].songtitle;
            break;
        }
    }
    itemName = itemName.replaceAll(" " , "-");

    myUrl = window.location.protocol + "//" + window.location.host +
    window.location.pathname + "lyrics/" + itemName;
    window.location.href = myUrl;
}

function goToHome(){


    //var path = window.location.pathname;
    //myUrl = path.substring(0, path.indexOf('/',path.indexOf('antakshar'))) + "?target=home";

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/',path.indexOf('antakshar')) + 1)
    myUrl = myUrl +"?target=home";

    window.location.href = myUrl;
}

function goToContactUs(){
    // var path = window.location.pathname;
    // if (path.indexOf('lyrics/') > 0) {
    //     path = path.substring(0, path.indexOf('lyrics/'));
    //     path = path + "?target=contactus"        
    // } else {
    //     path = path + "?target=contactus" 
    // }

    // myUrl = window.location.protocol + "//" + window.location.host + path;
    // window.location.href = myUrl;

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/',path.indexOf('antakshar')) + 1)
    myUrl = myUrl +"?target=contactus";

    window.location.href = myUrl;

}

function goToLogin(){
    // var path = window.location.pathname;
    // if (path.indexOf('lyrics/') > 0) {
    //     path = path.substring(0, path.indexOf('lyrics/'));
    //     path = path + "?target=login"        
    // } else {
    //     path = path + "?target=login" 
    // }

    // myUrl = window.location.protocol + "//" + window.location.host + path;
    // window.location.href = myUrl;

    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/',path.indexOf('antakshar')) + 1)
    myUrl = myUrl +"?target=login";

    window.location.href = myUrl;
}

function handleShowToggle (checkbox){
	var categorySqueezed = checkbox.dataset.cat;
	categorySqueezed = categorySqueezed.replaceAll(' ', '');
	
	var catCards = document.getElementsByClassName(categorySqueezed);
	
	if(checkbox.checked == false){
        //document.getElementsByClassName('appBanner')[0].style.visibility = 'hidden';	

		for (var i = 0; i < catCards.length; i ++) {
			//if (i > 1){
			catCards[i].style.display = 'none';
			//}
		}		
    }else{
		for (var i = 0; i < catCards.length; i ++) {
			//if (i > 1){
			catCards[i].style.display = 'block';
			//}
		}
	}
}


function showMoreSongs(category){
    var defaultDisplayCount = 10;
    var currDisplayCount = parseInt(sessionStorage.getItem("display-count-" + category));
    var categoryMaxCount = parseInt(sessionStorage.getItem("max-count-" + category));

    var itemName = "";
    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/',path.indexOf('antakshar')) + 1)
    var categorySqueezed = ""


    // var tf = JSON.parse(sessionStorage.getItem("itemList"));
    // var rowsTemp = JSON.parse(tf);
    // var rows = rowsTemp.filter(entry => entry.category == category );




    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "getCategoryItems",
            category: category,
            count: currDisplayCount + defaultDisplayCount + 1
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {
            rows = JSON.parse(response);

            var innerHTML = "";

            if (currDisplayCount >= categoryMaxCount){
                document.getElementById(btnId).style.display  = 'none';
                return;
            }
        
            innerHTML = innerHTML + '<div class="categoryHeader" >' + category + 
                    
            '<label class="switch categoryToggleLbl"  ><input class="toggleInput"  type="checkbox" checked data-cat="'+ category + '"  onchange="handleShowToggle(this);" ><span class="slider round"></span></label>' +
           
           '</div>';
        
            for (var i = 0; i < rows.length; i++) {
                itemName = rows[i].songtitle;
                itemName = itemName.replaceAll(" " , "-");
                songTitleURL = myUrl + "lyrics/" + itemName;
        
                categorySqueezed = rows[i].category;		 
                categorySqueezed = categorySqueezed.replaceAll(' ', '')
        
                if (i-currDisplayCount >= defaultDisplayCount){
                    break;
                }
        
                innerHTML = innerHTML + '<div class="menucard '+ categorySqueezed +'" >';
                innerHTML = innerHTML +  '<a href ="'+ songTitleURL +'"> <span class="songTitleSpan"  > <h2 class="songTitleH2" >' + rows[i].songtitle + '<img class="movieImageClsMini" onerror="hideMe(this)" alt="' + rows[i].moviename + '" src="/Antaksharee/img/' + rows[i].moviename + '.png"></h2></span> </a>' ;
        
                innerHTML = innerHTML + '<div id = "hiddenDiv' + i + '" class="hiddencontent">';
                innerHTML = innerHTML + rows[i].songlyrics;
                innerHTML = innerHTML + '</div>';
        
                innerHTML = innerHTML + '<div class="songTags">';
                if (rows[i].actor1 != "") {
                    innerHTML = innerHTML + '<a href="#" class="songTagLink actor" onclick="showActorSongs(' + "'" + rows[i].actor1 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].actor1 + '</h3></a>';
                }
        
                if (rows[i].actor2 != "") {
                    innerHTML = innerHTML + '<a href="#" class="songTagLink actor" onclick="showActorSongs(' + "'" + rows[i].actor2 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].actor2 + '</h3></a>';
                }
        
                if (rows[i].actor3 != "") {
                    innerHTML = innerHTML + '<a href="#" class="songTagLink actor" onclick="showActorSongs(' + "'" + rows[i].actor3 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].actor3 + '</h3></a>';
                }
        
                if (rows[i].singer != "") {
        
                    singerURL= myUrl + "singer/bollywood-songs-of-singer-" + rows[i].singer.replaceAll(" " , "-");;
                    innerHTML = innerHTML + '<a href="' + singerURL + '" class="songTagLink singer"><h3 class="songTagH3" >' + rows[i].singer + '</h3></a>';
        
                    //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showSingerSongs(' + "'" + rows[i].singer + "'" + ');return false;" >' + rows[i].singer + '</a>';
                }
        
                if (rows[i].singer2 != "") {
                    singerURL= myUrl + "singer/bollywood-songs-of-singer-" + rows[i].singer2.replaceAll(" " , "-");;
                    //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showSingerSongs(' + "'" + rows[i].singer2 + "'" + ');return false;" >' + rows[i].singer2 + '</a>';
                    innerHTML = innerHTML + '<a href="'+ singerURL +'" class="songTagLink singer" ><h3 class="songTagH3" >' + rows[i].singer2 + '</h3></a>';
        
                }
        
                if (rows[i].songwriter != "") {
                    writerURL= myUrl + "writer/bollywood-songs-of-writer-" + rows[i].songwriter.replaceAll(" " , "-");;
        
                    //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showWriterSongs(' + "'" + rows[i].songwriter + "'" + ');return false;" >' + rows[i].songwriter + '</a>';
                    innerHTML = innerHTML + '<a href="'+writerURL+'" class="songTagLink singer" ><h3 class="songTagH3" >' + rows[i].songwriter + '</h3></a>';
        
                }
        
                if (rows[i].musiccomposer != "") {
                    musicURL= myUrl + "music/bollywood-songs-of-" + rows[i].musiccomposer.replaceAll(" " , "-");;
        
                    //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showMusicComposerSongs(' + "'" + rows[i].musiccomposer + "'" + ');return false;" >' + rows[i].musiccomposer + '</a>';
                    innerHTML = innerHTML + '<a href="'+musicURL+'" class="songTagLink singer" );return false;" ><h3 class="songTagH3" >' + rows[i].musiccomposer + '</h3></a>';
        
                }
        
        
                if (rows[i].moviename != "") {
                    movieURL= myUrl + "movie/bollywood-songs-of-movie-" + rows[i].moviename.replaceAll(" " , "-");;
        
                    // innerHTML = innerHTML + '<a href="#" class="songTagLink movie" onclick="showMovieSongs(' + "'" + rows[i].moviename + "'" + ');return false;" >' + rows[i].moviename + '</a>';
                    innerHTML = innerHTML + '<a href="' + movieURL + '" class="songTagLink movie" ><h3 class="songTagH3" >' + rows[i].moviename + '</h3></a>';
        
                }
        
                if (rows[i].year != "") {
					if (rows[i].year != "0") {
						innerHTML = innerHTML + '<a href="#" class="songTagLink year" onclick="return false;" ><h3 class="songTagH3" >' + rows[i].year + '</h3></a>';
					}
                }
        
                if (rows[i].songgenre1 != "") {
                    innerHTML = innerHTML + '<a href="#" class="songTagLink genre" onclick="showGenreSongs(' + "'" + rows[i].songgenre1 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].songgenre1 + '</h3></a>';
                }
        
                if (rows[i].songgenre2 != "") {
                    innerHTML = innerHTML + '<a href="#" class="songTagLink genre" onclick="showGenreSongs(' + "'" + rows[i].songgenre2 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].songgenre2 + '</h3></a>';
                }
                var tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
                var lovedsongs = "";
                var starsongs = "";
                var checkedsongs = "";
                var loveditemFound = 0;
                var staritemFound = 0;
                var checkeditemFound = 0;
                var itemId = rows[i].itemid;
        
                if (tags == null){
                }else {
                    lovedsongs = tags[0].lovedsongs ;
                    starsongs = tags[0].starsongs ;
                    checkedsongs = tags[0].checkedsongs ;
            
                    if (lovedsongs != null){
                        songsArr = lovedsongs.split(',') ;
                        for (t = 0; t < songsArr.length; t++){
                            if (songsArr[t] == itemId){
                                loveditemFound = 1;
                            }
                        } 
                    }        
                    if (starsongs != null){
                        songsArr = starsongs.split(',') ;
                        for (t = 0; t < songsArr.length; t++){
                            if (songsArr[t] == itemId){
                                staritemFound = 1;
                            }
                        } 
                    }    
        
                    if (checkedsongs != null){
                        songsArr = checkedsongs.split(',') ;
                        for (t = 0; t < songsArr.length; t++){
                            if (songsArr[t] == itemId){
                                checkeditemFound = 1;
                            }
                        } 
                    }  
        
                }

                innerHTML = innerHTML + '<div class="tagDivClass">';

                if (loveditemFound == 1){
                    innerHTML = innerHTML + '<i class="iconhover fa fa-heart tagStyleRedB"  id="heart-'+ rows[i].itemid +'" onclick="toggleToMyLoved('+ rows[i].itemid +');" ></i> ';
                }else {
                    innerHTML = innerHTML + '<i class="iconhover fa fa-heart-o fa-heart tagStyleRedB"  id="heart-'+ rows[i].itemid +'" onclick="toggleToMyLoved('+ rows[i].itemid +');" ></i> ';
                }
        
                if (staritemFound == 1){
                    innerHTML = innerHTML + '<i class="iconhover fa fa-star tagStyleOrangeB"  id="star-'+ rows[i].itemid +'" onclick="toggleToMyStar('+ rows[i].itemid +');" ></i> ';
                }else {
                    innerHTML = innerHTML + '<i class="iconhover fa fa-star-o fa-star tagStyleOrangeB"  id="star-'+ rows[i].itemid +'" onclick="toggleToMyStar('+ rows[i].itemid +');" ></i> ';
                }
        
                if (checkeditemFound == 1){
                    innerHTML = innerHTML + '<i class="iconhover fa fa-bell tagStylePurpleB"  id="checked-'+ rows[i].itemid +'" onclick="toggleToMyChecked('+ rows[i].itemid +');" ></i> ';
                }else {
                    innerHTML = innerHTML + '<i class="iconhover fa fa-bell-o fa-bell tagStylePurpleB" id="checked-'+ rows[i].itemid +'" onclick="toggleToMyChecked('+ rows[i].itemid +');" ></i> ';
                }
                
                innerHTML = innerHTML + '</div>';

                innerHTML = innerHTML + '</div>';
        
        
            
                innerHTML = innerHTML + '</div>';
                
                if (i == rows.length - 1) {
                    innerHTML = innerHTML + '</div>';
                }
        
        
            }
        
            var btnId = "showmore-" + category ;
        
            if (i < categoryMaxCount){
                innerHTML = innerHTML + '<div class="menucard categoryFooter '+ categorySqueezed + ' " >'  + 			
                '<button id="showmore-"'+ rows[i - 1].category +' type="button" class="showmore-btn" onclick=showMoreSongs("' + categorySqueezed + '") >Show More</button>' +          
                '</div>';
            }
        
            var parentId = "menucardparent-" + categorySqueezed ;
        
            document.getElementById(parentId).innerHTML = innerHTML;   
        
            sessionStorage.setItem("display-count-" + category,  i);
        




        },
        error: function(xhr, status, error) {

        }
    });








}

function showMoreSongs_Old(category){
    var defaultDisplayCount = 10;
    var currDisplayCount = parseInt(sessionStorage.getItem("display-count-" + category));
    var categoryMaxCount = parseInt(sessionStorage.getItem("max-count-" + category));

    var btnId = "showmore-" + category ;
    if (currDisplayCount >= categoryMaxCount){
        document.getElementById(btnId).style.display  = 'none';
        return;
    }

    var catCards = document.getElementsByClassName(category);
    for (var i = 0; i < catCards.length; i ++) {
        if (i-currDisplayCount < defaultDisplayCount){
            catCards[i].style.display = 'block';
        }else {
            break;
        }
    }
    sessionStorage.setItem("display-count-" + category,  i);

    if (i >= categoryMaxCount){
        document.getElementById(btnId).style.display  = 'none';
        return;
    }

}

function searchItem(itemToSearchOrig) {
    if (itemToSearchOrig == undefined) {
        itemToSearchOrig = document.getElementById("searchProductTextId").value;
    }

    var itemToSearch = itemToSearchOrig.trim();

    itemToSearch = itemToSearch.toUpperCase();

    var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rows = JSON.parse(tf).filter(function(entry) {
        var songtitle = entry.songtitle;
        songtitle = songtitle.toUpperCase();

        var actor1 = entry.actor1;
        if (actor1 == null) {
            actor1 = "";
        }
        actor1 = actor1.toUpperCase();

        var actor2 = entry.actor2;
        if (actor2 == null) {
            actor2 = "";
        }
        actor2 = actor2.toUpperCase();

        var actor3 = entry.actor3;
        actor3 = actor3.toUpperCase();
        if (actor3 == null) {
            actor3 = "";
        }

        var singer1 = entry.singer;
        if (singer1 == null) {
            singer1 = "";
        }
        singer1 = singer1.toUpperCase();

        var singer2 = entry.singer2;
        if (singer2 == null) {
            singer2 = "";
        }
        singer2 = singer2.toUpperCase();

        var songwriter = entry.songwriter;
        if (songwriter == null) {
            songwriter = "";
        }
        songwriter = songwriter.toUpperCase();

        var musiccomposer = entry.musiccomposer;
        if (musiccomposer == null) {
            musiccomposer = "";
        }
        musiccomposer = musiccomposer.toUpperCase();



        var moviename = entry.moviename;
        if (moviename == null) {
            moviename = "";
        }
        moviename = moviename.toUpperCase();

        return songtitle.includes(itemToSearch) || actor1.includes(itemToSearch) || actor2.includes(itemToSearch) || actor3.includes(itemToSearch) || singer1.includes(itemToSearch) || singer2.includes(itemToSearch) || musiccomposer.includes(itemToSearch) || songwriter.includes(itemToSearch) || moviename.includes(itemToSearch);
    });
    message = "Songs related to searched text '" + itemToSearch + "' are listed below";
    showFilteredItems(rows, message);
}

function showActorSongs(itemToSearch){
    itemToSearch = itemToSearch.toUpperCase();
     var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);

    var rows = rowsTemp.filter(function(entry) {

        var actor1 = entry.actor1;
        if (actor1 == null) {
            actor1 = "";
        }
        actor1 = actor1.toUpperCase();

        var actor2 = entry.actor2;
        if (actor2 == null) {
            actor2 = "";
        }
        actor2 = actor2.toUpperCase();

        var actor3 = entry.actor3;
        actor3 = actor3.toUpperCase();
        if (actor3 == null) {
            actor3 = "";
        }

        var singer1 = entry.singer1;
        if (singer1 == null) {
            singer1 = "";
        }
        singer1 = singer1.toUpperCase();

        var singer2 = entry.singer2;
        if (singer2 == null) {
            singer2 = "";
        }
        singer2 = singer2.toUpperCase();

        var moviename = entry.moviename;
        if (moviename == null) {
            moviename = "";
        }
        moviename = moviename.toUpperCase();
        return  actor1.includes(itemToSearch) || actor2.includes(itemToSearch) || actor3.includes(itemToSearch) ;

        //return songtitle.includes(itemToSearch) || actor1.includes(itemToSearch) || actor2.includes(itemToSearch) || actor3.includes(itemToSearch) || singer1.includes(itemToSearch) || singer2.includes(itemToSearch) || moviename.includes(itemToSearch);
    }); 
    
    message = "Songs under the selected artist '"+ itemToSearch +"' are listed below";
    showFilteredItems(rows, message);        
}

function showSingerSongs(itemToSearch){
    itemToSearch = itemToSearch.toUpperCase();
     var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);

    var rows = rowsTemp.filter(function(entry) {

        var actor1 = entry.actor1;
        if (actor1 == null) {
            actor1 = "";
        }
        actor1 = actor1.toUpperCase();

        var actor2 = entry.actor2;
        if (actor2 == null) {
            actor2 = "";
        }
        actor2 = actor2.toUpperCase();

        var actor3 = entry.actor3;
        actor3 = actor3.toUpperCase();
        if (actor3 == null) {
            actor3 = "";
        }

        var singer1 = entry.singer;
        if (singer1 == null) {
            singer1 = "";
        }
        singer1 = singer1.toUpperCase();

        var singer2 = entry.singer2;
        if (singer2 == null) {
            singer2 = "";
        }
        singer2 = singer2.toUpperCase();

        var moviename = entry.moviename;
        if (moviename == null) {
            moviename = "";
        }
        moviename = moviename.toUpperCase();
        return  singer1.includes(itemToSearch) || singer2.includes(itemToSearch)  ;

        //return songtitle.includes(itemToSearch) || actor1.includes(itemToSearch) || actor2.includes(itemToSearch) || actor3.includes(itemToSearch) || singer1.includes(itemToSearch) || singer2.includes(itemToSearch) || moviename.includes(itemToSearch);
    }); 
    
    message = "Songs under the selected artist '"+ itemToSearch +"' are listed below";
    showFilteredItems(rows, message);        
}



function showWriterSongs(itemToSearch){
    itemToSearch = itemToSearch.toUpperCase();
     var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);

    var rows = rowsTemp.filter(function(entry) {

        var songwriter = entry.songwriter;
        if (songwriter == null) {
            songwriter = "";
        }
        songwriter = songwriter.toUpperCase();

        var moviename = entry.moviename;
        if (moviename == null) {
            moviename = "";
        }
        moviename = moviename.toUpperCase();
        return  songwriter.includes(itemToSearch)  ;

    }); 
    
         
    message = "Songs under the selected artist '"+ itemToSearch +"' are listed below"; 
    showFilteredItems(rows, message);  
}

function showMusicComposerSongs(itemToSearch){
    itemToSearch = itemToSearch.toUpperCase();
     var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);

    var rows = rowsTemp.filter(function(entry) {

        var musiccomposer = entry.musiccomposer;
        if (musiccomposer == null) {
            musiccomposer = "";
        }
        musiccomposer = musiccomposer.toUpperCase();

        var moviename = entry.moviename;
        if (moviename == null) {
            moviename = "";
        }
        moviename = moviename.toUpperCase();
        return  musiccomposer.includes(itemToSearch)  ;

    }); 
    
    message = "Songs under the selected artist '"+ itemToSearch +"' are listed below"; 
    showFilteredItems(rows, message); 
          
}


function showGenreSongs(itemToSearch){
    itemToSearch = itemToSearch.toUpperCase();
     var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);

    var rows = rowsTemp.filter(function(entry) {

        var actor1 = entry.actor1;
        if (actor1 == null) {
            actor1 = "";
        }
        actor1 = actor1.toUpperCase();

        var actor2 = entry.actor2;
        if (actor2 == null) {
            actor2 = "";
        }
        actor2 = actor2.toUpperCase();

        var actor3 = entry.actor3;
        actor3 = actor3.toUpperCase();
        if (actor3 == null) {
            actor3 = "";
        }

        var genre1 = entry.songgenre1;
        if (genre1 == null) {
            genre1 = "";
        }
        genre1 = genre1.toUpperCase();

        var genre2 = entry.songgenre2;
        if (genre2 == null) {
            genre2 = "";
        }
        genre2 = genre2.toUpperCase();

        return  genre1.includes(itemToSearch) || genre2.includes(itemToSearch)  ;

        //return songtitle.includes(itemToSearch) || actor1.includes(itemToSearch) || actor2.includes(itemToSearch) || actor3.includes(itemToSearch) || singer1.includes(itemToSearch) || singer2.includes(itemToSearch) || moviename.includes(itemToSearch);
    }); 
 
    message = "Songs under the selected genre '"+ itemToSearch +"' are listed below";
    showFilteredItems(rows, message);        
    
}
function showMovieSongs(itemToSearch){
    itemToSearch = itemToSearch.toUpperCase();
     var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);

    var rows = rowsTemp.filter(function(entry) {

        var actor1 = entry.actor1;
        if (actor1 == null) {
            actor1 = "";
        }
        actor1 = actor1.toUpperCase();

        var actor2 = entry.actor2;
        if (actor2 == null) {
            actor2 = "";
        }
        actor2 = actor2.toUpperCase();

        var actor3 = entry.actor3;
        actor3 = actor3.toUpperCase();
        if (actor3 == null) {
            actor3 = "";
        }

        var singer1 = entry.singer;
        if (singer1 == null) {
            singer1 = "";
        }
        singer1 = singer1.toUpperCase();

        var singer2 = entry.singer2;
        if (singer2 == null) {
            singer2 = "";
        }
        singer2 = singer2.toUpperCase();

        var moviename = entry.moviename;
        if (moviename == null) {
            moviename = "";
        }
        moviename = moviename.toUpperCase();
        return  moviename.includes(itemToSearch)   ;

        //return songtitle.includes(itemToSearch) || actor1.includes(itemToSearch) || actor2.includes(itemToSearch) || actor3.includes(itemToSearch) || singer1.includes(itemToSearch) || singer2.includes(itemToSearch) || moviename.includes(itemToSearch);
    }); 
 
    message = "Songs under the selected movie '"+ itemToSearch +"' are listed below";    
    showFilteredItems(rows, message); 
       
}

function showMyLovedSongs(){
    var tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
    var lovedsongs = "";
    var starsongs = "";
    var checkedsongs = "";

    var songsArr = [];

    if (tags == null){
    }else {
        lovedsongs = tags[0].lovedsongs ;
        starsongs = tags[0].starsongs ;
        checkedsongs = tags[0].checkedsongs ;

        if (lovedsongs != null){
            songsArr = lovedsongs.split(',') ;
        }        
    }
    var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);
    var rows = rowsTemp.filter(entry => songsArr.includes(entry.itemid));  
    message = "Songs tagged with heart are listed below";     
    showFilteredItems(rows, message);
    
    //showToast("Filter applied");
}

function showMystarsongs(){
    var tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
    var lovedsongs = "";
    var starsongs = "";
    var checkedsongs = "";

    var songsArr = [];

    if (tags == null){
    }else {
        lovedsongs = tags[0].lovedsongs ;
        starsongs = tags[0].starsongs ;
        checkedsongs = tags[0].checkedsongs ;

        if (starsongs != null){
            songsArr = starsongs.split(',') ;
        }        
    }
    var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);
    var rows = rowsTemp.filter(entry => songsArr.includes(entry.itemid));    
    message = "Songs tagged with star are listed below";   
    showFilteredItems(rows, message);
    
}

function showMycheckedsongs(){
    var tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
    var lovedsongs = "";
    var starsongs = "";
    var checkedsongs = "";

    var songsArr = [];

    if (tags == null){
    }else {
        lovedsongs = tags[0].lovedsongs ;
        starsongs = tags[0].starsongs ;
        checkedsongs = tags[0].checkedsongs ;

        if (checkedsongs != null){
            songsArr = checkedsongs.split(',') ;
        }        
    }
    var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);
    var rows = rowsTemp.filter(entry => songsArr.includes(entry.itemid));   
    message = "Songs tagged with checkbox are listed below";    
    showFilteredItems(rows, message);
    
}

function showSongsByYear(){
    var tags = JSON.parse(sessionStorage.getItem("savedSongsList"));

    var fromYear = document.getElementById("fromYear").value
    var toYear = document.getElementById("toYear").value

    var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);
    var rows = rowsTemp.filter(entry => entry.year >= fromYear && entry.year <= toYear );       
    message = "Songs between the selected years are listed below";
    showFilteredItems(rows, message);    
    
}

function showCategorySongs(categoryStr){
    var tags = JSON.parse(sessionStorage.getItem("savedSongsList"));

    var tf = JSON.parse(sessionStorage.getItem("itemList"));
    var rowsTemp = JSON.parse(tf);
    var rows = rowsTemp.filter(entry => entry.category == categoryStr );
    message = "Songs starting with '"+ categoryStr +"' are listed below";       
    showFilteredItems(rows, message); 
        
}
function showFilteredItems(rows){

    var innerHTML = "";
    var rowcount = rows.length;
    var itemName = "";
    var path = window.location.pathname;
    var myUrl = path.substring(0, path.indexOf('/',path.indexOf('antakshar')) + 1)

    for (var i = 0; i < rowcount; i++) {
        if (i == 0) {
            innerHTML = innerHTML + '<div class="cardsContainerDivClassPadd" > <div class="categoryHeader">' + rows[i].category + 
 
            '<label class="switch categoryToggleLbl"  ><input class="toggleInput"  type="checkbox" checked data-cat="'+ rows[i].category + '"  onchange="handleShowToggle(this);" ><span class="slider round"></span></label>' +

            '</div>';

        } else if (rows[i].category != rows[i - 1].category) {
            innerHTML = innerHTML + '</div><div class="cardsContainerDivClassPadd" ><div class="categoryHeader">' + rows[i].category + 
        
            '<label class="switch categoryToggleLbl"  ><input class="toggleInput"   type="checkbox" checked data-cat="'+ rows[i].category + '"  onchange="handleShowToggle(this);" ><span class="slider round"></span></label>' +

            '</div>';
        }

		itemName = rows[i].songtitle;
        itemName = itemName.replaceAll(" " , "-");
        lyricsUrl = myUrl + "lyrics/" + itemName;

        innerHTML = innerHTML + '<div class="menucard '+ rows[i].category +'" >';

        innerHTML = innerHTML +  '<a href ="'+ lyricsUrl +'"> <span class="songTitleSpan"   > <h2 class="songTitleH2" >' + rows[i].songtitle + '<img class="movieImageClsMini" onerror="hideMe(this)" alt="' + rows[i].moviename + '" src="/Antaksharee/img/' + rows[i].moviename + '.png"></h2></span> </a>' ;

        innerHTML = innerHTML + '<div id = "hiddenDiv' + i + '" class="hiddencontent">';
        innerHTML = innerHTML + rows[i].songlyrics;
        innerHTML = innerHTML + '</div>';

        innerHTML = innerHTML + '<div class="songTags">';
        if (rows[i].actor1 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink actor" onclick="showActorSongs(' + "'" + rows[i].actor1 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].actor1 + '</h3></a>';
        }

        if (rows[i].actor2 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink actor" onclick="showActorSongs(' + "'" + rows[i].actor2 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].actor2 + '</h3></a>';
        }

        if (rows[i].actor3 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink actor" onclick="showActorSongs(' + "'" + rows[i].actor3 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].actor3 + '</h3></a>';
        }

        if (rows[i].singer != "") {
            singerURL= myUrl + "singer/bollywood-songs-of-singer-" + rows[i].singer.replaceAll(" " , "-");;
            //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showSingerSongs(' + "'" + rows[i].singer + "'" + ');return false;" >' + rows[i].singer + '</a>';
            innerHTML = innerHTML + '<a href="' + singerURL + '" class="songTagLink singer"><h3 class="songTagH3" >' + rows[i].singer + '</h3></a>';

        }

        if (rows[i].singer2 != "") {
            singerURL= myUrl + "singer/bollywood-songs-of-singer-" + rows[i].singer2.replaceAll(" " , "-");;
            //innerHTML = innerHTML + '<a href="#" class="songTagLink singer" onclick="showSingerSongs(' + "'" + rows[i].singer2 + "'" + ');return false;" >' + rows[i].singer2 + '</a>';
            innerHTML = innerHTML + '<a href="'+ singerURL +'" class="songTagLink singer" ><h3 class="songTagH3" >' + rows[i].singer2 + '</h3></a>';
        }

        if (rows[i].moviename != "") {
            movieURL= myUrl + "movie/bollywood-songs-of-movie-" + rows[i].moviename.replaceAll(" " , "-");
            //innerHTML = innerHTML + '<a href="#" class="songTagLink movie" onclick="showMovieSongs(' + "'" + rows[i].moviename + "'" + ');return false;" >' + rows[i].moviename + '</a>';
            innerHTML = innerHTML + '<a href="' + movieURL + '" class="songTagLink movie" ><h3 class="songTagH3" >' + rows[i].moviename + '</h3></a>';
        }

        if (rows[i].year != "") {
			if (rows[i].year != "0") {
				innerHTML = innerHTML + '<a href="#" class="songTagLink year" onclick="return false;" ><h3 class="songTagH3" >' + rows[i].year + '</h3></a>';
			}
        }

        if (rows[i].songgenre1 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink genre" onclick="showGenreSongs(' + "'" + rows[i].songgenre1 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].songgenre1 + '</h3></a>';
        }

        if (rows[i].songgenre2 != "") {
            innerHTML = innerHTML + '<a href="#" class="songTagLink genre" onclick="showGenreSongs(' + "'" + rows[i].songgenre2 + "'" + ');return false;" ><h3 class="songTagH3" >' + rows[i].songgenre2 + '</h3></a>';
        }


        if (rows[i].songwriter != "") {
            writerURL= myUrl + "writer/bollywood-songs-of-writer-" + rows[i].songwriter.replaceAll(" " , "-");
            //innerHTML = innerHTML + '<a href="#" class="songTagLink genre" onclick="showWriterSongs(' + "'" + rows[i].songwriter + "'" + ');return false;" >' + rows[i].songwriter + '</a>';
            innerHTML = innerHTML + '<a href="'+writerURL+'" class="songTagLink singer" ><h3 class="songTagH3" >' + rows[i].songwriter + '</h3></a>';
        }

        if (rows[i].musiccomposer != "") {
            musicURL= myUrl + "music/bollywood-songs-of-" + rows[i].musiccomposer.replaceAll(" " , "-");
            //innerHTML = innerHTML + '<a href="#" class="songTagLink genre" onclick="showMusicComposerSongs(' + "'" + rows[i].musiccomposer + "'" + ');return false;" >' + rows[i].musiccomposer + '</a>';
            innerHTML = innerHTML + '<a href="'+musicURL+'" class="songTagLink singer" );return false;" ><h3 class="songTagH3" >' + rows[i].musiccomposer + '</h3></a>';
        }

        var tags = JSON.parse(sessionStorage.getItem("savedSongsList"));
        var lovedsongs = "";
        var starsongs = "";
        var checkedsongs = "";
        var loveditemFound = 0;
        var staritemFound = 0;
        var checkeditemFound = 0;
        var itemId = rows[i].itemid;

        if (tags == null){
        }else {
            lovedsongs = tags[0].lovedsongs ;
            starsongs = tags[0].starsongs ;
            checkedsongs = tags[0].checkedsongs ;
    
            if (lovedsongs != null){
                songsArr = lovedsongs.split(',') ;
                for (t = 0; t < songsArr.length; t++){
                    if (songsArr[t] == itemId){
                        loveditemFound = 1;
                    }
                } 
            }        
            if (starsongs != null){
                songsArr = starsongs.split(',') ;
                for (t = 0; t < songsArr.length; t++){
                    if (songsArr[t] == itemId){
                        staritemFound = 1;
                    }
                } 
            }    

            if (checkedsongs != null){
                songsArr = checkedsongs.split(',') ;
                for (t = 0; t < songsArr.length; t++){
                    if (songsArr[t] == itemId){
                        checkeditemFound = 1;
                    }
                } 
            }  

        }

        innerHTML = innerHTML + '<div class="tagDivClass">';

        if (loveditemFound == 1){
            innerHTML = innerHTML + '<i class="iconhover fa fa-heart tagStyleRedB"  id="heart-'+ rows[i].itemid +'" onclick="toggleToMyLoved('+ rows[i].itemid +');" ></i> ';
        }else {
            innerHTML = innerHTML + '<i class="iconhover fa fa-heart-o fa-heart tagStyleRedB"  id="heart-'+ rows[i].itemid +'" onclick="toggleToMyLoved('+ rows[i].itemid +');" ></i> ';
        }

        if (staritemFound == 1){
            innerHTML = innerHTML + '<i class="iconhover fa fa-star tagStyleOrangeB"  id="star-'+ rows[i].itemid +'" onclick="toggleToMyStar('+ rows[i].itemid +');" ></i> ';
        }else {
            innerHTML = innerHTML + '<i class="iconhover fa fa-star-o fa-star tagStyleOrangeB"  id="star-'+ rows[i].itemid +'" onclick="toggleToMyStar('+ rows[i].itemid +');" ></i> ';
        }

        if (checkeditemFound == 1){
            innerHTML = innerHTML + '<i class="iconhover fa fa-bell tagStylePurpleB"  id="checked-'+ rows[i].itemid +'" onclick="toggleToMyChecked('+ rows[i].itemid +');" ></i> ';
        }else {
            innerHTML = innerHTML + '<i class="iconhover fa fa-bell-o fa-bell tagStylePurpleB" id="checked-'+ rows[i].itemid +'" onclick="toggleToMyChecked('+ rows[i].itemid +');" ></i> ';
        }

        innerHTML = innerHTML + '</div>';

        innerHTML = innerHTML + '</div>';

	
        innerHTML = innerHTML + '</div>';

        if (i == rows.length - 1) {
            innerHTML = innerHTML + '</div>';
        }

    }
    innerHTML = innerHTML + '</div>';

    document.getElementById("cardsContainerDivId").innerHTML = innerHTML;

    // if (itemToSearch == "") {
    //     document.getElementById("productSearchResultsLblDiv").style.display = "none";

    // } else {
        document.getElementById("productSearchResultsLblDiv").style.display = "block";
        if (rowcount == 0) {
            document.getElementById("productSearchResultsLbl").innerHTML = "No song found for search criteria";
        } else {
            if (message != ""){
                document.getElementById("productSearchResultsLbl").innerHTML = message;
            }else {
                document.getElementById("productSearchResultsLbl").innerHTML = "Songs meeting the search criteria are listed below";
            }
            
        }
    // }

    //setCollapsible();
    //showToast("Filter applied");

	const id = 'productSearchResultsLbl';
	const yOffset = -70; 
	const element = document.getElementById(id);
	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

	window.scrollTo({top: y, behavior: 'smooth'});

}

function searchItemEntered() {
    if (event.keyCode === 13) {
        searchItem();
    }
}

function resetSearch() {
    // document.getElementById("productSearchResultsLblDiv").style.display = "none";
    // document.getElementById("searchProductTextId").value = "";
    // populateItemList();
    goToHome();
}

function activateAccount(pass) {

    $.ajax({
        url: '/antaksharee/php/process.php',
        type: 'POST',
        data: jQuery.param({
            usrfunction: "activateAcc",
            passkey: pass
        }),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(response) {

            if (response == "s") {

                document.getElementById("productDivId").style.display = "none";
                document.getElementById("contactusDivId").style.display = "none";
                document.getElementById("homeDivId").style.display = "none";
                document.getElementById("showCartDivId").style.display = "none";
                document.getElementById("addToCartModal").style.display = "none";
                document.getElementById("orderConfirmationDivId").style.display = "none";
                document.getElementById("showOrdersDivId").style.display = "none";
                document.getElementById("loginDivId").style.display = "block";
                document.getElementById("loginerrormsg").innerHTML = "";

                document.getElementById("loginSecDivId").style.display = "none";
                document.getElementById("accActivatedDivId").style.display = "block";

            } else {
                //console.log("Failed to activate account");
            }
        },
        error: function() {
            //console.log("Failed to activate account");
        }
    });
}

function showModal() {
    if (localStorage.getItem("userLoggedIn") == "y") {
        document.getElementById("checkOutDivId").style.display = "block";
        document.getElementById("checkoutusername").style.display = "none";
        //document.getElementById("checkoutemailid").value = localStorage.getItem("userEmail");
        document.getElementById("checkoutemailid").value = getCookie("cookname");

        //var elmnt = document.getElementById("checkoutLabel");
        //elmnt.scrollIntoView();

		const id = 'checkoutLabel';
		const yOffset = -50; 
		const element = document.getElementById(id);
		const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

		window.scrollTo({top: y, behavior: 'smooth'});

    } else {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
}

function hideModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function hideCartModal() {
    var modal = document.getElementById("addToCartModal");
    modal.style.display = "none";
}




function setPassword() {

    document.getElementById("newpwerrormsg").innerHTML = "<font color = #cc0000>" + " " + "</font> ";


    var StrPass = document.getElementById("newpassword").value
    var StrPassRe = document.getElementById("newpasswordRe").value

    var StrFunction = "setPassword";

    var error_message = "";


    if (StrPass.trim() == "") {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("newpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.length < 8) {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("newpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass != StrPassRe) {
        error_message = "Entered passwords do not match";
        document.getElementById("newpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var resetkey = sessionStorage.getItem("passwordresetkey");

    var StrAddress = "";

    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            usrpassword: StrPass,
            resetkey: resetkey,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'JSON',
        success: function(retstatus) {
            //alert(msg);
            //console.log(retstatus);

            if (retstatus == "S") {
                //document.getElementById("newpwerrormsg").innerHTML = "Password has been set successfully.";
                document.getElementById("setPwDivId").style.display = "none";
                document.getElementById("setPwSuccessDivId").style.display = "block";
            }

            if (retstatus == "F") {
                document.getElementById("newpwerrormsg").innerHTML = "There was a problem in completing the request. Issue has been logged and will be resolved soon. Please try again later";

            }

            if ((retstatus != "S") && (retstatus != "F")) {
                document.getElementById("newpwerrormsg").innerHTML = "<font color = red>" + retstatus + "</font> ";

            }


        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
            console.log(status);
            document.getElementById("newpwerrormsg").innerHTML = "There was a problem in completing the request. Issue has been logged and will be resolved soon. Please try again later";
        }
    });

}






//Do not delete
function refreshCaptcha() {

    let captchaText = document.querySelector('#captcha');
    var ctx = captchaText.getContext("2d");
    ctx.font = "50px arial";
    ctx.fillStyle = "#333";

    ctx.clearRect(0, 0, captchaText.width, captchaText.height);



    // alphaNums contains the characters with which you want to create the CAPTCHA
    let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '2', '3', '4', '5', '6', '7', '8', '9'];
    let emptyArr = [];

    // This loop generates a random string of 7 characters using alphaNums
    // Further this string is displayed as a CAPTCHA
    for (let i = 1; i <= 7; i++) {
        emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    var c = emptyArr.join('');
    ctx.fillText(emptyArr.join(''), captchaText.width / 10, captchaText.height / 1.8);
    the.captcha = c;
}










function delete_myTopNavFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";

    } else {
        x.className = "topnav";
    }
}

function login() {
    document.getElementById("loginerrormsg").innerHTML = "<font color = red>" + " " + "</font> ";
    StrEmail = document.getElementById("emailid").value
    StrPass = document.getElementById("password").value

    var StrRemember = "Y"

    var StrFunction = "login";

    var error_message = "";

    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        //document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    }else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message += "<br>Email id is not valid";
        //document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    } else{

		var atpos = StrEmail.indexOf("@");
		var dotpos = StrEmail.lastIndexOf(".");

		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
			error_message += "<br>Email id is not valid";
			//document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
			//return;
		}
	}

    if (StrPass.trim() == "") {
        error_message += "<br>Please provide password";
        //document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    }

	if (error_message != ""){
		document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
		return;
	}
	
    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            usremail: StrEmail,
            usrpassword: StrPass,
            usrremember: StrRemember,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function(retstatus) {
            //alert("Inside login success retstatus =" + retstatus);
            //console.log( "Inside login success retstatus =" + retstatus);

            if (retstatus.substring(0, 2) == "6S") {
                document.getElementById("loginerrormsg").innerHTML = "<font color = #0000>" + "Login Successful" + "</font> "

                loggedIn = "Y";
                document.getElementById("loginLinkId").style.display = "none";
                document.getElementById("logoutLinkId").style.display = "block";
                //Show("product");

                localStorage.setItem("userLoggedIn", "y");
                localStorage.setItem("userLvl", retstatus.substring(2, 3));
                localStorage.setItem("userEmail", StrEmail);
				sessionStorage.setItem("StrEmail", StrEmail);
				
                getMySavedSongsList();


                //getStoredProjectList();



                    var myUrl = window.location.protocol + "//" + window.location.host +
                        window.location.pathname;

                    window.open(myUrl + "?target=" + "home", "_self");



                //document.getElementById("addNewProjBtnId").style.display = "block";
                //localStorage.setItem("userLoggedIn", "y");

            } else {
                document.getElementById("loginerrormsg").innerHTML = "<font color = #cc0000>" + retstatus + "</font> ";
            }
        },
        error: function(xhr, status, error) {
            //alert(xhr);
            console.log(error);
            console.log(xhr);
        }
    });
}




function UpdateSavedSongsList(){
    var StrFunction = "UpdateSavedSongsList";
   
    var error_message = "";

    var usrLoggedIn = localStorage.getItem("userLoggedIn");
    var list = sessionStorage.getItem("savedSongsList");
    if (localStorage.getItem("userLoggedIn") == "n") {
        return;
    }
    if (list == null){
        return;
    }
	if ((list == "") || (list == "[]")){
		return;
	}
    var StrEmail = sessionStorage.getItem("StrEmail");
    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            customerEmailId: StrEmail,
            list: list,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function(retstatus) {


        },
        error: function(xhr, status, error) {

	
            //alert(xhr);

            //console.log(error);
            //console.log(xhr);
        }
    });
}

function UpdateLoveCount(itemid){
    var StrFunction = "UpdateLoveCount";
   
    var error_message = "";

     $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            itemid: itemid,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function(retstatus) {


        },
        error: function(xhr, status, error) {

	
            //alert(xhr);

            //console.log(error);
            //console.log(xhr);
        }
    });
}

function updateItem(itemid, createNewItem) {

    var usremail = localStorage.getItem("userEmail");

    var songtitle = "(New Song) Please Edit";
    var songgenre2 = "0";
    var price = "10";
	
	var shipbubble = "10";
	var shipreg = "10";
	var shipexped = "10";
	var shippriority = "10";
	var shipweightkg = 1;
	
    var category = "";
    var actor1 = "";

    var actor3 = "";
    var actor2 = "";

    var songgenre1 = "0";

    var itemimage = "Provide";
    var songlyrics = "Provide";
    var hindilyrics = "Provide";
    var itemshortdesc = "Provide";
    var moviename = "";
    var itemsortorderid = "";
    var categorysortorderid = "";
	var vinyltype = "";

    var year = "0";
    var singer = "0";
    var allowcustomtext = "0";
    var allowcustomnote = "1";

    var allowcustomimage = "0";
    var allowaddart = "0";
    var singer2 = "";
    var questionforaddnote = "";
    var userinputsrequired = "";
    var cridesignsizefactor = "";
    var canvasfrontstring = "";
    var canvasbackstring = "";

    if (usremail == null){
        error_message = "Not authorized";
        document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;        
    }else if (usremail == "Guest"){
        error_message = "Not authorized";
        document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;        
    }
    if (itemid == "" && createNewItem == "y") {
        if (localStorage.getItem("userLoggedIn") == "n") {

            error_message = "Not authorized";
            document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";            
            return;

        } else if (localStorage.getItem("userLvl") != "9") {
            error_message = "Not authorized";
            document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
            return;
        }


    } else {
        document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = red>" + " " + "</font> ";

        songtitle = document.getElementById("songtitle-" + itemid).value;
        songlyrics = document.getElementById("songlyrics-" + itemid).innerHTML;
        hindilyrics = document.getElementById("hindilyrics-" + itemid).innerHTML;
        //itemshortdesc = document.getElementById("itemshortdesc-" + itemid).value;

        moviename = document.getElementById("moviename-" + itemid).value;
        //itemsortorderid = document.getElementById("itemsortorderid-" + itemid).value;
        //categorysortorderid = document.getElementById("categorysortorderid-" + itemid).value;
		//vinyltype = document.getElementById("vinyltype-" + itemid).value;
		
        songgenre2 = document.getElementById("songgenre2-" + itemid).value;

        songwriter = document.getElementById("songwriter-" + itemid).value;
        musiccomposer = document.getElementById("musiccomposer-" + itemid).value;

        //price = document.getElementById("price-" + itemid).value;
		
		//shipbubble = document.getElementById("shipbubble-" + itemid).value;
		//shipreg = document.getElementById("shipreg-" + itemid).value;
		//shipexped = document.getElementById("shipexped-" + itemid).value;
		//shippriority = document.getElementById("shippriority-" + itemid).value;
		//shipweightkg = document.getElementById("shipweightkg-" + itemid).value;
        category = document.getElementById("category-" + itemid).value;
        actor1 = document.getElementById("actor1-" + itemid).value;

        actor3 = document.getElementById("actor3-" + itemid).value;
        actor2 = document.getElementById("actor2-" + itemid).value;

        songgenre1 = document.getElementById("songgenre1-" + itemid).value;

        //itemimage = document.getElementById("image-" + itemid).value;
        year = document.getElementById("year-" + itemid).value;

        lovecount = document.getElementById("lovecount-" + itemid).value;
        starcount = document.getElementById("starcount-" + itemid).value;
        checkcount = document.getElementById("checkcount-" + itemid).value;
        discontinue = document.getElementById("discontinue-" + itemid).value;

        singer = document.getElementById("singer-" + itemid).value;
        //allowcustomtext = document.getElementById("allowcustomtext-" + itemid).value;
        //allowcustomnote = document.getElementById("allowcustomnote-" + itemid).value;

        //allowaddart = document.getElementById("allowaddart-" + itemid).value;
        //allowcustomimage = document.getElementById("allowcustomimage-" + itemid).value;
        singer2 = document.getElementById("singer2-" + itemid).value;
        //questionforaddnote = document.getElementById("questionforaddnote-" + itemid).value;
        //userinputsrequired = document.getElementById("userinputsrequired-" + itemid).value;
        //cridesignsizefactor = document.getElementById("cridesignsizefactor-" + itemid).value;
        //canvasfrontstring = document.getElementById("canvasfrontstring-" + itemid).value;
        //canvasbackstring = document.getElementById("canvasbackstring-" + itemid).value;

        if (localStorage.getItem("userLoggedIn") == "n") {

            error_message = "Not authorized";
            document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
            return;

        } else if (localStorage.getItem("userLvl") != "9") {
            error_message = "Not authorized";
            document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
            return;
        }
    }
    var StrFunction = "UpdateItem";
    songlyrics = songlyrics.replaceAll("'", "''");
    hindilyrics = hindilyrics.replaceAll("'", "''");
    songtitle = songtitle.replaceAll("'", "''");
    moviename = moviename.replaceAll("'", "''");
    if (year == ""){
        year = "0";
    }

    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            usremail: usremail,
            itemid: itemid,
            category: category,
            songtitle: songtitle,
            songlyrics: songlyrics,
            hindilyrics: hindilyrics,
            actor1: actor1,
            actor2: actor2,            
            actor3: actor3,
            singer: singer,
            singer2: singer2,
            moviename: moviename,
            year: year,
            songgenre1: songgenre1,
            songgenre2: songgenre2,            
            songwriter: songwriter,
            musiccomposer: musiccomposer, 
            lovecount:lovecount,
            starcount: starcount,
            checkcount:checkcount,
            discontinue: discontinue,  
            createNewItem: createNewItem,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function(retstatus) {
            //alert("Inside login success retstatus =" + retstatus);
            //console.log( "Inside updateItem success retstatus =" + retstatus);
            sessionStorage.setItem("mdaItemList", null);
            //sessionStorage.setItem("itemList", null);
            getItemList();
            if (itemid == "") {
                showMdaItems();
            } else {
                document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + "Processed successfully" + "</font> ";
            }
            //displayCart();

        },
        error: function(xhr, status, error) {
            if (!itemid == "") {
                document.getElementById("updateitemerrormsg-" + itemid).innerHTML = "<font color = #cc0000>" + "Failed to update" + "</font> ";
            }
            //alert(xhr);

            //console.log(error);
            //console.log(xhr);
        }
    });
}



function loginWithoutRefresh() {
    document.getElementById("Subloginerrormsg").innerHTML = "<font color = red>" + " " + "</font> ";
    StrEmail = document.getElementById("Subemailid").value
    StrPass = document.getElementById("Subpassword").value

    var StrRemember = "Y"

    var StrFunction = "login";

    var error_message = "";

    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        document.getElementById("Subloginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var atpos = StrEmail.indexOf("@");
    var dotpos = StrEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message = "Email id is not valid";
        document.getElementById("Subloginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message = "Email id is not valid";
        document.getElementById("Subloginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.trim() == "") {
        error_message = "Please provide password";
        document.getElementById("Subloginerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            usremail: StrEmail,
            usrpassword: StrPass,
            usrremember: StrRemember,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function(retstatus) {
            //alert(substr(retstatus,4));
            //alert("Inside login loginWithoutRefresh retstatus =" + retstatus);
            //console.log( "Inside loginWithoutRefresh success retstatus =" + retstatus);
            if (retstatus.substring(0, 2) == "6S") {
                //document.getElementById("Subloginerrormsg").innerHTML = "Login Successful"

                loggedIn = "Y";
                document.getElementById("loginLinkId").style.display = "none";
                document.getElementById("SubloginDivId").style.display = "none";
                document.getElementById("logoutLinkId").style.display = "block";
                document.getElementById("helpAddUpdateMsg").innerHTML = "";
                //Show("product");

                localStorage.setItem("userLoggedIn", "y");
                localStorage.setItem("userLvl", retstatus.substring(2, 3));

            } else {
                document.getElementById("Subloginerrormsg").innerHTML = "<font color = #cc0000>" + retstatus + "</font> ";
            }
        },
        error: function(xhr, status, error) {
            alert(xhr);
            console.log(error);
            console.log(xhr);
        }
    });
}

function SubshowCreateAccount() {
    document.getElementById("SubloginSecDivId").style.display = "none"
    document.getElementById("SubregisterSecDivId").style.display = "block"
}

function SubshowLogin() {
    document.getElementById("SubregisterSecDivId").style.display = "none"
    document.getElementById("SubloginSecDivId").style.display = "block"
}

function Logout() {
    StrFunction = "logout";
    error_message = "";
    sessionStorage.setItem("mdaItemList", null);
    sessionStorage.setItem("curProductItem", null);
    sessionStorage.setItem("itemList", null);
    sessionStorage.setItem("coloreditem", null);
    localStorage.setItem("userLvl", null);
    //sessionStorage.setItem("itemList", null);
    sessionStorage.setItem("artList", null);
    sessionStorage.setItem("savedSongsList", null);
    sessionStorage.setItem("mdaItemList", null);
    sessionStorage.setItem("shoppingCart", "");
    //clearCart();
    sessionStorage.setItem("cartTotal", null);

    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function(retstatus) {
            //alert(substr(retstatus,4));

            if (retstatus == "S") {
                loggedIn = "N";
                if (!onMobileBrowser()) {
                    document.getElementById("loginLinkId").style.display = "block";
                }
                document.getElementById("logoutLinkId").style.display = "none";
                localStorage.setItem("userLoggedIn", "n");
                sessionStorage.setItem("SavedProjectsList", null);
				
				setCookie("cookname", null, -1)
				
                //Show("product");
                var myUrl = window.location.protocol + "//" + window.location.host +
                    window.location.pathname;

                window.open(myUrl + "?target=" + "home", "_self");
            } else {
                //console.log(retstatus);	
            }
        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
        }
    });
}



function cookieAccepted() {
    document.getElementById("cookie-div-id").style.display = "none"
    localStorage.setItem("cookieAccepted", "y");
}

function register() {

    document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + " " + "</font> ";

    var StrEmail = document.getElementById("registeremailid").value
    var StrName = document.getElementById("registerusname").value
    var StrPass = document.getElementById("registerpassword").value
    var StrPassRe = document.getElementById("registerpasswordre").value

    var StrFunction = "register";

    var error_message = "";

    if (StrName.trim() == "") {
        error_message = "Please provide your name";
        //document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    }

    if (StrEmail.trim() == "") {
        error_message += "<br>Please enter the email id";
        //document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message += "<br>Email id is not valid";
        //document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    } else {
		var atpos = StrEmail.indexOf("@");
		var dotpos = StrEmail.lastIndexOf(".");

		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
			error_message += "<br>Email id is not valid";
			//document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
			//return;
		}
	}


    if (StrPass.trim() == "") {
        error_message += "<br>Please provide password with minimum 8 character length";
        //document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    } else  if (StrPass.length < 8) {
        error_message += "<br>Please provide password with minimum 8 character length";
        //document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    }

    if (StrPass != StrPassRe) {
        error_message += "<br>Entered passwords do not match";
        //document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    }

	if (error_message != ""){
		document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
		return;
	}

    var StrAddress = "";

    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            usremail: StrEmail,
            usrpassword: StrPass,
            usrfullname: StrName,
            usraddress: StrAddress,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'JSON',
        success: function(retstatus) {
            //alert(msg);
            //console.log(retstatus);

            if (retstatus == "S") {
                document.getElementById("registererrormsg").innerHTML = "<font color = #29ABE0>" + "Registration completed successfully. You should receive an email shortly to activate the account." + "</font> ";
            }

            if (retstatus == "F") {
                document.getElementById("registererrormsg").innerHTML = "There was a problem in completing registration. Issue has been logged and will be resolved soon. Please try again later";

            }

            if ((retstatus != "S") && (retstatus != "F")) {
                document.getElementById("registererrormsg").innerHTML = "<font color = #cc0000>" + retstatus + "</font> ";

            }


        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
            console.log(status);
            document.getElementById("registererrormsg").innerHTML = "There was a problem in completing registration. Issue has been logged and will be resolved soon. Please try again later";
        }
    });
}

function showToast(msg) {

    document.getElementById("snackbar").innerHTML = msg;
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 3000);
}

function Subregister() {
    document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + " " + "</font> ";

    var StrEmail = document.getElementById("Subregisteremailid").value
    var StrName = document.getElementById("Subregisterusname").value
    var StrPass = document.getElementById("Subregisterpassword").value
    var StrPassRe = document.getElementById("Subregisterpasswordre").value

    var StrFunction = "register";

    var error_message = "";

    if (StrName.trim() == "") {
        error_message = "Please provide your name";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var atpos = StrEmail.indexOf("@");
    var dotpos = StrEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message = "Email id is not valid";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message = "Email id is not valid";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.trim() == "") {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass.length < 8) {
        error_message = "Please provide password with minimum 8 character length";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (StrPass != StrPassRe) {
        error_message = "Entered passwords do not match";
        document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var StrAddress = "";

    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            usremail: StrEmail,
            usrpassword: StrPass,
            usrfullname: StrName,
            usraddress: StrAddress,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'JSON',
        success: function(retstatus) {
            //alert(msg);
            //console.log(retstatus);

            if (retstatus == "S") {
                document.getElementById("Subregistererrormsg").innerHTML = "<font color = #0000>" + "Registration completed successfully. Please check your email for account activation." + "</font> ";
            }

            if (retstatus == "F") {
                document.getElementById("Subregistererrormsg").innerHTML = "There was a problem in completing registration. Issue has been logged and will be resolved soon. Please try again later";

            }

            if ((retstatus != "S") && (retstatus != "F")) {
                document.getElementById("Subregistererrormsg").innerHTML = "<font color = #cc0000>" + retstatus + "</font> ";

            }


        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
            console.log(status);
            document.getElementById("Subregistererrormsg").innerHTML = "There was a problem in completing registration. Issue has been logged and will be resolved soon. Please try again later";
        }
    });
}

function forgotpw() {
    document.getElementById("forgotpwerrormsg").innerHTML = "<font color = #cc0000>" + " " + "</font> ";

    var StrEmail = document.getElementById("forgotpwemailid").value

    var StrFunction = "forgotpw";

    var error_message = "";


    if (StrEmail.trim() == "") {
        error_message = "Please enter the email id";
        document.getElementById("forgotpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    var atpos = StrEmail.indexOf("@");
    var dotpos = StrEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
        error_message = "Email id is not valid";
        document.getElementById("forgotpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message = "Email id is not valid";
        document.getElementById("forgotpwerrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        return;
    }


    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            usremail: StrEmail,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'JSON',
        success: function(retstatus) {
            //alert(msg);
            //console.log(retstatus);

            if (retstatus == "S") {
                document.getElementById("forgotpwerrormsg").innerHTML = "<font color = #0000>" + "Request processed. You should receive an email shortly with password reset link." + "</font> ";
            }

            if (retstatus == "F") {
                document.getElementById("forgotpwerrormsg").innerHTML = "Email id not found";

            }

            if ((retstatus != "S") && (retstatus != "F")) {
                document.getElementById("forgotpwerrormsg").innerHTML = "<font color = red>" + retstatus + "</font> ";

            }


        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
            console.log(status);
            document.getElementById("forgotpwerrormsg").innerHTML = "There was a problem in completing the request. Issue has been logged and will be resolved soon. Please try again later";
        }
    });
}

function contactus() {
    document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + " " + "</font> ";
    var StrEmail = document.getElementById("contactusemailid").value
    var StrName = document.getElementById("contactusname").value
    var StrComment = document.getElementById("contactus_msg").value

    var StrFunction = "contactus";

    var error_message = "";

    if (StrName.trim() == "") {
        error_message += "Please provide your name";
        //document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    }

    if (StrEmail.trim() == "") {
        error_message += "<br>Please enter the email id";
        //document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    }else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(StrEmail))) {
        error_message += "<br>Email id is not valid";
        //document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    } else {

		var atpos = StrEmail.indexOf("@");
		var dotpos = StrEmail.lastIndexOf(".");

		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= StrEmail.length) {
			error_message += "<br>Email id is not valid";
			//document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
			//return;
		}
	}
    



    if (StrComment.trim() == "") {
        error_message += "<br>Please provide message";
        //document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
        //return;
    }

    if (the.captcha != document.getElementById("enteredCaptchaText").value) {
        if ((localStorage.getItem("userLoggedIn") == "n") || (localStorage.getItem("userLvl") != "9")) {
            error_message += "<br>Please enter displayed code in the box";
            //document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
            //return;
        }
    }
	
	if (error_message != ""){
		document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + error_message + "</font> ";
		return;
	}
    $.ajax({
        url: '/antaksharee/php/process.php',
        data: {
            usrname: StrName,
            usremail: StrEmail,
            usrcomment: StrComment,
            usrfunction: StrFunction
        },
        type: 'POST',
        dataType: 'json',
        success: function(retstatus) {
            //alert(substr(retstatus,4));
            //console.log(retstatus);
            document.getElementById("contactuserrormsg").innerHTML = "<font color = #0000>" + "Thank you for your message. We will get back to you shortly" + "</font> ";

            /*
            if (retstatus == "S"){
            	document.getElementById("contactuserrormsg").innerHTML = "<font color = #cc0000>" + "Thank you for your message. We will get back to you shortly" + "</font> ";
            }
            else
            {
              document.getElementById("MainHead").innerHTML = "<font color = blue face = 'arial'> There was a problem sending message. Issue has been logged and will be resolved soon. Please try again later</font> <br> <br><br> <input type='button' class='button_type1'  value='Ok' onclick='CANCLCRTACC()'> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>";				
            }
            */
        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(xhr);
        }
    });
}

function onMobileBrowser() {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        return true;
    } else {
        // false for not mobile device
        return false;
    }


}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function logCommon(msg) {
    //console.log("At " + new Date().toLocaleString() + " from common-functions.js " + msg )
}

