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

$isCrawler = isset($_SERVER['HTTP_USER_AGENT'])
&& preg_match('/bot|crawl|slurp|spider|mediapartners|InspectionTool|GoogleOther/i', $_SERVER['HTTP_USER_AGENT']);


if (strpos($path, 'lyrics/') !== false) {
   $itemstr = substr($path, strpos($path, "lyrics/") + 7);
   $itemstr = str_replace("-", " ", $itemstr);
      if (isset($_SESSION['datafetched_XX'])) {
         $title = $_SESSION['webTitle'];
         $description = $_SESSION['webDesc'];
         $keywords = $_SESSION['webKeywords'];
         $webFullDesc = $_SESSION['webFullDesc'];

      } else {
         $dummy = $database->getLyrics($itemstr);

         if ($dummy != "E") {
            $title = $_SESSION['webTitle'];
            $description = $_SESSION['webDesc'];
            $keywords = $_SESSION['webKeywords'];
            $webFullDesc = $_SESSION['webFullDesc'];
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

   <?php if (!$isCrawler):  ?>
   <?php include 'body-main.html'; ?>
<?php else: ?>
   <h1> <?=$_SESSION['webTitle']?> </h1><br>
   
   
   <div style="margin: auto; padding:10px">
   <?= $_SESSION['webFullDesc'] ?>
   </div>
<?php endif; ?>
</body>

</html>