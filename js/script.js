
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
var graphFork;
var graphRemote = new GitGraph({
  template: myTemplate,
  reverseArrow: false,
  orientation: "vertical",
  elementId: "gitGraphRemote",
  mode: "compact"
});
var main = graphLocal.branch("main");
var mainRemote = graphRemote.branch("origin/main");
var fixVilloud;
var noms = ['girard', 'durand', 'faure'];

$("#gitCreate").click(function(event) {
    mainRemote.commit({
      message: "Initial commit",
      sha1: "acf091c"
    });
    $("#gitCreate").removeClass("btn-primary").addClass("btn-success");
});
$("#gitClone").click(function(event) {
    main.commit({
      message: "Initial commit",
      sha1: "acf091c"
    });
    $("#gitClone").removeClass("btn-primary").addClass("btn-success");
});
$("#mainlocal1stcommit").click(function(event) {
    main.commit({
      message: "Création du fichier villoud.txt",
      sha1: "5ddb756"
    });
    $("#mainlocal1stcommit").removeClass("btn-primary").addClass("btn-success");

});
$("#mainremote1stpush").click(function(event) {
    mainRemote.commit({
      message: "Création du fichier villoud.txt",
      sha1: "5ddb756"
    });
    $("#mainremote1stpush").removeClass("btn-primary").addClass("btn-success");
});

$("#mainteamcommitlocal").click(function(event) {
  graphLocal = new GitGraph({
    template: myTemplate,
    reverseArrow: false,
    orientation: "vertical",
    elementId: "gitGraphLocal",
    mode: "compact"
  });
  main = graphLocal.branch("main");
  main.commit({
    message: "Initial commit",
    sha1: "acf091c"
  });
  main.commit({
    message: "Création du fichier dupond.txt",
    sha1: "5ea96de"
  });
  for (var i = 0; i < noms.length; i++) {
    (function(index) {
        setTimeout(function() {
          mainRemote.commit("Création du fichier " + noms[index] + ".txt");
        }, i * 2000);
    })(i);
  }
  $("#mainteamcommitlocal").removeClass("btn-primary").addClass("btn-success");

});

$("#mainteampusherror").click(function(event) {
  $("#list-push").addClass("list-group-item-danger");
  $("#mainteampusherror").removeClass("btn-primary").addClass("btn-danger");
  $("#mainteampusherror i").removeClass("fa-check").addClass("fa-times");

});

$("#mainteampushsuccess").click(function(event) {
  graphRemote = new GitGraph({
    template: myTemplate,
    reverseArrow: false,
    orientation: "vertical",
    elementId: "gitGraphRemote",
    mode: "compact"
  });
  mainRemote = graphRemote.branch("origin/main");
  mainRemote.commit({
    message: "Initial commit",
    sha1: "acf091c"
  });
  mainRemote.commit({
    message: "Création du fichier dupond.txt",
    sha1: "5ea96de"
  });
  for (var i = 0; i < noms.length; i++) {
    mainRemote.commit({
      message: "Création du fichier " + noms[i] + ".txt",
      sha1: "1de946" + i
    });
  }
  mainRemote.commit({
    "message": "Merge branch 'main' of github.com:pjvilloud/ipi-git-200-ex",
    "sha1": "f85c456"
  })
  $("#list-push2").addClass("list-group-item-success");
  $("#mainteampushsuccess").removeClass("btn-primary").addClass("btn-success");

});

$("#gitpull2").click(function(event) {
    for (var i = 0; i < noms.length; i++) {
      main.commit({
        message: "Création du fichier " + noms[i] + ".txt",
        sha1: "1de946" + i
      });
    }
    main.commit({
      "message": "Merge branch 'main' of github.com:pjvilloud/ipi-git-200-ex",
      "sha1": "f85c456"
    })
    $("#gitpull2").removeClass("btn-primary").addClass("btn-success");

});

$("#createfixvotrenombranch").click(function(event) {
    fixVilloud = main.branch("fix-villoud");

    $("#createBranchList").addClass("list-group-item-success");
    $("#createfixvotrenombranch").removeClass("btn-primary").addClass("btn-success");
});

$("#commitRemoveNomTxt").click(function(event) {
    fixVilloud.commit({
      message:"Suppression de villoud.txt",
      sha1: "c823be8"
    });
    mainRemote.commit({
      message:"Modification mineure",
      sha1: "c823be8"
    });
    $("#commitRemoveNomTxt").removeClass("btn-primary").addClass("btn-success");

});

$("#commitIntermediaire").click(function(event) {
    main.commit({
      message:"Modification mineure",
      sha1: "c823be8"
    });
    $("#commitIntermediaire").removeClass("btn-primary").addClass("btn-success");

});

$("#commitIntermediaireMerge").click(function(event) {
    main.merge(fixVilloud, {
      sha1: "396e5fc"
    });
    $("#commitIntermediaireMerge").removeClass("btn-primary").addClass("btn-success");

});

$("#mergeFixNomTxtmain").click(function(event) {
    fixVilloud.merge(main, {
      sha1: "9e5d299"
    });
    $("#mergeFixNomTxtmain").removeClass("btn-primary").addClass("btn-success");

});

$("#deleteBranch").click(function(event) {
    fixVilloud.delete();
    $("#deleteBranch").removeClass("btn-primary").addClass("btn-success");

});

$("#deleteBranch").click(function(event) {
    fixVilloud.delete();
    $("#deleteBranch").removeClass("btn-primary").addClass("btn-success");

});

$("#finalGitPush").click(function(event) {
    mainRemote.commit({
      message:"Suppression de villoud.txt",
      sha1: "c823be8"
    });
    mainRemote.commit({
      message:"Merge branch 'main' into 'fix-villoud'",
      sha1: "396e5fc"
    });
    mainRemote.commit({
      message:"Merge branch 'fix-villoud' into 'main'",
      sha1: "9e5d299"
    });
    $("#finalGitPush").removeClass("btn-primary").addClass("btn-success");

});


$("#forkRepo").click(function(event) {
  graphRemote = new GitGraph({
    template: myTemplate,
    reverseArrow: false,
    orientation: "vertical",
    elementId: "gitGraphFork",
    mode: "compact"
  });
  mainRemote = graphRemote.branch("votreuser:main (origin)");
  mainRemote.commit({
    message: "Initial commit",
    sha1: "acf091c"
  });
  $("#forkRepo").removeClass("btn-outline-secondary").addClass("btn-outline-success");

});

$("#forkRepoClone").click(function(event) {
  graphLocal = new GitGraph({
    template: myTemplate,
    reverseArrow: false,
    orientation: "vertical",
    elementId: "gitGraphLocal",
    mode: "compact"
  });
  main = graphLocal.branch("main");
  main.commit({
    message: "Initial commit",
    sha1: "acf091c"
  });
  $("#forkRepoClone").removeClass("btn-primary").addClass("btn-success");

});

$("#forkRepoCommit").click(function(event) {
  main.commit({
    message: "mes modifications",
    sha1: "ae543d8"
  });
  $("#forkRepoCommit").removeClass("btn-primary").addClass("btn-success");

});

$("#forkRepoCommitPush").click(function(event) {
  mainRemote.commit({
    message: "mes modifications",
    sha1: "ae543d8"
  });
  $("#forkRepoCommitPush").removeClass("btn-primary").addClass("btn-success");

});

$("#forkAddRemote").click(function(event) {
  graphFork = new GitGraph({
    template: myTemplate,
    reverseArrow: false,
    orientation: "vertical",
    elementId: "gitGraphRemote",
    mode: "compact"
  });
  mainFork = graphFork.branch("pjvilloud:main (upstream)");
  mainFork.commit({
    message: "Initial commit",
    sha1: "acf091c"
  });
  mainFork.commit({
    message: "Autres modifications",
    sha1: "645de96"
  });
  $("#forkAddRemote").removeClass("btn-primary").addClass("btn-success");

});

$("#forkRepoMergeUpstream").click(function(event) {
  main.commit({
    message: "Autres modifications",
    sha1: "645de96"
  });
  main.commit({
    message: "Merge remote-tracking branch 'upstream/main'",
    sha1: "da8645e"
  });
  $("#forkRepoMergeUpstream").removeClass("btn-primary").addClass("btn-success");

});

$("#mergePR").click(function(event) {
  mainFork.commit({
    message: "Merge pull request #1 from votreuser/main",
    sha1: ""
  });
  $("#mergePR").removeClass("btn-primary").addClass("btn-success");
});

$("#forkRepoCommitPush2").click(function(event) {
  mainRemote.commit({
    message: "Autres modifications",
    sha1: "645de96"
  });
  mainRemote.commit({
    message: "Merge remote-tracking branch 'upstream/main'",
    sha1: "da8645e"
  });
  $("#forkRepoCommitPush2").removeClass("btn-primary").addClass("btn-success");

});




$("#deleteFixNomTxt").click(function(event) {
    fixVilloud.delete();
    var branches = [];
    for (var i = 0; i < noms.length; i++) {
      (function(index) {
          setTimeout(function() {
            branches[index] = mainRemote.branch("fix-" + noms[index]);
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
      branches[2].merge(mainRemote);
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
  if($(currentStep).attr("id") === "branches-exemples"){
    graphRemote = new GitGraph({
      template: myTemplate,
      reverseArrow: false,
      orientation: "vertical",
      elementId: "gitGraphRemote",
      mode: "compact"
    });
    mainRemote = graphRemote.branch("origin/main");
    mainRemote.commit({
      "message": "Merge branch 'main' of github.com:pjvilloud/ipi-git-200-ex",
      "sha1": "f85c456"
    })

    graphLocal = new GitGraph({
      template: myTemplate,
      reverseArrow: false,
      orientation: "vertical",
      elementId: "gitGraphLocal",
      mode: "compact"
    });
    main = graphLocal.branch("main");
    main.commit({
      "message": "Merge branch 'main' of github.com:pjvilloud/ipi-git-200-ex",
      "sha1": "f85c456"
    })
  }
  else if($(currentStep).attr("id") === "changements-pull"){
    graphLocal = new GitGraph({
      template: myTemplate,
      reverseArrow: false,
      orientation: "vertical",
      elementId: "gitGraphLocal",
      mode: "compact"
    });
    main = graphLocal.branch("main");
    main.commit({
      message: "Initial commit",
      sha1: "acf091c"
    });

    graphRemote = new GitGraph({
      template: myTemplate,
      reverseArrow: false,
      orientation: "vertical",
      elementId: "gitGraphRemote",
      mode: "compact"
    });
    mainRemote = graphRemote.branch("main");
    mainRemote.commit({
      message: "Initial commit",
      sha1: "acf091c"
    });

  }
  else if($(currentStep).attr("id") === "autres-fork"){
    graphFork = new GitGraph({
      template: myTemplate,
      reverseArrow: false,
      orientation: "vertical",
      elementId: "gitGraphRemote",
      mode: "compact"
    });
    mainFork = graphFork.branch("pjvilloud:main");
    mainFork.commit({
      message: "Initial commit",
      sha1: "acf091c"
    });
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
