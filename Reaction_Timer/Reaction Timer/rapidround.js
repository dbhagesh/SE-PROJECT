
window.onload = function () {

   var bestTime = 10;
   score = 0;
   var start = 10;

   document.getElementById("rules").onclick = function () {
      alert("Try to click the shapes as soon as possible to increase your score");
   }

   function getRandomColor() {

      var x = Math.floor(Math.random() * 100);
      var y = Math.floor(Math.random() * 100);
      var z = Math.floor(Math.random() * 100);

      var randomColorMaker = "rgb(" + x + "," + y + "," + z + ")";

      document.getElementById("shape").style.backgroundColor = randomColorMaker;
   }

   function makeShapeAppear() {

      var top = Math.random() * 200;

      var left = Math.random() * 1150;

      var width = (Math.random() * 400) + 100;

      if (Math.random() < 0.33) {

         document.getElementById("shape").style.borderRadius = "50%";
      } else if (0.33 < Math.random() < 0.66) {

         document.getElementById("shape").style.borderRadius = "30%";
      } else {
         document.getElementById("shape").style.borderRadius = "0%";
      }

      document.getElementById("shape").style.top = top + "px";
      document.getElementById("shape").style.left = left + "px";
      document.getElementById("shape").style.width = width + "px";
      document.getElementById("shape").style.height = width + "px";

      document.getElementById("shape").style.backgroundColor = getRandomColor();

      document.getElementById("shape").style.display = "block";
   }

   function Timeout() {
      setTimeout(makeShapeAppear, Math.random() * 100);
   }
   Timeout();

   function countDown() {
      setTimeout(endRapid, 11000);

   }
   function endRapid() {
      timer = function () { }
      alert("Your Score is : " + score);
      document.getElementById("shape").onclick = "";
   }
   function timer() {
      document.getElementById("timeTaken").innerHTML = start + " sec";
      start--;
      if (start == -1) start = 0;
      setTimeout(timer, 1000);
   }
   document.getElementById("shape").onclick = function () {
      score++;
      if (score === 1) {
         countDown();
         start = 9;
         setTimeout(timer, 1000);
      }
      document.getElementById("shape").style.display = "none";

      document.getElementById("best").innerHTML = score;
      Timeout();
   }

   // exit function
   exit.onclick = function (e) {
      alert("Great, Your Score is: " + score);
   }

}