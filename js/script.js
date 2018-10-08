
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
    $(block).find('[data-toggle="popover"]').popover({
      container: 'body'
    });
  });

  
});
var nbSlides = $(".step.slide").length;
var showPopover = new URL(window.location).searchParams.get("showPopover");

var rootElement = document.getElementById( "impress" );
var myTemplateConfig = {
    colors: ["#979797", "#008fb5", "#f1c109"],
    branch: {
      lineWidth: 10,
      spacingX: 50,
      labelRotation: 0,
      showLabel: true,   
    },
    commit: {
      spacingY: -60,
      dot: {
        size: 14
      },
      message: {
        font: "normal 14pt Arial",
        displayHash: false,
      }
    }
  };

var myTemplate = new GitGraph.Template( myTemplateConfig );
var graphLocal = new GitGraph({
  template: myTemplate,
  reverseArrow: false,
  orientation: "vertical",
  elementId: "gitGraphLocal",
  mode: "compact"
});
var graphRemote = new GitGraph({
  template: myTemplate,
  reverseArrow: false,
  orientation: "vertical",
  elementId: "gitGraphRemote",
  mode: "compact"
});
var master = graphLocal.branch("master");
var masterRemote = graphRemote.branch("origin/master");
var fixVilloud;
var noms = ['girard', 'durand', 'faure'];
$("#gitPull").click(function(event) {
    master.commit("Création du fichier villoud.txt");
    for (var i = 0; i < noms.length; i++) {
      master.commit("Création du fichier " + noms[i] + ".txt");
    }
});
$("#gitClone").click(function(event) {
    master.commit("Initial commit");
    masterRemote.commit("Initial commit");
});
$("#masterlocal1stcommit").click(function(event) {
    master.commit("Création du fichier villoud.txt");
});
$("#masterremote1stpush").click(function(event) {
    masterRemote.commit("Création du fichier villoud.txt");
});
$("#masterremote2ndpush").click(function(event) {
    graphRemote = new GitGraph({
      template: myTemplate,
      reverseArrow: false,
      orientation: "vertical",
      elementId: "gitGraphRemote",
      mode: "compact"
    });
    masterRemote = graphRemote.branch("origin/master");
    masterRemote.commit("Initial message");
    masterRemote.commit("Création du fichier dupond.txt");
    masterRemote.commit("Création du fichier villoud.txt");
    for (var i = 0; i < noms.length; i++) {
            masterRemote.commit("Création du fichier " + noms[i] + ".txt");
    }
});
$("#createfixvotrenombranch").click(function(event) {
    fixVilloud = master.branch("fix-villoud");
});

$("#commitRemoveNomTxt").click(function(event) {
    fixVilloud.commit("Suppression de villoud.txt");
    masterRemote.commit("Modification mineure");
});

$("#commitIntermediaireMerge").click(function(event) {
    master.commit("Modification mineure");
    setTimeout(function() { master.merge(fixVilloud);}, 2000);
    
});

$("#mergeFixNomTxtMaster").click(function(event) {
    fixVilloud.merge(master);
});

$("#deleteFixNomTxt").click(function(event) {
    fixVilloud.delete();
    var branches = [];
    for (var i = 0; i < noms.length; i++) {
      (function(index) {
          setTimeout(function() { 
            branches[index] = masterRemote.branch("fix-" + noms[index]);
            branches[index].commit("Suppression de " + noms[index] + ".txt");
          }, i * 2000);
      })(i);
    }
    setTimeout(function() { 
      branches[0].merge(branches[1]);
      
    }, 8000);
    setTimeout(function() { 
      branches[1].merge(branches[2]);
    }, 10000);
    setTimeout(function() { 
      branches[2].merge(masterRemote);
    }, 12000);
});

rootElement.addEventListener( "impress:stepenter", function(event) {
  var currentStep = event.target;
  var numeroSlide = $(currentStep).attr("data-nb");
  $("#numSlide").html(numeroSlide);
  var percentageSlide = Math.round(numeroSlide * 100 / nbSlides);
  $("#progress").attr("style", "width: " + percentageSlide + "%;");
  $("#progress").attr("aria-valuenow", percentageSlide);

  if(showPopover === "true") {
    setTimeout(function(){
      $('#' + currentStep.id + ' [data-toggle="popover"]').popover('show', {
        container: 'body'
      });
  }, 1000);
  } else {
    $('#' + currentStep.id + ' [data-toggle="popover"]').popover({
      container: 'body'
    });
  }
  
  if($(currentStep).attr("id") === "changements-pull"){
    graphLocal = new GitGraph({
      template: myTemplate,
      reverseArrow: false,
      orientation: "vertical",
      elementId: "gitGraphLocal",
      mode: "compact"
    });
    master = graphLocal.branch("master");
    master.commit("Initial message");
    master.commit("Création du fichier dupond.txt");
    for (var i = 0; i < noms.length; i++) {
      (function(index) {
          setTimeout(function() { 
            masterRemote.commit("Création du fichier " + noms[index] + ".txt");
          }, i * 2000);
      })(i);
    }
  }

});

rootElement.addEventListener( "impress:stepleave", function(event) {

  var currentStep = event.target;
  if(currentStep.id === "branches-commandes"){
    $("#gitGraphLocal").remove();
    $("#gitGraphRemote").remove();
  }
  $('#' + currentStep.id + ' [data-toggle="popover"]').popover('dispose');
});

$(window).on('hashchange', function(e){
    //Gérer dropdown-toggle
    var origEvent = e.originalEvent;
    oldHash = origEvent.oldURL.substring(origEvent.oldURL.lastIndexOf("#")).replace("/","");
    newHash = origEvent.newURL.substring(origEvent.newURL.lastIndexOf("#")).replace("/","");
    $('#my-navbar li a').removeClass("active");
    $('#my-navbar li a[href="' + newHash.substring(0,newHash.indexOf("-")) + '"]').addClass("active");
    urls = newHash.split("-");
    if(urls.length > 3){
      $('#my-navbar li a[href="' + urls[0] + "-" + urls[1] + '"]').addClass("active");
    } else {
      $('#my-navbar li a[href="' + newHash.substring(0,newHash.lastIndexOf("-")) + '"]').addClass("active");
    }
    $('#my-navbar li a[href="' + newHash + '"]').addClass("active");
    
});

//-------------------

$("div.step.slide").each(function(index, el) {
  var id = $(el).attr("id");
  var title = $(el).find("h1.display-3").text();
  $(el).attr("data-nb", index + 1);
  var yOffset = 1100;
  var xOffset = 2000;
  var ybase = 1100;
  var xbase = 0; 
  if(id !== 'accueil'){
    if(id.indexOf("-") > 0){
      if(id.lastIndexOf("-") != id.indexOf("-")){
        if(id.split("-").length == 4){
          $(el).attr("data-rel-x", xOffset);
          $(el).attr("data-rel-y", 0);
          $(el).attr("data-rotate-x", 90);
          $(el).attr("data-z", -2000);
        } else {
          $(el).attr("data-rel-x", 0);
          $(el).attr("data-rel-y", 0);
          $(el).attr("data-z", -2000);
          $(el).attr("data-rotate-x", 90);
        }
      } else {
        var baseId = id.substring(0,id.indexOf("-"));
        console.log(baseId);
        $("div#dropdown-"+baseId).append('<a class="dropdown-item" href="#'+id+'">'+title+'</a>');
        $(el).attr("data-rel-x", xOffset);
        $(el).attr("data-rel-y", 0);
        $(el).attr("data-z", 0);
      }
    } else {
      if($('div[id^="'+id+'-"]').length > 0){
        $("ul.nav.nav-pills.mr-auto").append('<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" id="navbarDropdown'+id+'" href="#'+id+'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+title+'</a> <div id="dropdown-'+id+'" class="dropdown-menu" aria-labelledby="navbarDropdown'+id+'"></div></li>');  
        $(el).attr("data-x", 0);
        $(el).attr("data-rel-y", yOffset);
        $(el).attr("data-z", 0);
      } else {
        $("ul.nav.nav-pills.mr-auto").append('<li class="nav-item"><a class="nav-link" href="#'+id+'">'+title+'</a></li>');  
        $(el).attr("data-x", 0);
        $(el).attr("data-rel-y", yOffset);
        $(el).attr("data-z", 0);
      }
    }
  }
});

var imp = impress();
imp.init();