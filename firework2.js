
window.addEventListener('DOMContentLoaded', (event) =>{


    let mouse = false
    let tapper = false

    let enemies = []
    let score = 0

    let splat = -1
    let enemyspawn = 0.009
    let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });


 let tutorial_canvas = document.getElementById("tutorial");
 let splatbtn = document.getElementById("splat");

 splatbtn.onclick = splatflip

 function splatflip(){
     splat*= -1
 }

    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

 //   tutorial_canvas_context.scale(.1, .1);  // this scales the canvas
    tutorial_canvas.style.background = "#000000"




 let flex = tutorial_canvas.getBoundingClientRect();

 // Add the event listeners for mousedown, mousemove, and mouseup
 let tip = {}
 let xs
 let ys
 let tap = {}
 let xz
 let yz


 
 window.addEventListener('mousedown', e => {
    flex = tutorial_canvas.getBoundingClientRect();


    xs = e.clientX - flex.left;
    ys = e.clientY - flex.top;
      tip.x = xs
      tip.y = ys

      tip.body = tip

    if(mainguy.health ==0){
        if(squarecircle(restart, tip)){
            enemies = []
            score = 0
            mainguy.body.x = 350
            mainguy.body.y = 350
            mainguy.shots = []
            mainguy.deathrays = []
            mainguy.health = 1
            enemyspawn = 0.009
        }
    }

    //   mainguy.firing+= 1
    //   mainguy.gun.fire(tip)

      mouse = true

   window.addEventListener('mousemove', beamdrag);
 });



 window.addEventListener('mouseup', e => {
     mouse = false
    window.removeEventListener("mousemove", beamdrag);
    window.removeEventListener("mousehold", beamdrag);
 })

 function beamdrag(e) {
    flex = tutorial_canvas.getBoundingClientRect();


    xs = e.clientX - flex.left;
    ys = e.clientY - flex.top;
      tip.x = xs
      tip.y = ys

      tip.body = tip

      mainguy.firing+= 1
      mainguy.gun.fire(tip)
  }


  function beamdragx(e) {
    flex = tutorial_canvas.getBoundingClientRect();


    for(let q = 0; q<enemies.length; q++){
        enemies[q].body.color =getRandomLightColor()
    }


    xs = e.targetTouches[0].pageX - flex.left;
    ys = e.targetTouches[0].pageY - flex.top;


    // xs = Math.random()*tutorial_canvas.width// touchItem.clientX// - flex.left;
    // ys = Math.random()*tutorial_canvas.height//touchItem.clientY// - flex.top;
      tap.x = xs
      tap.y = ys

      tap.body = tap

      mainguy.firing+= 1
      mainguy.gun.fire(tap)
  }



 
 window.addEventListener('touchstart', e => {

    flex = tutorial_canvas.getBoundingClientRect();


    xs = e.targetTouches[0].pageX - flex.left;
    ys = e.targetTouches[0].pageY - flex.top;
      tip.x = xs
      tip.y = ys

      tap.body = tap

    if(mainguy.health ==0){
        if(squarecircle(restart, tap)){
            enemies = []
            score = 0
            mainguy.body.x = 350
            mainguy.body.y = 350
            mainguy.shots = []
            mainguy.deathrays = []
            mainguy.health = 1
            enemyspawn = 0.009
        }
    }

    //   mainguy.firing+= 1
    //   mainguy.gun.fire(tip)

      tapper = true

      window.addEventListener('touchmove', beamdragx);
      window.addEventListener('touchhold', beamdragx);
    
 });    

 window.addEventListener('touchend', e => {


    flex = tutorial_canvas.getBoundingClientRect();


    xs = e.targetTouches[0].pageX - flex.left;
    ys = e.targetTouches[0].pageY - flex.top;
      tip.x = xs
      tip.y = ys

      tap.body = tap
    // jumping = 0
    tapper = false
   window.removeEventListener("touchmove", beamdrag);
   window.removeEventListener('touchhold', beamdrag);
    
 });




  class Gun{
      constructor(owner){
        this.rate =  5
        this.owner = owner
        this.bulletsize = 10
        this.bulletspeed = 10
        this.range = 25
      }
      fire(tip){
        //   console.log(tap, tip)
      if(this.owner.firing%this.rate == 0){
            this.owner.shots[ this.owner.shots.length] = new Circle(this.owner.body.x,this.owner.body.y, this.bulletsize,"#ffffff") // make the bullet
            this.owner.shots[this.owner.shots.length-1].health = this.range  //This controlls how far the bullet will go
            //trajectory calculation
            let s = Math.abs(this.owner.body.x - tip.x)
            let b = Math.abs(this.owner.body.y - tip.y)
            for (let k = 0; Math.sqrt(Math.abs(b*b)+Math.abs(s*s)) > this.bulletspeed; k++ ){   //sets speed to maximum from above
            b = b*.9999
            s = s*.9999
            }
            for (let k = 0;Math.sqrt(Math.abs(b*b)+Math.abs(s*s)) < this.bulletspeed; k++ ){ //sets speed to maximum from below
            b = b/.9999
            s = s/.9999
            }  
            //section to determine direction
            if(tip.x > this.owner.body.x){
            this.owner.shots[ this.owner.shots.length-1].xmom = s
            }
            if(tip.x < this.owner.body.x){
            this.owner.shots[ this.owner.shots.length-1].xmom = -s
            }
            if(tip.y< this.owner.body.y){
                this.owner.shots[ this.owner.shots.length-1].ymom = -b
            }
            if(tip.y> this.owner.body.y){
                this.owner.shots[ this.owner.shots.length-1].ymom = b
            }
          }
      }
  }





  class Ship{
      constructor(){
          this.body = new Circle(350,350, 10, "cyan")
          this.shots = []
          this.firing = 0
          this.deathrays = []
          this.health = 1
          this.gun = new Gun(this)
      }
      draw(){
          this.body.draw()
        
          for(let s = 0 ; s<this.shots.length;s++){
            this.shots[s].move()
            this.shots[s].draw()
            this.shots[s].health-=1
          }
          for(let s = 0 ; s<this.deathrays.length;s++){
            this.deathrays[s].move()
            this.deathrays[s].draw()
            this.deathrays[s].radius *= .945
          }
          for(let s = 0 ; s<this.deathrays.length;s++){
              if(this.deathrays[s].radius < .5){
                  this.deathrays.splice(s,1)
              }
          }
          for(let e = 0; e<enemies.length; e++){
          for(let s = 0 ; s<this.deathrays.length;s++){
            if(intersects(enemies[e].body,this.deathrays[s])){
            enemies[e].health -= (this.deathrays[s].radius)*((this.deathrays[s].xmom)+(this.deathrays[s].ymom))*3
            enemies[e].body.xmom += this.deathrays[s].xmom/4
            enemies[e].body.ymom += this.deathrays[s].ymom/4
                  this.deathrays.splice(s,1)
            }
          }
        }
          for(let s = 0 ; s<this.shots.length;s++){


            for(let e = 0; e<enemies.length; e++){
                if(intersects(enemies[e].body,this.shots[s])){
                    enemies[e].health -= (this.shots[s].radius)*(this.gun.bulletspeed)
                    enemies[e].body.xmom += this.shots[s].xmom/3
                    enemies[e].body.ymom += this.shots[s].ymom/3
                    deathanimation(this.shots[s])
                    this.shots.splice(s,1)
                }
              }
          }
          for(let s = 0 ; s<this.shots.length;s++){
              if(this.shots[s].health <= 0){
                deathanimation(this.shots[s])
                  this.shots.splice(s,1)
              }
          }
      }
  }



    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom

        }
    }

    // can be drawn, or moved with friction.  and richochet 
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.ring = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
            tutorial_canvas_context.lineWidth = 1

            if(this.ring == 1){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius*3, 0, (Math.PI*2), true)
            tutorial_canvas_context.stroke(); 

            }
        }
        move(){

            if(!mainguy.deathrays.includes(this)){

                this.xmom*=.99
                this.ymom*=.99
            } else{
                this.xmom*=1.011
                this.ymom*=1.011
            }  //friction ball

            this.x += this.xmom
            this.y += this.ymom

            if(this.x+this.radius > tutorial_canvas.width){

                if(this.xmom > 0){
                this.xmom *= -1
                }

            }
            if(this.y+this.radius > tutorial_canvas.height){
                if(this.ymom > 0){
                this.ymom *= -1
                }

            }
            if(this.x-this.radius < 0){
                if(this.xmom < 0){
                    this.xmom *= -1
                }

            }
            if(this.y-this.radius < 0){

                if(this.ymom < 0){
                    this.ymom *= -1
                }
        
            }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }

    class Enemy{
        constructor(){
            this.body = new Circle(Math.random()*tutorial_canvas.width, Math.random()*tutorial_canvas.height, 14, "red")
            this.health = 40
            // this.gun = mainguy.gun
            this.shots =  []
            this.firing = 0
            this.gun = new Gun(this)
        }
        draw(){
            this.body.draw()
            
        }
    }

    // let x = 0
    // let y = 0

     let circ = new Circle(125, 200, 10, getRandomLightColor(), Math.random()-.5, Math.random()-.5)  // starts with ramndom velocities and color
     let restart = new Rectangle ( 305, 370, 100, 100, "red")
    // rect.ymom = 1


    let mainguy = new Ship()
    // example objects

    let enemy = new Enemy()

    enemies.push(enemy)
    
    enemy = new Enemy()

    enemies.push(enemy)

    

    tutorial_canvas_context.fillStyle =`rgba(0, 0, 0,${15/255})`
// interval, fill this with game logic 
    window.setInterval(function(){ 

        if(splat == 1){

        tutorial_canvas_context.fillStyle =`rgba(0, 0, 0,${15/255})`
        tutorial_canvas_context.fillRect(0,0,tutorial_canvas.width*2,tutorial_canvas.height*2)
        }else{
            tutorial_canvas_context.fillStyle =`rgba(0, 0, 0,${255/255})`
            tutorial_canvas_context.fillRect(0,0,tutorial_canvas.width*2,tutorial_canvas.height*2)
     }   

        if(mainguy.health > 0){

            if(Math.random()<enemyspawn){

                enemy = new Enemy()
            
                if(!intersectsbig(enemy.body, mainguy.body)){
                    enemies.push(enemy)
                }
                    }
            
            
            
            
                    players(mainguy.body)
            
                    mainguy.draw()
            
                    if(mouse == true){
                        mainguy.firing++
                        if(mainguy.firing%mainguy.gun.rate == 0){
                            mainguy.gun.fire(tip)
                        }
                    }else if(tapper == true){
                        mainguy.firing++
                        if(mainguy.firing%mainguy.gun.rate == 0){
                            mainguy.gun.fire(tap)
                        }
                    }
            
                    for(let e = 0; e<enemies.length; e++){
                        enemies[e].body.move()
                        enemies[e].draw()
                        if(intersects(enemies[e].body, mainguy.body)){
                            mainguy.health = 0
                        }
                        enemies[e].body.xmom -=(enemies[e].body.x-mainguy.body.x)/14000
                        enemies[e].body.ymom -=(enemies[e].body.y-mainguy.body.y)/14000
                        // enemies[e].gun.fire(mainguy.body)
                    }
            
                    for(let e = 0; e<enemies.length; e++){
                        if(enemies[e].health <= 0){
            
                            enemyspawn+=0.00005
                            score++
                            deathanimation(enemies[e].body)
                            enemies.splice(e,1)
                        }
                    }
            
            
                    tutorial_canvas_context.font = `${28.5}px Arial`
                    tutorial_canvas_context.fillStyle = "white";
                    tutorial_canvas_context.fillText(`${score}`, 630, 30);
            
            

        }else{

            restart.draw()
            
            tutorial_canvas_context.font = `${28.5}px Arial`
            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.fillText(`Again?`, restart.x+10, restart.y +50);
            
            tutorial_canvas_context.font = `${28.5}px Arial`
            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.fillText(`Dead`, 320, 350);
            tutorial_canvas_context.font = `${28.5}px Arial`
            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.fillText(`Score: ${score}`, 300, 300);
    
    

        }
    }, 5) // length of refresh interval




    // run on any object with x/y attributes in the timer to give them wasd controls
    function players(racer){
        if (keysPressed['w']) {
            if(racer.y>0){
                racer.y -= .7
            }
        }
        if (keysPressed['a']) {
            if(racer.x>0){
                racer.x -= .7
            }
        }
        if (keysPressed['s']) {
            if(racer.y<tutorial_canvas.height){
                racer.y += .7
            }
        }
        if (keysPressed['d']) {
            if(racer.x<tutorial_canvas.width){
                racer.x += .7
            }
        }
        if (keysPressed['f']) {
            mainguy.gun.bulletspeed += .1
            if(mainguy.gun.bulletspeed>10){
                mainguy.gun.bulletspeed = 10
            }
        }
        if (keysPressed['g']) {
            mainguy.gun.bulletsize += .1
            if(mainguy.gun.bulletsize>10){
                mainguy.gun.bulletsize = 10
            }
        }
        if (keysPressed['h']) {
            mainguy.gun.rate -= 1
            if(mainguy.gun.rate<10){
                mainguy.gun.rate = 10
            }
        }


        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }





// can check if one circle contains the cneter of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
function intersects(circle, left) {

    if(typeof circle != "undefined"){
    if(typeof left  != "undefined"){
        
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
    }else{
        return false
    }
    }else{
        return false
    }
}
function intersectsbig(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius*20 * circle.radius;
}

// random color that will be visible on  blac backgroung
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }


// checks if a square contains the centerpoint of a circle
function squarecircle(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

// checks if two squares are intersecting ( not touching, for touching cnange the evaluations from ">" to ">=" etc)
function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}




function deathanimation(body){

    let start = Math.random()

    let rotx = start
    let roty = start

    let deathrays = Math.floor(Math.random()*10)+10

    deathrays = 9

    for(let g = 0; g < deathrays; g++){


        let dot1 = new Circle(body.x, body.y, body.radius, body.color, Math.cos(rotx), Math.sin(roty) )
        dot1.move()
        dot1.move()
        dot1.move()
        dot1.ring = 1
        mainguy.deathrays.push(dot1)

        rotx += 2*Math.PI/deathrays
        roty += 2*Math.PI/deathrays
    }

}






})