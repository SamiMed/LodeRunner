
//'https://github.com/lvcabral/Lode-Runner-Roku/tree/master/assets/sprites'

let objFond = null;
let objPlancher = null
let objBrick = null;
let objLodRunner = null;
let objLingotImg = null;
let objEchelle = null;
let tabGrillejeux = new Array();
let tabLingot = null;
let objLingot = null;
let objGrilleJeu = null;
let objGameOver = null;
let soustraireDate = null;

let objDate = null;

let miliEnSeconde = null;
let miliEnMinute = null;
let minutes = null;
let secondes = null;
let miliSecondeCumuler = null;
// Les objets d'images
let objImageBriqueBeton = null;
let objImageBordure = null;
let objImageEchelle = null;
let imageBarreDeDeplacement = null;

let objImageGameOver = null;

let objCanvas = null;
let objC2D = null;
let objCycleAnimation = null;

let objGardes = null;
let tabGardes = null;

let objInfo = null;

let objSons = null;
let objBarreDeDeplacement = null
let tabBordures = null;
let tabObjBriques = null;

let objGardeLingot = null

let controlDeplG = 0; //gauche
let controlDeplD = 0; //droite
let controlDeplH = 0; //haut
let controlDeplB = 0; //bas
let objImageFond = null;

let intDirection = null;
let xSprites = 0;
let ySprites = 0;


let sprite1x = 60; //gauche
let sprite2x = 0; //droite
let sprite3y = 0; //passerelle g
let sprite4y = 0; //passerelle d
let sprite5 = 0; //tombe

let tableLode = null;

let NbreGarde = 3

let niveau = 1;

let timerGarde = 0
let indexTimer = 0;

let mathRandx = 0;
let mathRandy = 0;

let nbLingotRamasser = null;
let tabImageGardes =  ['guardRed.png', 'guardPurple.png', 'guardPink.png', 'guardRed.png', 'OrangeGuard.png', 'guardBlue.png', 'guardRed.png', 'guardPurple.png', 'guardPink.png', 'guardPurple.png']

/*
intDirection:
0 = stop
1 = Gauche
2 = Droite
3 = haut
4 = bas
5 = passerelle G
6 = passerelle D


/* Les étapes 

 1) dessiner la grille de jeux (OK)
 2) Mettre le lodeRunner en mouvement(Attention la vitesse) (OK)
 3) Creuser des trous (Sami) En cours ...
 4) Les chutes (OK)
 5) Rammaser des lingots  (Sami) (OK) 
 6) Mort du lodeRunner (lors des collisions avec les gardes OK)
 7) Déplacement des gardes (OK Emplacement initial random OK)
 8) tomber dans un trou/sort des trous (OK manque sort des trous)
 9) Les niveaux (OK)
 10) Afficher les information des parties (Score, vie(s), temps écouler OK)(Sami)
 11) Les sons (ramasser lingot, prochain niveau, chutes, game over, mort OK)
 12) Game Over (OK)
 13) Gardes rammasser/drop lingots (OK)

*/



function gererClavierArret(){
     objLodRunner.binEnMouvement = false;
}

function gererClavier() {

    objDate = new Date();
  if(!objLodRunner.mort){
    
    switch (event.keyCode) {
      case 39: // Flèche-à-droite
        //controlDeplD++;
        intDirection = 2
        objLodRunner.binEnMouvement = true;
        break;
        
      case 37: // Flèche-à-gauche
        //controlDeplG++;
        intDirection = 1
        objLodRunner.binEnMouvement = true;
        break;
        
      case 38: // Flèche-en-haut
        //controlDeplH++;
        intDirection = 3
        objLodRunner.binEnMouvement = true;
        break;
        
      case 40: //flèche bas
        //controlDeplD++;
        intDirection = 4
        objLodRunner.binEnMouvement = true;
        break;
  
      case 90: // Touche z pour le trou de gauche
       // console.log("z")
        objLodRunner.binTrouGauche = true;
        objLodRunner.binTrouDroite = false; 
        break;
        
      case 88: // Touche x pour le trou de droite
        //console.log("x")
        objLodRunner.binTrouGauche = false;
        objLodRunner.binTrouDroite = true; 
        break;

    }
  }
}

function toucheLevee(){
  intDirection=0
}

function initGrilleJeux() {

  objGrilleJeu = new Object();
  objGrilleJeu.vide = 0;
  objGrilleJeu.briqueRouge = 1;
  objGrilleJeu.echelle = 2;
  objGrilleJeu.lingot = 3;
  objGrilleJeu.passerelle = 4;
  objGrilleJeu.briqueBeton = 5;
  objGrilleJeu.largeurCellule = 30;
  objGrilleJeu.hauteurCellule = 20;

  //28x28
  tabGrillejeux = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 2, 2, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 4, 0, 1, 1, 1, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 4, 0, 1, 1, 1, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 4, 0, 2, 2, 1, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 2, 2, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0]
  ];
   objGrilleJeu.arrTrou = new Array();
}

function initAnimation() {

  objCanvas = document.getElementById('monCanvas');
  objCanvas.focus();
  objC2D = objCanvas.getContext('2d');
  initSons();
  initImageFond();
  initBordure();
  initGrilleJeux();
  initBrick();
  initEchelle();
  initPlancher()
  initLodeRunner()
  initLingot()
  initGardes()
  initPasserelle()
  initInformation()
  initGameOver()
  tempsInit = new Date();
  dessiner();
  animer();
  
  
}

function initGameOver() {

  objImageGameOver = new Image();
  objGameOver = new Object();
  objGameOver.strMessage = 'Game over';
 // objImageGameOver.src = 'gameover.png'
  objGameOver.font = 'bold 150px  Georgia';
  objGameOver.posX = objCanvas.width / 2;
  objGameOver.posY = objCanvas.height / 2;
  objGameOver.fltAngleRotation = 0;
  objGameOver.binFinRotation = false;
  objGameOver.binAfficher = false;
  
}

function initBordure() {

  tabBordures = new Array();
  let objBordure = null;

  // Bordure de gauche
  objBordure = new Object();
  objBordure.intXDebut = 0;
  objBordure.intYDebut = 0;
  objBordure.intXFin = 30
  objBordure.intYFin = objCanvas.height;
  objBordure.couleur = 'midnightblue';
  tabBordures.push(objBordure);

  // Bordure du haut
  objBordure = new Object();
  objBordure.intXDebut = 0;
  objBordure.intYDebut = 0;
  objBordure.intXFin = objCanvas.width;
  objBordure.intYFin = 30
  objBordure.couleur = 'midnightblue';
  objBordure.texteBordure = 'Lode Runner';
  tabBordures.push(objBordure);

  // Bordure de droite
  objBordure = new Object();
  objBordure.intXDebut = objCanvas.width;
  objBordure.intYDebut = 0;
  objBordure.intXFin = objCanvas.width - 30
  objBordure.intYFin = objCanvas.height;
  objBordure.couleur = 'midnightblue';
  tabBordures.push(objBordure);

  // Bordure du milieu
  objBordure = new Object();
  objBordure.intXDebut = 0;
  objBordure.intYDebut = objCanvas.height - 30;
  objBordure.intXFin = objCanvas.width;
  objBordure.intYFin = objCanvas.height;
  objBordure.couleur = 'midnightblue';
  objBordure.texteBordure = 'Par Sami Medelci et Cui Ying Pang';
  tabBordures.push(objBordure);
}

function initImageFond() {
  objImageFond = new Image();
  objImageFond.src = 'fond.jpg';
}


function initPlancher() {
  objPlancher = new Image()
  objPlancher.src = 'beton.png'
}


function initBrick() {

  tabObjBriques = new Array();
  objBrick = new Object();

  objImageBrique = new Image();
  objImageBriqueBeton = new Image();

  objImageBrique.src = 'brick.png';
  objImageBriqueBeton.src = 'beton.png ';

  objBrick.imgBriqueRouge = objImageBrique;
  objBrick.imgBriqueBeton = objImageBriqueBeton;

  objBrick.hauteur = 20;
  objBrick.largeur = 30;
  objBrick.xMin = 30;
  objBrick.xMax = objCanvas.width - 30;
  objBrick.yMin = 40;
  objBrick.yMax = objCanvas.height - 100;
  objBrick.tabDessinObjBriques = [29][29];
  objBrick.binRemplie = false;
}

function initLingot() {
  
  tabLingot = new Array();
  
  objLingotImg = new Image();
  objLingotImg.src = 'gold.png';

  objLingot = new Object();
  objLingot.imgLingo = objLingotImg;
  objLingot.hauteur = 20;
  objLingot.largeur = 30;
  objLingot.posTabX = 2;
  objLingot.posTabY = 3;
  objLingot.binRamasserJoueur = false;
  objLingot.binRamasserGardien = false;
  tabLingot.push(objLingot);

  objLingot = new Object();
  objLingot.imgLingo = objLingotImg;
  objLingot.hauteur = 20;
  objLingot.largeur = 30;
  objLingot.posTabX = 4;
  objLingot.posTabY = 17;
  objLingot.binRamasserJoueur = false;
  objLingot.binRamasserGardien = false;
  tabLingot.push(objLingot);

  objLingot = new Object();
  objLingot.imgLingo = objLingotImg;
  objLingot.hauteur = 20;
  objLingot.largeur = 30;
  objLingot.posTabX = 17;
  objLingot.posTabY = 9;
  objLingot.binRamasserJoueur = false;
  objLingot.binRamasserGardien = false;
  tabLingot.push(objLingot);

  objLingot = new Object();
  objLingot.imgLingo = objLingotImg;
  objLingot.hauteur = 20;
  objLingot.largeur = 30;
  objLingot.posTabX = 24;
  objLingot.posTabY = 17;
  objLingot.binRamasserJoueur = false;
  objLingot.binRamasserGardien = false;
  tabLingot.push(objLingot);

  objLingot = new Object();
  objLingot.imgLingo = objLingotImg;
  objLingot.hauteur = 20;
  objLingot.largeur = 30;
  objLingot.posTabX = 10;
  objLingot.posTabY = 21;
  objLingot.binRamasserJoueur = false;
  objLingot.binRamasserGardien = false;
  tabLingot.push(objLingot);

  objLingot = new Object();
  objLingot.imgLingo = objLingotImg;
  objLingot.hauteur = 20;
  objLingot.largeur = 30;
  objLingot.posTabX = 28;
  objLingot.posTabY = 24;
  objLingot.binRamasserJoueur = false;
  objLingot.binRamasserGardien = false;
  tabLingot.push(objLingot);  

}

function initEchelle(){
  objEchelle = new Object();
  objImageEchelle = new Image();
  objImageEchelle.src = 'echelle.png';
  objEchelle.imgEchelle = objImageEchelle;
  objEchelle.hauteur = 20;
  objEchelle.largeur = 30;
  objEchelle.binFinNiveau = false;
  objEchelle.posITableauJeu = 13; 
}


// Pour effacer le dessin
function effacerDessin() {
  objC2D.clearRect(0, 0, objCanvas.width, objCanvas.height);
}


function initInformation() {

  objInfo = new Object();
  objInfo.depart = objDate;
  objInfo.scoreValeur = 0;
  objInfo.scoreText = "0000000";
  objInfo.tempsPartie = "00:00";
  objInfo.niveau = 1;
  tabScore[objInfo.niveau]=0
  objInfo.binScore = false;
  objInfo.nbVieRestant = 5;
  objInfo.nbGardien = 3;
  objInfo.scoreNivActuelle = 0;

}

function initGardes() {
  tabGardes=new Array()
  
  for(let i=0; i<10;i++){
  objGardes = new Object()
  
  objGardes=new Image();
  objGardes.tailleL = 30
  objGardes.tailleH = 20
  objGardes.binDansTrou = false;
  objGardes.spritex=null;
  objGardes.spritey=null;
  objGardes.s60 = 60
  objGardes.s0 = 0
  objGardes.p60 = 60
  objGardes.p0 = 0
  objGardes.e120 = 120
  objGardes.dir = null
  objGardes.no = 0
  objGardes.dirRandom = Math.floor(Math.random()*10)+1
  objGardes.aLingot = false
  objGardes.quelLingot = null
  objGardes.lingotCoolDown = false;
  objGardes.tempsTrou = null

  mathRandx=Math.floor(Math.random()*29)
  mathRandy=Math.floor(Math.random()*28)

  while(tabGrillejeux[mathRandx][mathRandy]!=0 ||  tabGrillejeux[mathRandx][mathRandy+1]!=1||(mathRandy+1)*20==500){
    mathRandx=Math.floor(Math.random()*29)
    mathRandy=Math.floor(Math.random()*28)
  }
  if(mathRandx==0){
    objGardes.fltDeplX=30
  }
    else{
      objGardes.fltDeplX = mathRandx*30
    }
  
  objGardes.fltDeplY = (mathRandy+1)*20

 
  

  tabGardes.push(objGardes)

  }

 
 
  objGardeLingot = new Image()
  objGardeLingot.src = 'guardWeird.png'
  tabGardes[0].src = 'guardRed.png'
  tabGardes[1].src = 'guardPurple.png'
  tabGardes[2].src = 'guardPink.png'
  tabGardes[3].src = 'guardRed.png'
  tabGardes[4].src = 'OrangeGuard.png'
  tabGardes[5].src = 'guardBlue.png'

  tabGardes[6].src = 'guardRed.png'
  tabGardes[7].src = 'guardPurple.png'
  tabGardes[8].src = 'guardPink.png'
  tabGardes[9].src = 'guardPurple.png'

  
}


function initPasserelle() {
  imageBarreDeDeplacement = new Image();
  objBarreDeDeplacement = new Object();
  imageBarreDeDeplacement.src = 'barreDeDeplacement.png';
  objBarreDeDeplacement.img = imageBarreDeDeplacement;
  objBarreDeDeplacement.hauteur = 20;
  objBarreDeDeplacement.largeur = 30;

}

function initLodeRunner() {
  objLodRunner = new Image();
  objLodRunner.src = 'runner.png'
  objLodRunner.fltDeplX = 360;
  objLodRunner.fltDeplY = 500;
  objLodRunner.nbLingot = 0;
  objLodRunner.nbVies = 5;
  objLodRunner.tailleH = 20;
  objLodRunner.tailleL = 30;
  objLodRunner.binEnMouvement = false;
  objLodRunner.binLingot = false;
  objLodRunner.trou = false;
  objLodRunner.binTrouGauche = false;
  objLodRunner.binTrouDroite = false;
  objLodRunner.binEcraseParTrou = false;
  objLodRunner.mort = false
  objLodRunner.lingotFini=false
}


// Construire les sons
function initSons() {
  objSons = new Object();

  let objSon = document.createElement('audio');
  objSon.setAttribute('src', 'lodeRamasseLingot.mp3');
  objSon.load();
  objSons.lodRamasseLingot = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'chute.mp3');
  objSon.load();
  objSons.lodChute = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'creuser.wav');
  objSon.load();
  objSons.lodCreuseTrou = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'trouRempli.mp3');
  objSon.load();
  objSons.trouRemplit = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'perdVie.wav');
  objSon.load();
  objSons.lodPerdUnevie = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'gameover.wav');
  objSon.load();
  objSons.gameOver = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'prochainNiveau.mp3');
  objSon.load();
  objSons.prochainNiveau = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'gardeTombe.mp3');
  objSon.load();
  objSons.gardeTombeTrou = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'gardeMeurt.wav');
  objSon.load();
  objSons.gardeMeurt = objSon;
}

function animer() {

  objCycleAnimation = requestAnimationFrame(animer);
  effacerDessin();
  mettreAJourInfo();
  mettreAJourDisparitionBrick();
  mettreAJourDisparitionLingot();
  mettreAJourGardesRamasseLingot()
  mettreAjourAnimation();
  dessiner();
}