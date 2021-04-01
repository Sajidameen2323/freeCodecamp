const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const dsplyChr = (el)=>{
  $('#display').html(el)
};

for(let i=0;i<9;i++){
  let bt = '#b'+(i+1);
  $(bt).click(function(){
    dsplyChr(bankOne[i].id)
  })
};


const colorChange = function (ky) {
  $(ky).hover(function () {
    $(ky).toggleClass("bg-success");
  });
};
for (let i = 1; i < 10; i++) {
  let sel = "#b" + i;
  colorChange(sel);
}

//testing audio play on click
const plySnd = function (kys, kyb) {
  let sound = document.querySelector(kys);
  let play = document.getElementById(kyb);

  play.onclick = function () {
    console.log("play");
    sound.play();
    return false;
    
  };
};
for (let i = 1; i < 10; i++) {
  let b = "b" + i;
  let s = ".a" + i;
  plySnd(s, b);
  
};

//adding functions for clicks or presses

document.addEventListener("keypress", function (Event) {
  let ply = (ky)=>{document.querySelector(ky).play();};
  if (Event.keyCode === 81 || Event.which === 81) {  
    ply('.a1');
    dsplyChr(bankOne[0].id);
  }
 if (Event.keyCode === 87 || Event.which === 87) {   
   ply('.a2');
   dsplyChr(bankOne[1].id);
  }
  
    if (Event.keyCode === 69 || Event.which === 69) {  
    ply('.a3');
      dsplyChr(bankOne[2].id);
  }
  
    if (Event.keyCode === 65 || Event.which === 65) {  
    ply('.a4');
      dsplyChr(bankOne[3].id);
  }
  
    if (Event.keyCode === 83 || Event.which === 83) {  
    ply('.a5');
      dsplyChr(bankOne[4].id);
  }
  
    if (Event.keyCode === 68 || Event.which === 68) {  
    ply('.a6');
      dsplyChr(bankOne[5].id);
  }
  
    if (Event.keyCode === 90 || Event.which === 90) {  
    ply('.a7');
      dsplyChr(bankOne[6].id);
  }
  
    if (Event.keyCode === 88 || Event.which === 88) {  
    ply('.a8');
      dsplyChr(bankOne[7].id);
  }
    if (Event.keyCode === 67 || Event.which === 67) {  
    ply('.a9');
      dsplyChr(bankOne[8].id);
  }
});

//
$(".drum-pad").addClass("bg-secondary");
$("#display").addClass("bg-dark");

//adjust volume

$("#rngVolume").on("slidestop", function () {});
$("input[type=range]").on("input", function () {
  var volume = document.querySelector("#rngVolume").value;
 $('#display').html('Volume: '+volume*100);
  for (let i = 1; i < 10; i++) {
    let au = ".a" + i;
    document.querySelector(au).volume = volume;
  }
});



//styling

