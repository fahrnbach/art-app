// &Notes
// !It’s worth remembering that the repeat() function sometimes produces buggy transitions,
// !which is why I set the width of each column individually (i.e. grid-template-columns: 1fr 1fr 1fr).
// ^CLEANUP remove all 'js-posts' 'js-comments' etc from the children elements. Set display to inherit. Probably speeds up JS code ~@ 03-06-2024 18:47 $.05
// & Controls
const animationSpeedMS = 2500;
const progressTimeM = 10;
const progressTimeS = progressTimeM * 60;
const progressTimeMultiplierS = 1;
const globalViewPercentScale = 50;
// #region Initialize & Time Functions
// !I wonder if there is a better way?
// !Use for gallery mode, but allow infinite profile viewing?
// & Initialize time
    var initTime = new Date();

// ! Setting the time for the timer function Set time on server eventually?
function getTimeElapsed () {
    let now = new Date();
    let timeElapsedMS = Math.floor(now - initTime);
    let timeElapsedS = timeElapsedMS / 1000;
    return timeElapsedS
}

function setProgressTime ( pageTimer, modifierSpeed) {
    let percentDivider = (pageTimer/100) * modifierSpeed / 100
    let timePercentPre = (getTimeElapsed() / 100) / percentDivider;
    let timePercent = Math.floor(timePercentPre);
    setProgress(timePercent)
    // console.log(timePercent)
    return timePercent
}

function setIntervalProgressTime(timerLengthPage, timerLengthModifier ) {
    // &need to have this run 100 times to update the percent in 1/100th increments
    let totalTime = (timerLengthPage/100 * timerLengthModifier)
    let setIntervalTime = 1000 * totalTime
    var setIntervalTimer = setInterval(setProgressTime, setIntervalTime, timerLengthPage, timerLengthModifier);
    setTimeout(() => {
        clearInterval(setIntervalTimer)
    }, timerLengthPage * 1000);
}


setIntervalProgressTime(progressTimeS, progressTimeMultiplierS);

// #endregion
// & Selectors
// ac tools
var acfw = document.querySelector(".ac-fw");
var acbw = document.querySelector(".ac-bw");
var ac = document.querySelectorAll(".ac");
var aci = document.querySelectorAll(".aci");
// Plus the input in the Progress() Function
// & END AC tools
// let buttons = document.querySelectorAll('.circles-button > .circles')
// Settings
var button1 = document.getElementById("n1-circles-button-info");
var posts = document.querySelectorAll(".js-posts");
// var home = document.querySelectorAll(".js-home");
var comments = document.querySelectorAll(".js-comments");
var messages = document.querySelectorAll(".js-messages");
var myProfile = document.querySelectorAll(".js-my-profile");
var favorites = document.querySelectorAll(".js-favorites");
var about = document.querySelectorAll(".n1-about");
// Settings Exit / Open
var xitButton = document.querySelector(".n1-xit-button");
var settingsPanel = document.querySelector(".n1-nav-container");
// Gallery Pager
// var rightNav = document.querySelectorAll('.n1-right-card');
// var contentImage = document.querySelectorAll('.n1-content');
// called in gallerypagerlive
var contentPanelGetter = document.querySelectorAll(".n1-content-panel");
var contentPanel = [...contentPanelGetter];
var contentPanelLoading = document.querySelector(".n1-content-panel.jsLoading");
// Windows
var navContainer = document.querySelectorAll(".n1-nav-container");
var navContainer2 = document.querySelectorAll(".n2-nav-container");
var navContainer3 = document.querySelectorAll(".n3-nav-container");
var spacer = document.querySelectorAll(".spacer");
var background = document.querySelectorAll(".background");

var siteNavGallery = document.querySelector(".site-nav-gallery");
var siteNav = document.querySelector(".site-nav");
var siteNavBG = document.querySelector(".site-nav-bg")
// Right Panel Scroller
var nav1RightPanel = document.querySelector(".n1-right-panel");
var nav1RightPanelLoading = document.querySelector(".n1-right-panel-jsLoading");
var profilePic = document.querySelector("circle.svg-profile-picture");

profilePic.addEventListener('click', () => {
  var session = {
    audio: true,
    video: false
  };
  var recordRTC = null;
  console.warn('Add Camera Functionality HERE')
})                                                
//////! Add camera functionality HERE
  
var nav1RightPanelLoadingBottom = document.querySelector(
  ".n1-right-panel-jsLoading.js2"
);
var navArrayGetter = document.querySelectorAll(".n1rp");
var navArray = [...navArrayGetter];

var fullScreen = document.querySelector('.fullscreen-background')
var isFullScreen = false
acbw.addEventListener('click', () => {
    isFullScreen = !isFullScreen
    if(isFullScreen) {
        fullScreen.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
})

// #region UtilityFx (Throttle)
// & Throttle
function Throttle(func, duration) {
  let shouldWait = false;
  return function (...args) {
    if (!shouldWait) {
      func.apply(this, args);
      shouldWait = true;

      setTimeout(() => {
        shouldWait = false;
      }, duration);
    }
  };
}
// #endregion
// #region Final Test
// & Pullbutton animation
// & Fun Little Pullbutton animation

// var pullButton = document.querySelector('.pull');
// pullButton.addEventListener('click', (e) => {
//     settingsPanel.classList.toggle('n1-nav-container-jsSettings');
//     pullButton.classList.toggle('jsSettingsSpin')
// });
// !comment this ⬆️ back in to see what all needs to be cleaned up
// #endregion
// #region Settings Open & Gear Animation
// &settings open + gear animation
var settingsButton = document.querySelector(".jsSettings");
settingsButton.addEventListener("click", (e) => {
  settingsPanel.classList.toggle("n1-nav-container-jsSettings");
  settingsButton.classList.toggle("jsSettingsSpin");
});

// var pullButton = document.querySelector('.pull');
// pullButton.addEventListener('click', (e) => {
//     // settingsPanel.classList.toggle('n1-nav-container-jsSettings');
//     pullButton.classList.toggle('jsPullSpin')
// });
// #region Windowed Mode Toggle & Triangle Animation
// &Menu Controls (Settings, Windowed Mode, Gallery Mode) + Button Spin animation
var pullButton = document.querySelector(".pull");
var galleryButton = document.querySelector(".galleryMode");
var background = document.querySelector(".background");
var navOuterMenu = document.querySelector(".n1-nav-outer");
galleryButton.addEventListener("click", (e) => {
    let scale = 150;
    let transition = 1.5;
    galleryButton.classList.toggle("jsPullSpin");
    navContainer.forEach((e) => {
        e.style.transition = `${transition}s`;
        e.style.transform = `scale(${scale}%)`;
        e.style.opacity = '0';
        setTimeout(() => {
            e.style.display  = 'none'
        }, transition * 1000);
      });
      navContainer2.forEach((e) => {
        e.style.transition = `${transition}s`;
        e.style.transform = `scale(${scale}%)`;
        e.style.opacity = '0';
        setTimeout(() => {
            e.style.display  = 'none'
        }, transition * 1000);
      });
      navContainer3.forEach((e) => {
        e.style.transition = `${transition}s`;
        e.style.transform = `scale(${scale}%)`;
        e.style.opacity = '0';
        setTimeout(() => {
            e.style.display  = 'none'
        }, transition * 1000);
      });
});

pullButton.addEventListener("click", (e) => {
  let scale = globalViewPercentScale;
  let scaleOuter = 100 / (scale / 100);
  background.style.overflowY = "scroll";
  pullButton.classList.toggle("jsPullSpin");
  navOuterMenu.style.setProperty("--widthScale", `${scaleOuter}vw`);
  navOuterMenu.style.setProperty("--heightScale", `${scaleOuter}vh`);

  background.classList.add('jsBackgroundMenu')
  siteNavGallery.classList.add('JSSiteNavGalleryVisible');
  siteNav.classList.add('JSSiteNavVisible');
  siteNavBG.classList.add('JSSiteNavVisible');

  navContainer.forEach((e) => {
    // e.style.transform = `scale(${scale}%)`;
    e.classList.add('n1-nav-container-jsProfile')
  });
  navContainer2.forEach((e) => {
    // e.style.transform = `scale(${scale}%)`;
    // e.style.opacity = "1";
  });
  navContainer3.forEach((e) => {
    e.style.transform = `scale(${scale}%)`;
  });
});

window.addEventListener("pointerup", (event) => {
  accessabilityCheck = event.target.classList.contains("ac");
  accessabilityCheck2 = event.target.classList.contains("aci");
  // Check if card is being clicked, or the container
  if (
    !event.target.classList.contains("n1-nav-outer") &&
    !accessabilityCheck &&
    !accessabilityCheck2
  ) {
    // background.classList.remove('jsBackgroundMenu')
    siteNavGallery.classList.remove('JSSiteNavGalleryVisible');
    siteNav.classList.remove('JSSiteNavVisible');
    siteNavBG.classList.remove('JSSiteNavVisible');

    navContainer.forEach((e) => {
      e.style.transform = "scale(100%)";
      e.classList.remove('n1-nav-container-jsProfile')
    });
    navContainer2.forEach((e) => {
      e.style.transform = "scale(100%)";
    });
    navContainer3.forEach((e) => {
      e.style.transform = "scale(100%)";
    });
    spacer.forEach((e) => {
      e.style.transform = "scale(100%)";
    });
    pullButton.classList.add('jsPullSpin')
  }
});
// #endregion
// #region Border Glow and Spotlight
// &Right Menu Buttons Border Glow & Window Spotlight Hover & Left Menu Title Opacity
var rightMenuBorder = document.querySelector(".n1-right-menu-border");
var about2 = document.querySelectorAll(".n1-about2");
var logo = document.querySelector(".n1-logo");
var n1Cards = document.querySelector('.n1-cards')
var timeOut;
window.addEventListener("mousemove", function (e) {
    clearTimeout(timeOut);
    let rect = background.getBoundingClientRect();
    let rect2 = rightMenuBorder.getBoundingClientRect();
    let rect3 = siteNav.getBoundingClientRect()
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let x2 = x - rect2.left;
    let y2 = y - rect2.top;
    
    
    background.style.setProperty("--xPos", `${x}px`);
    background.style.setProperty("--yPos", `${y}px`);
    rightMenuBorder.style.setProperty("--xPos", `${x2}px`);
    rightMenuBorder.style.setProperty("--yPos", `${y2}px`);
    siteNav.style.setProperty("--xPos", `${x}px`);
    siteNav.style.setProperty("--yPos", `${y}px`);
    if (e.target.classList.contains('js-animated') ||
    e.target.classList.contains('n1-cards') &&
    !e.target.classList.contains('n1-header1'))
    {
            logo.classList.add('js-logo');
            // about2.forEach((e) => {
            //     e.style.opacity = '0'
            // })
        } else {
        timeOut = setTimeout(function(){
            logo.classList.remove('js-logo')
            // about2.forEach((e) => {
            //     e.style.opacity = '1'
            // })
        }, 10000); 
    }
});
//#endregion
// #region Progress, Animation & Inputs
// &  Profile Progress Ring + Right Nav Scroll Animation
var circle = document.querySelector(".svg-profile-ring-circle");
var circleHighlight = document.querySelector(
  ".svg-profile-ring-circle-highlight"
);
var circleEndAnimation = document.querySelector(
  ".svg-profile-ring-circle-end-animation"
);
//
var circleLoading = document.querySelectorAll(
  ".svg-profile-ring-circle.jsLoading"
);
var circleHighlightLoading = document.querySelectorAll(
  ".svg-profile-ring-circle-highlight.jsLoading"
);
var circleEndAnimationLoading = document.querySelectorAll(
  ".svg-profile-ring-circle-end-animation.jsLoading"
);
// !Use Classes to reduce the number of rings selected
// !Use Classes to reduce the number of rings selected
// !Use Classes to reduce the number of rings selected
//
var radius = circle.r.baseVal.value;
var radiusHighlight = circleHighlight.r.baseVal.value;
//
var radiusLoading = circleLoading[0].r.baseVal.value;
var radiusHighlightLoading = circleHighlightLoading[0].r.baseVal.value;
//
var circumference = radius * 2 * Math.PI;
var circumferenceHighlight = radiusHighlight * 2 * Math.PI;
//
var circumferenceLoading = radiusLoading * 2 * Math.PI;
var circumferenceHighlightLoading = radiusHighlightLoading * 2 * Math.PI;

// Setting strokeDasharray & strokeDashoffset makes two circles. One visible, one hidden

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;
circleHighlight.style.strokeDasharray = `${circumferenceHighlight} ${circumferenceHighlight}`;
circleHighlight.style.strokeDashoffset = circumferenceHighlight;
//
circleLoading.forEach((e) => {
  e.style.strokeDasharray = `${circumferenceLoading} ${circumferenceLoading}`;
  e.style.strokeDashoffset = circumferenceLoading;
});
circleHighlightLoading.forEach((e) => {
  e.style.strokeDasharray = `${circumferenceHighlightLoading} ${circumferenceHighlightLoading}`;
  e.style.strokeDashoffset = circumferenceHighlightLoading;
});

// initializing nav and content styles by index
// Take care of all of this with css classes rather than adding things by js
// ! You will need a class for the one above, the active, the one below, the one on top, and all of the rest.
// !Everywhere there is a for each is likely a clue that classes could be used to reduce memory use
navArray[0].style.top = "0";
navArray[0].style.display = "grid";
navArray[1].style.top = "100vh";
navArray[2].style.display = "none";
navArray[3].style.display = "none";
// Added explicit transition and opacity for pageload fadein
// introduces ANOTHER bug where the rightNav usernames all flash first.
contentPanel[0].style.animation = "js-fadeIn 2s";
// contentPanel[0].style.opacity = '1'
// contentPanel[0].classList.add('jsOpaqueFadeIn');
// Set a default rule in CSS!
// for display none

navArray[0].classList.add("jsNavInDisplay");
galleryPagerLive();
function setProgress(percent) {
  if (percent == 0) {
    galleryPagerLive();
  }
  var direction = "forwards";

  var offset = circumference - (percent / 100) * circumference;
  var offsetHighlight =
    circumferenceHighlight - (percent / 100) * circumferenceHighlight;
  //
  var offsetLoading =
    circumferenceLoading - (percent / 100) * circumferenceLoading;
  var offsetHighlightLoading =
    circumferenceHighlightLoading -
    (percent / 100) * circumferenceHighlightLoading;
  navArray[0].classList.add("jsNavInDisplay");
  ////
  circleLoading.forEach((e) => {
    e.style.strokeDashoffset = offsetLoading;
  });
  circleHighlightLoading.forEach((e) => {
    e.style.strokeDashoffset = offsetHighlightLoading;
  });
  circle.style.strokeDashoffset = offset;
  circleHighlight.style.strokeDashoffset = offsetHighlight;
  //
  if (percent < 99) {
    circleEndAnimation.style.opacity = "0";

    circleEndAnimationLoading.forEach((e) => {
      e.style.opacity = "0";
    });
  }

  if (percent >= 90) {
    circleEndAnimation.style.strokeDasharray = `${circumference + 5} 10`;
    circleEndAnimation.style.opacity = "1";
    //
    circleEndAnimationLoading.forEach((e) => {
      e.style.strokeDasharray = `${circumferenceLoading + 5} 10`;
      e.style.opacity = "1";
    });
  }
  // Check for Percent is Even, With Modulo
  if (percent != 100 && percent >= 90 && percent % 2 == 0) {
    circleEndAnimation.style.strokeDasharray = "1 1";
    circleEndAnimation.style.opacity = "0";
    //
    circleEndAnimationLoading.forEach((e) => {
      e.style.strokeDasharray = "1 1";
      e.style.opacity = "0";
    });
  }
  if (percent != 100 && percent >= 90 && percent % 2 != 0) {
    circleEndAnimation.style.opacity = "1";
    //
    circleEndAnimationLoading.forEach((e) => {
      e.style.opacity = "1";
    });
  }
  if (percent != 100) {
    nav1RightPanel.style.animation = "none";
    nav1RightPanelLoading.style.animation = "none";
  }
  if (percent == 100) {
    // ! Percent is being set below to control the setProgess() animation
    // var animationSpeedMS = 2000
    // ! DONTDELETE Moved to the top for easy adjustment
    // &Default Value Below
    // var animationSpeedMS = 2000
    // Adjust animation speed in ms
    var animationSpeedS = animationSpeedMS / 1000;
    circleEndAnimation.style.strokeDasharray = "1 10";
    circleEndAnimation.style.strokeDashoffset = "200";
    //
    circleEndAnimationLoading.forEach((e) => {
      e.style.strokeDasharray = "1 10";
    });
    ContentPanelAnimation((animationSpeedMS * 2) / 1000);
    setTimeout(() => {
      navArray[0].style.animation = `js-rightNavScrollUp ${animationSpeedS}s linear 1s`;

      navArray[1].style.animation = `js-rightNavScrollUp2 ${animationSpeedS}s linear 1s`;
    }, animationSpeedMS + 1);
  }
  // On animation End Set Display of RightNav Card 1 to None / RightNavCard 2 to Initial
  nav1RightPanel.addEventListener("animationend", (event) => {});
  onanimationend = (event) => {
    if (
      event.animationName === "js-rightNavScrollUp" &&
      direction === "forwards"
    ) {
    }
    if (
      percent == 100 &&
      event.animationName === "js-rightNavScrollUp" &&
      direction === "forwards"
    ) {
      // TODO fixed animation fill mode, but need to change the others to do the same
      // & could also probably use a settimeout function instead of listening for the animation end
    }

    if (
      percent == 100 &&
      event.animationName === "js-rightNavScrollUp2" &&
      direction === "forwards"
    ) {
      // console.dir(navArray)
      navArray[0].classList.remove("jsNavInDisplay");
      navArray[0].style.animation = "none";
      navArray[1].style.animation = "none";
      navArray[0].style.display = "none";
      navArray[0].style.top = "-100vh";
      navArray[1].style.top = "0";
      navArray[1].style.display = "grid";
      navArray[2].style.display = "grid";
      navArray[2].style.top = "100vh";
      navArray.push(navArray.shift());
      // add another event listener to content panel instead of tying these animation events together

      setTimeout(() => {
        // & Waiting for animations to finish
        setProgress(99);
        // & Allowing time for scroll animation and transformations to finalize
        setTimeout(() => {
          setProgress(0);
        //   & Waiting for progress animation to un-spin & resetting init time
          setTimeout(() => {
                initTime = new Date();
                setIntervalProgressTime(progressTimeS, progressTimeMultiplierS);
          }, 3000)
        }, 300);
      }, animationSpeedMS);
    }
  };
}

const input = document.querySelector(".progress");
setProgress(input.value);

input.addEventListener("change", function (e) {
  if (input.value < 101 && input.value > -1) {
    setProgress(input.value);
  }
});

// & Content Panel Animation (Called in the nav slider animation)

async function ContentPanelAnimation(speed) {
  if (typeof speed === "number") {
    let speedMS = speed * 1000;
    contentPanel[0].style.animation = `js-fadeOut ${speed}s`;
    setTimeout(() => {
      // contentPanel[0].classList.remove('.jsDisplayContent')
      contentPanel[0].style.display = "none";
      contentPanel[0].classList.remove("jsDisplayContent");
      // contentPanel[1].classList.add('.jsDisplayContent')
      contentPanel[1].classList.add("jsDisplayContent");
      contentPanel[1].style.display = "block";
      contentPanel[1].style.animation = `js-fadeIn ${speed}s`;
      contentPanel.push(contentPanel.shift());
      setTimeout(() => {
        contentPanel[0].style.opacity = "1";
      }, speedMS);
    }, speedMS);
  }
}
//#endregion
// #region KeyboardShortcuts
window.addEventListener("keyup", (event) => {
  if (event.isComposing || event.key === 229) {
    return;
  }
  if (event.key === "ArrowUp") {
    // background.forEach(e => {
    //     e.scrollBy({
    //         top: -100,
    //         left: 0,
    //         behavior : "smooth"

    //     })
    // })
    // background.forEach(e => {
    //     e.style.overflowY = 'scroll';
    // })
    navContainer.forEach((e) => {
      e.style.display = "grid";
      e.style.transform = ` scale(90%)`;
      e.style.opacity = "1";
    });

    navContainer2.forEach((e) => {
      e.style.display = "grid";
      e.style.transform = ` scale(90%)`;
      e.style.opacity = "1";
    });
    navContainer3.forEach((e) => {
      e.style.transform = ` scale(90%)`;
      e.style.display = "grid";
    });
  }
  if (event.key === "ArrowDown") {
    // background.forEach(e => {
    //     e.scrollBy({
    //         top: 100,
    //         left: 0,
    //         behavior : "smooth"

    //     })
    // })
    // background.forEach(e => {
    //     e.style.overflowY = 'scroll';
    // })
    navContainer.forEach((e) => {
      e.style.transform = "scale(90%)";
    });
    navContainer2.forEach((e) => {
      e.style.transform = "scale(90%)";
      e.style.opacity = "1";
    });
    navContainer3.forEach((e) => {
      e.style.transform = "scale(90%)";
    });
  }
});

//   ?Accessability remote
// ?Controllable / Openable by keyboard shortcut //

ac[0].addEventListener("mousedown", mouseDown, false);
ac[0].addEventListener("click", (event) => {
  if (event.target.classList.contains("aci")) {
    ac[0].classList.toggle("ac-expanded");
  }
  if (event.target.classList.contains("ac")) {
    ac[0].classList.add("ac-expanded");
  }
});
ac[0].addEventListener("dblclick", () => {
  ac[0].classList.toggle("ac-expanded");
});

window.addEventListener("mouseup", mouseUp, false);

function mouseUp() {
  window.removeEventListener("mousemove", divMove, true);
}

function mouseDown(e) {
  window.addEventListener("mousemove", divMove, true);
}

function divMove(e) {
  var h = ac[0].getBoundingClientRect().height;
  var w = ac[0].getBoundingClientRect().width;
  ac[0].style.position = "absolute";
  ac[0].style.top = e.clientY - h / 1.5 + "px";
  ac[0].style.left = e.clientX - w / 1.5 + "px";
}
//#endregion
// #region Settings Pager
var settingsPages = [posts, comments, messages, myProfile, favorites];
let settingsButtons = document.querySelectorAll(
  ".n1-circles-button > .n1-circles"
);
// ! small bug/easter egg where (probably due to css animation)
// !if you click the second settings nav button before the animation finishes.
// ! bug from having all images visible from the start (it looks kind of cool though!).
// Bugfix
// !!!JS is setting content to display block instead of display grid! Bug solution!
// Controls which view is displayed.
// Takes two arrays of : Controllers / Views.
// Adds an event listener to each Controller Element.
// Works via overlapping indexes. Where C0 = V0 display = 'block'.
///////////////////////////
// ~ Add Enter key Functionality

// ['click','ontouchstart'].forEach( evt =>
//     element.addEventListener(evt, dosomething, false)
// );

// & Settings Pager

// Helper function for controlling opacity of settings Title & Revealing Logo
function makeAbout2Opaque () {
    about2.forEach((e) => {
        e.style.opacity = '1'
    })
    // logo.classList.remove('js-logo')
}
// function addWidthAnimation () {
//     settingsPages[2].style.width = '100%'
// }
// settingsButtons[2].addEventListener('click', addWidthAnimation())

function settingsPager(controllers, views) {
  try {
    // Default View
    views[0].forEach((element) => {
      element.style.display = "block";
      element.classList.add("js-animated");
    });
    controllers.forEach(function (value, index) {
      // console.log('Button' + zindex)
      views.forEach(function (value2, vindex) {
        // console.log('Page' + index)
        controllers[index].addEventListener("pointerup", function () {
            // Makes
            makeAbout2Opaque();
          // Error Handling
          if (index > views.length - 1)
            throw RangeError(
              `There are ${controllers.length} Controllers. 
                    There are ${views.length} Views
                    You Have More Controllers Than Views!
                    This Button Does NOT Have a View!`
            );
          // Error Handling
          if (vindex > controllers.length - 1)
            throw RangeError(
              `There are ${controllers.length} Controllers. 
                    There are ${views.length} Views
                    You Have More Views Than Handlers!
                    This Button Does NOT Have a View!`
            );
          // Index Checker
          if (index !== vindex) {
              views[index].forEach((element) => {
              element.style.display = "block";
              element.classList.add("js-animated");
              // change the animation?
              views[vindex].forEach((e) => {
                e.style.display = "none";
              });
            });
          }
        });
      });
    });
  } catch (err) {
    console.log(`Unknown Error Occurred!`);
  }
}
//#endregion
// #region Gallery Pager
// & Gallery Pager
// ^var rightNav = document.querySelectorAll('.n1-right-card');
// ^var contentImage = document.querySelectorAll('.n1-content');
// ^var contentPanel = document.querySelector('.n1-content-panel');
// ^var contentPanelLoading = document.querySelector('.n1-content-panel.jsLoading');
//  galleryPager(rightNav, contentImage);

function galleryPagerLive() {
  let controller = document.querySelectorAll(
    ".n1rp.jsNavInDisplay > .n1-right-nav > .n1-right-card"
  );
  let view = document.querySelectorAll(
    ".n1-content-panel.jsDisplayContent > .n1-content"
  );
  galleryPager(controller, view);
}

function galleryPager(controllers, views) {
  // ! Uncomment to highlight the first card on load ⬇️
  // controllers[0].classList.add('js-right-card')
  views[0].style.display = "block";
  // views[0].classList.add('js-animated')
  controllers.forEach(function (value, index) {
    // console.log('Button' + zindex)
    views.forEach(function (value2, vindex) {
      // console.log('Page' + index)
      controllers[index].addEventListener("pointerup", function () {
        // Error Handling
        if (index > views.length - 1)
          throw RangeError(
            `There are ${controllers.length} Controllers. 
                    There are ${views.length} Views
                    You Have More Controllers Than Views!
                    These Must Match!`
          );
        // Error Handling
        if (vindex > controllers.length - 1)
          throw RangeError(
            `There are ${controllers.length} Controllers. 
                    There are ${views.length} Views
                    You Have More Views Than Handlers!
                    These Must Match!`
          );
        // Index Checker
        if (index !== vindex) {
          views[index].style.display = "block";
          views[index].classList.add("js-animated");
          views[vindex].style.display = "none";
          controllers[vindex].classList.remove("js-right-card");
        }
        if (index == vindex) {
          controllers[vindex].classList.toggle("js-right-card");
        }
      });
    });
  });
}
//#endregion

settingsPager(settingsButtons, settingsPages);
// galleryPager(rightNav, contentImage);
// settingsPager(rightNav, contentImage);

commentsCards = document.querySelectorAll('.n1-comments-card')
commentsCardsArray = [...commentsCards]
// function EngageMeteorShowerMode() {
//     commentsCardsArray[0].classList.toggle('js-waterfall-active');
//     setTimeout(() => {
//         commentsCardsArray[0].classList.toggle('js-waterfall-active');
//         commentsCardsArray.push(commentsCardsArray.shift());
//     }, 2400);
// }

function EngageMeteorShowerMode() {
    commentsCardsArray[0].classList.toggle('js-waterfall-active');
    setTimeout(() => {
        commentsCardsArray[0].classList.toggle('js-waterfall-active');
        commentsCardsArray.push(commentsCardsArray.shift());
    }, 2400);
}

// &Waterfall Mode Button

// xitButton.addEventListener('click', Throttle(function () {
//     commentsCards.forEach(e => {
//         e.classList.toggle('js-waterfall');
//     });
// }), 300)

//  Profile Progress Circle + Card Animation
// Getting the radius/circumference for setting Dasharray and Dashoffset
// function progressSetter() {

// }
