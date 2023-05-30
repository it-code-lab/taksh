<?php
include_once("php/session.php");

$title = "Antaksharee - Bollywood Song Lyrics";
$description = "Hindi song lyrics. A searchable collection of old and new Hindi film (Bollywood) songs";
//$image_url = "Your Image URL";
$keywords = "हिन्दी, Antaksharee, Antakshari, गाने, संगीत, lyrics, song, hindi, gaane, geet, Bhajans,
 bollywood,india, music, singer, songs, lyrics, movies, movie songs, search, browse, new hindi songs,
  old hindi songs";

//SM-TODONE-Revert below
$page_url = $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
//$page_url = $_SERVER["REQUEST_URI"];

$path = urldecode($_SERVER["REQUEST_URI"]);
$path = substr($path, 1);

if (strpos($path, 'lyrics/') !== false) {
   $itemstr = substr($path, strpos($path, "lyrics/") + 7);
   $itemstr = str_replace("-", " ", $itemstr);
      if (isset($_SESSION['datafetched_XX'])) {
         $title = $_SESSION['webTitle'];
         $description = $_SESSION['webDesc'];
         $keywords = $_SESSION['webKeywords'];

      } else {
         $dummy = $database->getLyrics($itemstr);

         if ($dummy != "E") {
            $title = $_SESSION['webTitle'];
            $description = $_SESSION['webDesc'];
            $keywords = $_SESSION['webKeywords'];
         }
      }

}

?>
<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="utf-8" />

   <title><?php echo $title; ?></title>
   <meta name="description" content="<?php echo $description; ?>">
   <meta property="og:title" content="<?php echo $title; ?>">
   <meta property="og:description" content="<?php echo $description; ?>">

   <meta property="og:url" content="<?php echo $page_url; ?>">
   <meta name="keywords" content="<?php echo $keywords; ?>">

   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
   <meta name="author" content="Numerouno" />

   <!-- Favicon-->
   <link rel="icon" type="image/x-icon" href="/Antaksharee/assets/favicon.ico" />
   <link rel="canonical" href="https://antaksharee.com" />

   <!--------->
   <link href="/Antaksharee/css/codescriber.css" rel="stylesheet" />
   <link href="/Antaksharee/css/slidestyles.css" rel="stylesheet" />
   <link href="/Antaksharee/css/smtheme-v1.02.css" rel="stylesheet" />

   <!-----
      <link href="/Antaksharee/css/codescriber-mini.css" rel="stylesheet" />
--->
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">


   <!------->
   <script src="/Antaksharee/web/common-function.js"></script>

   <!-----
         <script src="/Antaksharee/web/common-function-mini.js"></script>
      --->
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
   <link href="/Antaksharee/css-fabric/bootstrap.min.css" rel="stylesheet">
   <link href="/Antaksharee/css-fabric/bootstrap-responsive.min.css" rel="stylesheet">


   <!-- Global site tag (gtag.js) - Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-HSDY9HMZYV"></script>

   <script type="application/ld+json">{
         "@context": "https://schema.org/",
         "@type":"WebSite","url":"https://antaksharee.com/",
         "name": "Antaksharee - Collection of Bollywood Song Lyrics",
         "datePublished": "2022-07-10",
         "description": "A searchable collection of old and new Hindi film (Bollywood) songs.",
         "thumbnailUrl": "https://antaksharee.com/images/banner.png"         
      }
      </script>

   <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());

      gtag('config', 'G-HSDY9HMZYV');
   </script>

   <!-- Google Tag Manager -->
   <script>(function (w, d, s, l, i) {
         w[l] = w[l] || []; w[l].push({
            'gtm.start':
               new Date().getTime(), event: 'gtm.js'
         }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
               'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-TGPRZB7');</script>
   <!-- End Google Tag Manager -->

</head>

<body>

   <!-- Google Tag Manager (noscript) -->
   <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TGPRZB7" height="0" width="0"
         style="display:none;visibility:hidden"></iframe></noscript>
   <!-- End Google Tag Manager (noscript) -->

   <div class="d-flex" id="wrapper">
      <div id="page-content-wrapper">
         <!-- Top navigation-->
         <div class="topnav" id="myTopnav">
            <a href="javascript:void(0);" class="icon topNavBar" onclick="myTopNavFunction()">
               <i class="fa fa-bars"></i>
            </a>


            <a class="" id="homeLinkId" href="javascript:goToHome()"><i class="fa fa-home topNavHref"></i><br><span
                  class="topNavText">HOME</span></a>
            <a class="" id="dumbCharadesLinkId" href="javascript:getRandomMovieUrl()"><i
                  class="fa fa-file-movie-o topNavHref"></i><br><span class="topNavText">DUMB CHARADES</span></a>
            <a class="" id="contactusLinkId" href="javascript:goToContactUs()"><i
                  class="fa fa-send-o topNavHref"></i><br><span class="topNavText">CONTACT US</span></a>
            <a class="" id="loginLinkId" href="javascript:goToLogin()"><i class="fa fa-user topNavHref"></i><br><span
                  class="topNavText">LOG IN</span></a>


            <!--REF: https://codepen.io/chrisachinga/pen/MWwrZLJ-->


            <a style="padding:0px">
               <div id="logoutLinkId" onClick="toggleSubNavContent()" class="subnav">
                  <button id="usremailspanid" class="subnavbtn"><i class="fa fa-user topNavHref"></i><i
                        class="fa fa-caret-down"></i><br><span class="topNavText">MY ACCOUNT</span> </button>

               </div>

            </a>
            <div id="subnav-content-div" class="subnav-content">
               <!-- <a href="javascript:showMyOrders()">MY ORDERS</a> -->
               <a href="javascript:Logout()">LOGOUT</a>
               <!----->
               <a id="mdaItems" href="javascript:showMdaItems()">ITEMS</a>

            </div>
            <!--
            <input class="formInputText" id='searchitem' type="text" autocomplete="off" style="width: 200px; margin: 0px; margin-left: 10px; float:left" readonly onfocus="this.removeAttribute('readonly');" placeholder="Search">
            -->


         </div>
         <!-- End of Top navigation-->
         <!-- Page content-->
         <div id="loaderDivId">
            <!-- <img src='images/gift.png' alt='Loading..' style="margin:auto"> -->
            <div class="loader">
               <i class="loaderDot"></i>
               <i class="loaderDot"></i>
               <i class="loaderDot"></i>
            </div>
         </div>
         <div id="loaderRingDivId">
            <div class="lds-ring-top">
               <div></div>
               <div></div>
               <div></div>
               <div></div>
            </div>
         </div>

         <div id="containerNHelpDivId">
            <div id="homeDivId">
               <div id="homeSubDiv1">

                  <div id="homeSubDiv2" class="bannerContainer">


                     <div id="homeSubDiv3">
                        <div id="homeSubDiv4" class="bannerTextFirst scale-in-center"
                           style="animation-delay: 0.8s; animation-duration: 0.5s;">Antaksharee <br> (अंताक्षरी) </div>
                     </div>
                  </div>

               </div>

               <div id="filtersDivId">
                  <div id="filtersSubDivId1">
                     <h1 id="filtersDivH1">A searchable collection of old and new Hindi (Bollywood) songs. Can be used
                        for playing Antaksharee aka Antakshari game (<a href="#howToPlay" style="color: white;"> <em>How
                              To Play</em></a>)
                     </h1>
                  </div>
                  <div id="filtersSubDivId2">

                     <div id="filtersSubDivId3">
                        <input id="searchProductTextId" required type="search" onkeydown="searchItemEntered()"
                           placeholder="Search songs by title, singer, actor or movie name.." value>

                        <button id="searchBtnId" type="submit" onclick="searchItem();" class="searchButton iconhover">
                           <i class="fa fa-search"></i>
                        </button>
                     </div>


                     <div class="filtersSubDiv">
                        <div id="filtersSubDivId4">
                           <label id="taggedSondsLblId">Filter Tagged Songs:</label>
                           <i class="fa fa-heart iconhover tagStyleRed" onclick="showMyLovedSongs();"></i>
                           <i class="fa fa-star iconhover tagStyleOrange" onclick="showMystarsongs();"></i>
                           <i class="fa fa-bell iconhover tagStylePurple" onclick="showMycheckedsongs();"></i>

                        </div>
                     </div>

                     <div id="songByYearDivIdLbl">Filter Songs By Year:</div>
                     <div class="filtersSubDiv">
                        <div id="songByYearDivId">


                           <input id="fromYear" type="number" min="1900" max="9999" step="5"
                              class="item-count form-control YearInput" value="1990">
                           to
                           <input id="toYear" type="number" min="1900" max="9999" step="5"
                              class="item-count form-control YearInput" value="2000">

                           <button id="songByYearDivIdBtn" type="submit" class="iconhover"
                              onclick="showSongsByYear();">Go</button>
                        </div>
                     </div>

                  </div>


                  <div id="songByYearDivIdLbl"> &nbsp; Filter Songs By Starting Character:</div><br>
                  <div id="categoryListDivId">add-here</div>


               </div>

               <div id="searchResultsDivId">
                  <div id="productSearchResultsLblDiv">
                     <div id="productSearchResultsLbl"></div>
                     <button id="resetBtnId" class="iconhover" type="submit" onclick="resetSearch();">Reset</button>
                  </div>
               </div>


               <div id="cardsContainerDivId">add-here</div>


               <!-- <hr class="howToPlayHr" > -->
               <div id="howToPlay">
                  <b>How To Play Antaksharee</b>
                  <br><br>
                  The Antaksharee aka Antakshari game can be played by two or more people and is popular as a group
                  activity. The first singer has to sing a few lines and then s/he may stop at the end of those lines.
                  The last letter of the last word sung is then used by the next singer to sing another song, starting
                  with that letter. The winner or winning team is decided by a process of elimination. The person or
                  team that cannot come up with a song with the right consonant is eliminated if their opponents can
                  produce such a song.
                  <a id="howToGoHome" href="javascript:goToHome()"> <em>Go Home</em></a>
               </div>
               <hr>
               <div class="centerAlign">
                  <a href="https://www.facebook.com/Antaksharee-Hindi-song-lyrics-104876665617402" target="_blank"><i
                        class="fa fa-facebook-square" style="font-size:64px;color:#4267B2; margin: 10px;"></i></a>
                  <a href="https://twitter.com/antaksharee_com" target="_blank"><i class="fa fa-twitter-square"
                        style="font-size:64px;color:#00acee; margin: 10px;"></i></a>
                  <a href="https://www.youtube.com/channel/UCZJ5Uy8EHd72cYUBAZxkUgg" target="_blank"><i
                        class="fa fa-youtube-square" style="font-size:64px;color:red; margin: 10px;"></i></a>
               </div>
               <hr>
               <!-- <hr class="howToPlayHr"> -->
               <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>


            </div>
         </div>
         <!-- /container -->
         <div id="loginDivId">
            <div class="loginSecDivId" id="loginSecDivId">
               <label class="logInLbl"> LOGIN </label>
               <hr>
               <div>To access your tagged songs across multiple devices</div>
               <hr>
               <input class="un formInputText" id='emailid' type="text" align="center" placeholder="Login Email Id">
               <input class="pass formInputText" id='password' type="password" align="center" placeholder="Password">
               <br>
               <label id="loginerrormsg" class="loginerrormsg"></label>
               <br>
               <br>
               <button id="loginHelper" class="helper" onclick="login();">Log in</button>
               <br>
               <br>
               <a href="#!" style="color: #888;  " onMouseOver="this.style.color='#333'"
                  onMouseOut="this.style.color='#888'" onclick="showCreateAccount();">Not registered? Create account</a>
               <br>
               <a href="#!" style="color: #888;  " onMouseOver="this.style.color='#333'"
                  onMouseOut="this.style.color='#888'" onclick="showForgotPassword();">Forgot Password? Reset</a>
            </div>

            <div id="registerSecDivId" class="registerSecDivId">
               <label class="logInLbl"> REGISTER </label>
               <hr>
               <input class="un formInputText" id='registerusname' type="text" placeholder="Your full name">
               <input class="un  formInputText" id='registeremailid' type="text" align="center"
                  placeholder="Login Email Id">
               <input class="pass formInputText" id='registerpassword' type="password" align="center"
                  placeholder="Set Password">
               <input class="pass formInputText" id='registerpasswordre' type="password" align="center"
                  placeholder="Re-enter Password">
               <br>
               <label id="registererrormsg" class="loginerrormsg"></label>
               <br>
               <br>
               <button class="helper" style="width: 250px" onclick="register();">Register</button>
               <!---->
               <br>
               <br>
               <a href="#!" style="color: #888;  " onMouseOver="this.style.color='#333'"
                  onMouseOut="this.style.color='#888'" onclick="showLogin();">Go back to Login</a>
            </div>
            <div id="forgotPasswordSecDivId" class="registerSecDivId">
               <label class="logInLbl"> FORGOT PASSWORD </label>
               <hr>
               <label>Enter your email address and we will email you instructions on password reset</label>
               <br>
               <input class="un formInputText " id='forgotpwemailid' type="text" align="center"
                  placeholder="Login Email Id">
               <br>
               <label id="forgotpwerrormsg" class="loginerrormsg"></label>
               <br>
               <br>
               <button class="helper" style="width: 250px" align="center" onclick="forgotpw();">Send</button>
               <!---->
               <br>
               <br>
               <a href="#!" style="color: #888;  " onMouseOver="this.style.color='#333'"
                  onMouseOut="this.style.color='#888'" onclick="showLogin();">Go back to Login</a>
            </div>
            <div id="accActivatedDivId" class="registerSecDivId">
               <label class="logInLbl"> ACCOUNT ACTIVATED </label>
               <hr>
               <label>Your account has been activated successfully. You can proceed to login</label>
               <!---->
               <br>
               <br>
               <a href="#!" style="color: #888;  " onMouseOver="this.style.color='#333'"
                  onMouseOut="this.style.color='#888'" onclick="showLogin();">Login</a>
            </div>
            <div id="forgotPWDivId" class="registerSecDivId">
               <label class="logInLbl"> SET PASSWORD </label>
               <hr>
               <!---->
               <br>
               <input class="pass formInputText" id='newpassword' type="password" align="center"
                  placeholder="Set New Password">
               <br>
               <input class="pass formInputText" id='newpasswordRe' type="password" align="center"
                  placeholder="Re-enter New Password">
               <br>
               <label id="newpwerrormsg" class="loginerrormsg"></label>
               <br>
               <div id="setPwDivId">
                  <button class="helper" style="width: 300px" align="center" onclick="setPassword();">Set
                     Password</button>
               </div>
               <div id="setPwSuccessDivId" style="display: none">
                  <label style="color: #cc0000">Your account password has been set successfully. You can proceed to
                     login</label>
                  <!---->
                  <br>
                  <br>
                  <a href="#!" style="color: #888;  " onMouseOver="this.style.color='#333'"
                     onMouseOut="this.style.color='#888'" onclick="showLogin();">Login</a>
               </div>
            </div>
         </div>


         <div id="contactusDivId">
            <div id="contactusSecDivId">
               <label class="logInLbl"> CONTACT US </label>
               <hr>
               <input class="un formInputText " id='contactusname' style="width: calc(100% - 8px);" type="text"
                  placeholder="Your full name">
               <input class="un formInputText " id='contactusemailid' style="width: calc(100% - 8px);" type="text"
                  placeholder="Email Id">
               <textarea id="contactus_msg" class=" " style="width: calc(100% - 20px);" placeholder="Your message"
                  rows="4"></textarea>
               <br>
               <div style=" width: 220px; background-color: #C8C8C8; border-radius: 5px; ">
                  <ul class="captchaList" style="padding: 5px;">
                     <li style="margin: 5px;">
                        <div class="captchaBackground" style="position: relative; ">
                           <canvas id="captcha">captcha text</canvas>
                           <i class="fa fa-refresh" id="refreshButton"
                              style="float: right;  position: absolute; top:1px; right: 1px; color:white; cursor: pointer"
                              onclick="refreshCaptcha();"></i>
                        </div>
                     </li>
                     <li style="margin: 5px;">
                        <div><input id="enteredCaptchaText" style="width: 188px; height:30px"
                              placeholder="Enter displayed code" type="text" autocomplete="off" name="text"></div>
                     </li>
                  </ul>
               </div>
               <label id="contactuserrormsg" class="loginerrormsg"></label>
               <br> <br>
               <button class="helper" align="center" style="width: 250px; " onclick="contactus();">Submit</button>
            </div>
         </div>
         <div id="showOrdersDivId"
            style="display: none; max-width: 800px; min-width: 250px; margin: auto; padding: 5px; background-color: #D9E6E6; margin-top: 20px; margin-bottom: 20px; border-radius: 10px ; box-shadow: 1px 1px 3px #222222;">
         </div>

         <div id="onMobileMsgDivId" style="display:none; margin:10px; padding:10px; text-align: justify">
            Because the code upload and scanning limitations, the site has restricted functionality on mobile device.
         </div>
         <div id="howtoDivId" style="display:none; margin:auto;">
            Coming soon
         </div>

      </div>

   </div>
   </div>
   <div id="snackbar" style="">Some text message..</div>
   <div id="myModal" class="modalpop">
      <!-- Modal content -->
      <div class="modal-content">
         <div class="modal-header">
            <span class="closemodalpop" onclick="hideModal()"
               style="font-size: 30px; width: 20px; height: 20px;"></span>
            <br><br>
            <button class="helper" style="width:200px ; margin-bottom: 10px;" onclick="checkoutWithLogin()">Continue to
               login</button>
            <button class="helper" style="width:200px; " onclick="checkoutAsGuest()">Continue as guest</button>
         </div>
      </div>
   </div>
   <div id="addToCartModal" style="display: none; z-index: 100;" class="modalpop">
      <!-- Modal content -->
      <div class="modal-content">
         <div
            style="height: 20px; background-color: #2c3e50; margin: auto; color: #fff; text-align: center; padding: 10px;">
            <div class="closemodalpop" onclick="hideCartModal()"
               style="z-index: 103; font-size: 30px; width: 20px; height: 20px; "></div>
            <text style="margin: auto;  font-size: 14px;">ADDED TO CART </text>
         </div>
         <div>
            <table class="show-pop-cart table">
            </table>
         </div>
      </div>
   </div>
   <div id="cookie-div-id" class="cookie-consent-banner">
      <div class="cookie-consent-banner__inner">
         <div class="cookie-consent-banner__copy">
            <div class="cookie-consent-banner__header">We USE COOKIES</div>
            <div class="cookie-consent-banner__description">We use cookies and other tracking technologies to improve
               your browsing experience on our website, to show you personalized content and targeted ads, to analyze
               our website traffic, and to understand where our visitors are coming from. You consent to our cookies if
               you continue to use our website.</div>
         </div>
         <div class="cookie-consent-banner__actions centerAlign">
            <a href="#" onclick="cookieAccepted()" class="cookie-consent-banner__cta">
               Understood
            </a>
         </div>
      </div>
   </div>
   <script>
      getItemList();
      //  getArtList();
      checkURL();
      getMovieList();
         //setCollapsible();


   </script>
   <script src="/Antaksharee/js-fabric/bootstrap.min.js"></script>

   <!-- Go to www.addthis.com/dashboard to customize your tools -->
   <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-62b6a1ae1af351f4"></script>

</body>

</html>