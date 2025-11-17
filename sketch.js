//variables globales
var fondo,fondoObjeto;
var kanguro1,kanguro2,kanguro3,kanguroJugador,kanguroRun;
var pisoInvisible, ObstaculosDeSuelo;
var piedra, arbusto, arbusto2, arbusto3;
var estadoDelJuego = "play";
var lives = 3;
var corazon,corazonobj,corazonobj2,corazonobj3,monedas,piedraa;
var saltoSong, choqueSong, recolecCoin;
var fondoObjetoprincipal;
var grupoPiedras;
var gameOver,gameOverImagen;
var creacionRestartImage,creacionRestartBtn;


function preload(){
    fondo      = loadImage    ("./Imagenes/bg.png");
    kanguroRun = loadAnimation("./Kanguro/kangaroo1.png","./Kanguro/kangaroo2.png","./Kanguro/kangaroo3.png");
    piedra     = loadImage    ("./Obstaculos/stone.png");
    arbusto    = loadImage    ("./Obstaculos/shrub1.png");
    arbusto2   = loadImage    ("./Obstaculos/shrub2.png");
    arbusto3   = loadImage    ("./Obstaculos/shrub3.png");
    corazon    = loadImage    ("./Imagenes/corazon.png");
    monedas    = loadImage    ("./Imagenes/objetivo.png");
    saltoSong  = loadSound    ('./Sonidos/jump.wav');
    choqueSong = loadSound    ('./Sonidos/collided.wav');
    recolecCoin= loadSound    ("./Sonidos/coin-257878.mp3");
    
    gameOverImagen = loadImage    ("./Imagenes/gameOver.png");
    creacionRestartImage =loadImage("./Imagenes/restart.png");
}

function setup(){

 // preparar para cualquier dispositivo
   
 var isMobile = /iphone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile){
  canW =  displayWhidth;
  canH =  displayHeight; 
  createCanvas(displayWhidth+80, displayHeight);
}

else{
  canW =  windowWidth; 
  canH =  windowHeight;
  createCanvas(windowWidth, windowHeight);
}
 
   createCanvas(1666,1000);

    fondoObjeto = createSprite(740,425);
    fondoObjeto.addImage("fondo",fondo);
    fondoObjeto.scale= 0.42

    kanguroJugador = createSprite(150,675);
    kanguroJugador.addAnimation("Runing",kanguroRun);
    kanguroJugador.scale= 0.2
   //ojo aqui se confunde cn linea  47 kanguroJugador.setCollider("circle",0,0,50);

    pisoInvisible=createSprite(150,775,500,15);
    pisoInvisible.visible=true;

    grupoArbusto = new Group()
    grupoPiedras =new Group()

    corazonobj = createSprite(90,40,15,15);
    corazonobj2 = createSprite(120,40,15,15);
    corazonobj3 = createSprite(150,40,15,15);

    monedas = createSprite(600,580,15,15);
    piedraa = createSprite(1700,750,40,110);
    kanguroJugador.setCollider("rectangle",0,0,1000,1000);
    kanguroJugador.debug = true;
   //Ojo  con la escritura kanguroJugador.thebug = true;

   gameOver = createSprite(0,0,15,15);
   gameOver.addImage("gameOver",gameOverImagen );
   gameOver.scale = 0.32
   gameOver.visible=false
   vida();
   creacionRestartBtn = createSprite(200,200,15,15);
   creacionRestartBtn.addImage("gameOver",creacionRestartImage );
   creacionRestartBtn.scale = 0.32
   creacionRestartBtn.visible=false
}

function draw(){
    background("#000000");
   // image(fondoObjetoprincipal,0,0,displayWidth+80,displayHeight);    ///________________ajuste obj3 PRO35
 

    drawSprites();

    if(estadoDelJuego == "play"){
        fondoObjeto.velocityX = -5;
        if (fondoObjeto.x < 100){
            fondoObjeto.x + 400
            fondoObjeto.x = fondoObjeto.width/2;
            //console.log()
        }
        //anexo
         if ( fondoObjeto.x <=200){
            fondoObjeto.x = fondoObjeto.width/2;
         }


        if(keyDown("space")){
            //kanguroJugador.y = 260
            kanguroJugador.velocityY=-15
            saltoSong.play();
            saltoSong.setVolume(0.5);
            //console.log("si funciona el codigo");
        }
        //agregar gravedad
        kanguroJugador.velocityY = kanguroJugador.velocityY + 1;
        creacionDeArbustos();
        creacionDePiedras();
        kanguroJugador.collide(pisoInvisible);
  


        // Disminuye vidas
        console.log("vidas"+lives)
        if(kanguroJugador.isTouching(grupoPiedras)){
            lives = lives -1;
            estadoDelJuego= "reinicio"       
            console.log("estado juego_ estoy en evaluacion 1 lives mayor a 1"+estadoDelJuego)
            console.log("cambio resta lives: __"+lives)
            
            if ( lives==2 &&  estadoDelJuego == "reinicio"){
                console.log("entro  a eliminar corazon1  vidas: " + lives)
                corazonobj3.visible= false                
                console.log("presiona flecha de arriba para continuar")
                // SE anexa   Metodo  EStado
        
                reinicioJuego()
            } //if

         
             console.log("EEEEEEEEEEEEEEEEEEEstado juego_           "+      estadoDelJuego)
          
             if(keyDown("a")){
                estadoDelJuego= "play"  
             }

               
              
        
            
    }



}
}

       
//hacer desaparecer todoslos corazones y que sigan apaeciendo las piedras

function  creacionDeArbustos(){
    if (frameCount % 220 === 0) {
        var arbustoo = createSprite(1700,750,40,110);
        var Arbusto = Math.round(random(1,4));
        arbustoo.scale=0.1;
        arbustoo.velocityX=-3.8;
        switch(Arbusto) {
            case 1: arbustoo.addImage(arbusto);
          
                break;
            case 2: arbustoo.addImage(arbusto2);
           
                break;
            case 3: arbustoo.addImage(arbusto3);
           
                break;

            case 4: creacionDePiedras();
          
                break;
            default: break;
            
        }
        arbustoo.lifetime= 500;
        grupoArbusto.add(arbustoo);
    }
    
}

function creacionDePiedras(){

    
  //  if (frameCount % 200 == 0){
        piedraa.addImage(piedra);
        piedraa.scale = 0.2;
        piedraa.velocityX = -3.8;
        piedraa.lifetime= 500;
        grupoPiedras.add(piedraa);
        
 //   }
}

function vida(){
    textFont("algerian");
    textSize(30);
    fill("yellow");
    text("lives",50,40);
    
    corazonobj.addImage(corazon);
    corazonobj2.addImage(corazon);
    corazonobj3.addImage(corazon);
    corazonobj.scale = 0.050;
    corazonobj2.scale= 0.050;
    corazonobj3.scale= 0.050;
    corazonobj.visible=true;
    corazonobj2.visible=true;
    corazonobj3.visible=true;
    console.log("s___________ metodo vidas   i funciona");
    
}

/*function Score(){
    if(monedas.isTouching(barGroup)){
        monedas = score + 1;
        recolecCoin.play();
        recolecCoin.setVolume(0.5);
        //var.visible=false;
        barGroup.destroyEach(-1)
    }
    textFont("algerian");
    textSize(30);
    fill("yellow");
    text("Puntuación: "+ score, 150, 50);  
}
*/
function reinicioJuego(){
    console.log("entre a REinicio")
    fondoObjeto.velocityX =0
    kanguroJugador.velocityY=0
    console.log("presiona restart")
    creacionRestartBtn.visible=true

    }


function end(){
    gameOver.visible=true
}

//hacer cambio de imagen del canguro cuando pierda vida
