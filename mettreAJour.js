let varDirection = null
let binTombe = null

let diffDepX1 = 0
let diffDepY1 = 0

let currentEchellePosX = 0 //position x de l'echelle courant
let EchellePosX = 0 //position x de l'echelle le plus proche du garde
let distanceX = 0
let distanceXCourant = 0

 let posXGarde = null;
 let posYGarde = null;

let  newPosGardX = null;
let  newposGardY = null;

let num = Math.floor(Math.random()*100);

let timerDirection = 0;

let miliSec=0;
let miliSec2 = 0;

var tabDir = new Array();

let tabScore = new Array(11).fill(0)


function mettreAjourAnimation() {

  mettreAJourGameOver()

    
if(objInfo.nbVieRestant!=0){
  mettreAJourVie()
  mettreAJourGameOver()

 

  for(let i=0;i<NbreGarde;i++){

    if(tabGardes[i].binDansTrou==true){
  gardeSortTrous()
    }
  }
  
  
  indexTimer++
  if(indexTimer==2){
    mettreAJourLode()
    indexTimer=0
  }

  if(objLodRunner.binEnMouvement == true){
  timerGarde++
  if(timerGarde==4){
    mettreAJourGardes(NbreGarde)
    timerGarde=0
  }

  } 

}

  
}


function mettreAJourGardes(intNumGarde) {

  for(let i=0; i<intNumGarde;i++){

    if(Math.floor((tabGardes[i].fltDeplX)/30)+1<30){
      diffDepX1 = tabGardes[i].fltDeplX-objLodRunner.fltDeplX
      diffDepY1 = Math.round(tabGardes[i].fltDeplY)-Math.round(objLodRunner.fltDeplY)

      //changement directions gardes
      if(Math.floor(Math.random()*50)+1==4){
        if(tabGardes[i].dirRandom==1){
          tabGardes[i].dirRandom=2
        }
        else{
          tabGardes[i].dirRandom=1
        }
      }
      if(Math.floor((tabGardes[i].fltDeplX)/30)+1==29){
        if(tabGardes[i].dirRandom==1){
          tabGardes[i].dirRandom=2
        }
        else{
          tabGardes[i].dirRandom=1
        }
      }

      if(Math.ceil((tabGardes[i].fltDeplX)/30)-1==0){
        if(tabGardes[i].dirRandom==1){
          tabGardes[i].dirRandom=2
        }
        else{
          tabGardes[i].dirRandom=1
        }
      }
      if(tabGrillejeux[Math.ceil((tabGardes[i].fltDeplX)/30)-1][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1] == 1||tabGrillejeux[Math.floor((tabGardes[i].fltDeplX)/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1] == 1){
        if(tabGardes[i].dirRandom==1){
          tabGardes[i].dirRandom=2
        }
        else{
          tabGardes[i].dirRandom=1
        }
      }

      for(let b = 0; b<intNumGarde;b++){
        if(b!=i){
          if(Math.round(tabGardes[i].fltDeplX)==Math.round(tabGardes[b].fltDeplX)&&Math.round(tabGardes[i].fltDeplY)==Math.round(tabGardes[b].fltDeplY)){
            if(tabGardes[i].dirRandom==1){
          tabGardes[i].dirRandom=2
        }
        else{
          tabGardes[i].dirRandom=1
        }
          }
        }
      }
   
//echelle
      //si le garde vient de la droite
    
//si le garde est en bas du lode
     if(diffDepY1>0 && tabGardes[i].fltDeplX/30%1==0 && tabGrillejeux[(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-22)/20)+2] == 2){  
       tabGardes[i].spritey=0
      
      tabDir[i] = 'b'
      if(tabGardes[i].e120!=140){
       tabGardes[i].e120=tabGardes[i].e120+20
        tabGardes[i].spritex=tabGardes[i].e120
       }
         else{
        tabGardes[i].e120=120
            tabGardes[i].spritex=tabGardes[i].e120
      }

       tabGardes[i].fltDeplY=tabGardes[i].fltDeplY-5
     }
       //si le garde est en haut du lode
       else if(diffDepY1<0 && tabGardes[i].fltDeplX/30%1==0 &&(tabGrillejeux[tabGardes[i].fltDeplX/30][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+3] == 2 || tabGrillejeux[(tabGardes[i].fltDeplX)/30][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2] == 2)){
        
          tabDir[i] = 'h'
         tabGardes[i].spritey=0
      
      if(tabGardes[i].e120!=140){
       tabGardes[i].e120=tabGardes[i].e120+20
        tabGardes[i].spritex=tabGardes[i].e120
       }
         else{
        tabGardes[i].e120=120
            tabGardes[i].spritex=tabGardes[i].e120
      }
      
        tabGardes[i].fltDeplY=tabGardes[i].fltDeplY+5
         
       }

         //tombe
       //tombe sur passerelle
     else if(tabGrillejeux[Math.floor((tabGardes[i].fltDeplX)/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2] == 4 &&tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1]!=10&&tabGrillejeux[Math.floor(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1]!=50){
      tabGardes[i].fltDeplY=tabGardes[i].fltDeplY+20;
       tabDir[i] ='passerelle'
       tabGardes[i].spritey=22
       tabGardes[i].spritex=60
       tabDir[i]=null
       
     }
//tombe trou gauche
       else if(tabDir[i] == 'g'&&tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]==10&&tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]!=50){
         tabGardes[i].spritex=160
          tabGardes[i].spritey=22
      
           tabGardes[i].fltDeplY=tabGardes[i].fltDeplY+5; 
         tabGardes[i].fltDeplX = Math.ceil(tabGardes[i].fltDeplX/30)*30
        

         if(tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]==5||tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]==0||tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]==4){
           
           tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1]=50
           tabGardes[i].binDansTrou=true
           tabScore[objInfo.niveau] += 75;
           objInfo.scoreNivActuelle = objInfo.scoreValeur
           tabGardes[i].tempsTrou = new Date()
         }
       }


         //tombe trou droite
       else if(tabDir[i] == 'd'&&tabGrillejeux[Math.floor(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]==10&&tabGrillejeux[Math.floor(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]!=50){
         tabGardes[i].spritex=160
          tabGardes[i].spritey=0
      
        tabGardes[i].fltDeplY=tabGardes[i].fltDeplY+5; 
          tabGardes[i].fltDeplX = Math.floor(tabGardes[i].fltDeplX/30)*30

         if(tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]==5||tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]==0||tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2]==4){
           
           tabGrillejeux[Math.floor(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1]=50
           tabGardes[i].binDansTrou=true
           tabScore[objInfo.niveau] += 75;
           tabGardes[i].tempsTrou = new Date()
         }
       }

      //gauche
      else if(tabDir[i] == 'g'&&(tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2] == 0 || tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2] == 3)&&tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1]!=10&&tabGrillejeux[Math.floor(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1]!=50){
       
         
          tabGardes[i].spritex=160
          tabGardes[i].spritey=22
      
        tabGardes[i].fltDeplY=tabGardes[i].fltDeplY+5; 
    }
        //droite
   else if(tabDir[i] == 'd'&&(tabGrillejeux[Math.floor(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2] == 0 || tabGrillejeux[Math.floor(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2] == 3)&&tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1]!=10&&tabGrillejeux[Math.floor(tabGardes[i].fltDeplX/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1]!=50){
         
 
          tabGardes[i].spritex=160
          tabGardes[i].spritey=0
      
        tabGardes[i].fltDeplY=tabGardes[i].fltDeplY+5; 
    }

     

  

    
  //passerelle
//descendre de la passerelle
      else if(tabDir[i] =='passerelle'&&tabGardes[i].fltDeplY<objLodRunner.fltDeplY&&tabGrillejeux[Math.ceil((tabGardes[i].fltDeplX)/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+2] == 0){

        tabGardes[i].spritex=160
          tabGardes[i].spritey=22
        tabGardes[i].fltDeplY=tabGardes[i].fltDeplY+5;
        tabDir[i] ='g'
       
        
      }
  //passerelle G
   else if(tabGardes[i].dirRandom%2==0&&(tabGrillejeux[Math.ceil((tabGardes[i].fltDeplX)/30)][Math.round((tabGardes[i].fltDeplY-20-tabGardes[i].tailleH-tabGardes[i].tailleH/2)/20)+1] == 4||tabGrillejeux[Math.floor((tabGardes[i].fltDeplX)/30)-1][Math.round((tabGardes[i].fltDeplY-20-tabGardes[i].tailleH-tabGardes[i].tailleH/2)/20)+1] == 4)){

     
     
      tabGardes[i].spritey=22
    
      tabDir[i] ='passerelle'
      if(tabGardes[i].p60!=100){
            tabGardes[i].p60=tabGardes[i].p60+20
          tabGardes[i].spritex=tabGardes[i].p60
        }
        else{
          tabGardes[i].p60=60
          tabGardes[i].spritex=tabGardes[i].p60
        }
 
        tabGardes[i].fltDeplX=tabGardes[i].fltDeplX-5;
     
     
         
    }

        //passerelle D
    else if(Math.floor((tabGardes[i].fltDeplX)/30)+1<29&&tabGardes[i].dirRandom%2==1&&(tabGrillejeux[Math.floor((tabGardes[i].fltDeplX)/30)+1][Math.round((tabGardes[i].fltDeplY-20-tabGardes[i].tailleH-tabGardes[i].tailleH/2)/20)+1] == 4||tabGrillejeux[Math.floor((tabGardes[i].fltDeplX)/30)][Math.round((tabGardes[i].fltDeplY-20-tabGardes[i].tailleH-tabGardes[i].tailleH/2)/20)+1] == 4)){
      tabDir[i] ='passerelle'
      tabGardes[i].spritey=22
     
      if(tabGardes[i].p0!=40){
          tabGardes[i].p0=tabGardes[i].p0+20
          tabGardes[i].spritex=tabGardes[i].p0
        }
        else{
          tabGardes[i].p0=0
          tabGardes[i].spritex=tabGardes[i].p0
        }

      
     
      if(tabGardes[i].fltDeplX+5!=850){
          tabGardes[i].fltDeplX=tabGardes[i].fltDeplX+5;
         
        }
      
    }

 
  
    
  //avancer Gauche/droite
     //60-100 = G
     //0-40 = D

    else if(tabGrillejeux[Math.floor((tabGardes[i].fltDeplX)/30)][Math.floor((tabGardes[i].fltDeplY-20-tabGardes[i].tailleH)/20)+2] == 1 || tabGrillejeux[Math.floor((tabGardes[i].fltDeplX)/30)+1][Math.ceil((tabGardes[i].fltDeplY-20-tabGardes[i].tailleH)/20)+2] == 1 || tabGrillejeux[Math.floor((tabGardes[i].fltDeplX)/30)-1][Math.ceil((tabGardes[i].fltDeplY-20-tabGardes[i].tailleH)/20)+2] == 1){
  tabGardes[i].spritey=0

      //if()
    //diffDepX1 = tabGardes[i].fltDeplX-objLodRunner.fltDeplX

    if(tabGardes[i].dirRandom%2==0){
       
       if(tabGrillejeux[Math.ceil((tabGardes[i].fltDeplX)/30)-1][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1] != 1||tabGrillejeux[Math.floor((tabGardes[i].fltDeplX)/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1] != 1 ){
        tabDir[i] = 'g'
      if(tabGardes[i].s60!=100){
            tabGardes[i].s60=tabGardes[i].s60+20
          tabGardes[i].spritex=tabGardes[i].s60
        }
        else{
          tabGardes[i].s60=60
          tabGardes[i].spritex=tabGardes[i].s60
        }
      if(tabGardes[i].fltDeplX-5>25){
      tabGardes[i].fltDeplX = tabGardes[i].fltDeplX-5
      }
       }
    }
    else{
      tabDir[i]='d'
if(tabGrillejeux[Math.ceil((tabGardes[i].fltDeplX)/30)][Math.floor((tabGardes[i].fltDeplY-20-20)/20)+1] != 1 ){
     
      if(tabGardes[i].s0!=40){
            tabGardes[i].s0=tabGardes[i].s0+20
          tabGardes[i].spritex=tabGardes[i].s0
        }
        else{
          tabGardes[i].s0=0
          tabGardes[i].spritex=tabGardes[i].s0
        }
  if(tabGardes[i].fltDeplX+5<843){
      tabGardes[i].fltDeplX=tabGardes[i].fltDeplX+5
  }
    }
    }
    
  }
   
    
  }

  }

 
}

function mettreAJourLode() {

  if(Math.round((objLodRunner.fltDeplX)/30)==24&&Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH-objLodRunner.tailleH/2)/20)+1==0 &&objLodRunner.lingotFini==true){
    objSons.prochainNiveau.play();
    
    NbreGarde++;
    objInfo.niveau++;
    tabScore[objInfo.niveau] += 1500;
    objLodRunner.binEnMouvement=false
    initLingot()
    initGrilleJeux()
    initLodeRunner()
    initGardes()
    initBrick();
    effacerDessin()
    dessiner();
 
  }

 if(intDirection==4){
   binTombe=true
   
 }

  if(Math.ceil((objLodRunner.fltDeplX)/30)+1<30){


        //passerelle G
   if(intDirection==1 && objLodRunner.mort==false &&(tabGrillejeux[Math.ceil((objLodRunner.fltDeplX)/30)][Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH-objLodRunner.tailleH/2)/20)+1] == 4||tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)-1][Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH-objLodRunner.tailleH/2)/20)+1] == 4)){
      ySprites=22
     binTombe=false
      varDirection='passerelle'
      if(sprite3y!=100){
            sprite3y=sprite3y+20
          xSprites=sprite3y
        }
        else{
          sprite3y=60
          xSprites=sprite3y
        }
     
        objLodRunner.fltDeplX=objLodRunner.fltDeplX-5;
     
     objLodRunner.fltDeplY=(Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH-objLodRunner.tailleH/2)/20)+2)*20
         
    }

        //passerelle D
    else if(intDirection==2 && objLodRunner.mort==false&&Math.floor((objLodRunner.fltDeplX)/30)+1!=29&& intDirection==2 &&(tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)+1][Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH-objLodRunner.tailleH/2)/20)+1] == 4||tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH-objLodRunner.tailleH/2)/20)+1] == 4)){
      varDirection='passerelle'
      ySprites=22
      binTombe=false
      if(sprite4y!=60){
            sprite4y=sprite4y+20
          xSprites=sprite4y
        }
        else{
          sprite4y=20
          xSprites=sprite4y
        }
 
      if(objLodRunner.fltDeplX+5!=850){
          objLodRunner.fltDeplX=objLodRunner.fltDeplX+5;

        objLodRunner.fltDeplY=(Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH-objLodRunner.tailleH/2)/20)+2)*20
        }
    }

      //passerelle Bas
    else if(binTombe&&objLodRunner.mort==false&&tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 0){

     
         xSprites=160
          ySprites=22
      objSons.lodChute.play()
        objLodRunner.fltDeplY=objLodRunner.fltDeplY+5; 
      
      
    }

//tomber
       //tombe sur passerelle
     else if(objLodRunner.mort==false&&tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 4 ){
       objLodRunner.fltDeplY=objLodRunner.fltDeplY+20;
       ySprites=22
       sprite3y=60
       varDirection=null
        binTombe=false
       objSons.lodChute.play()
     }
       
  //gauche
      else if(intDirection!=3&&objLodRunner.mort==false&&varDirection=='gauche'&&(objLodRunner.fltDeplX)/30%1==0&&(tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 0||tabGrillejeux[Math.ceil((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 10)){
 
          xSprites=160
          ySprites=22
      binTombe=false
        objLodRunner.fltDeplY=objLodRunner.fltDeplY+5; 
        objSons.lodChute.play()
    }
        //droite
   else if(varDirection=='droite'&&objLodRunner.mort==false&&(objLodRunner.fltDeplX)/30%1==0&&(tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 0||tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 10)){
 
          xSprites=160
          ySprites=0
      binTombe=false
        objLodRunner.fltDeplY=objLodRunner.fltDeplY+5; 
     objSons.lodChute.play()
    }
    

      //avance
 /*gauche*/ 
    else if(intDirection==1 && (tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 1 || tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)+1][Math.ceil((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 1 || tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)-1][Math.ceil((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 1||tabGrillejeux[Math.ceil((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 50)){
      ySprites=0
      varDirection='gauche'
    binTombe=false
    objLodRunner.binEnMouvement = true;
      
      if(tabGrillejeux[Math.ceil((objLodRunner.fltDeplX)/30)-1][Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+1] != 1|| tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+1] != 1){
         if(sprite1x!=100){
            sprite1x=sprite1x+20
          xSprites=sprite1x
        }
        else{
          sprite1x=60
          xSprites=sprite1x
        }
      
      if(objLodRunner.fltDeplX-5!=25){
        objLodRunner.fltDeplX=objLodRunner.fltDeplX-5;
      }
      }
     
    }
    
     //droite
    else if(intDirection==2 && (tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 1 ||         
           tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)+1][Math.ceil((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 1 || 
           tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)-1][Math.ceil((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 1||tabGrillejeux[Math.ceil((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+2] == 50 )){
varDirection='droite'
   binTombe=false
           ySprites=0
       objLodRunner.binEnMouvement = true;
    
      if(tabGrillejeux[Math.ceil((objLodRunner.fltDeplX)/30)][Math.round((objLodRunner.fltDeplY-20-objLodRunner.tailleH)/20)+1] != 1 ){
    
            if(sprite2x!=40){
                sprite2x=sprite2x+20
              xSprites=sprite2x
            }
            else{
              sprite2x=0
              xSprites=sprite2x
            }
          
        if(objLodRunner.fltDeplX+5<843){
          objLodRunner.fltDeplX=objLodRunner.fltDeplX+5;
        } 
    }
}

     
     //echelle
      
    else if(intDirection==3 &&tabGrillejeux[Math.round((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-22)/20)+2] == 2){
      ySprites=0
      
     if(xSprites!=140){
       xSprites=xSprites+20
     }
      else{
        xSprites=120
      }

      objLodRunner.fltDeplY=objLodRunner.fltDeplY-5
      objLodRunner.fltDeplX = Math.round((objLodRunner.fltDeplX)/30)*30
        
  
    }
      else if(intDirection==4 &&(tabGrillejeux[Math.round((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-22)/20)+3] == 2 || tabGrillejeux[Math.round((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY-20-22)/20)+2] == 2)){
        ySprites=0
      
      if(xSprites!=140){
       xSprites=xSprites+20
       }
         else{
        xSprites=120
      }
   if(tabGrillejeux[Math.floor((objLodRunner.fltDeplX)/30)][Math.floor((objLodRunner.fltDeplY+5-20-22)/20)+2]!=1)     
  objLodRunner.fltDeplY=objLodRunner.fltDeplY+5
        objLodRunner.fltDeplX = Math.round((objLodRunner.fltDeplX)/30)*30
    }
    
  }


}


function mettreAJourVie(){

  if(objLodRunner.mort == true&&objLodRunner.fltDeplY-3>-20){
    objLodRunner.fltDeplY = objLodRunner.fltDeplY-3
  }

  if(objLodRunner.fltDeplY<-15&&objLodRunner.mort == true){
   
    objInfo.nbVieRestant--;
    initLingot()
    initGrilleJeux()
    initLodeRunner()
    initGardes()
    initBrick();
    tabScore[objInfo.niveau]=0
   
    
  }

  for(let i=0; i<NbreGarde;i++){
    if(tabGardes[i].fltDeplX==objLodRunner.fltDeplX && tabGardes[i].fltDeplY==objLodRunner.fltDeplY&&objLodRunner.mort==false){
      objLodRunner.mort = true
      objSons.lodPerdUnevie.play()
      break;
    }
  }  
}
  
  
  function mettreAJourDisparitionLingot() {

  let posDeplX = Math.abs(Math.floor((objLodRunner.fltDeplX) / objLodRunner.tailleL));    
  let posDeplY = Math.abs(Math.floor((objLodRunner.fltDeplY - 20) / objLodRunner.tailleH));
  nbLingotRamasser = 0

    for (let i = 0; i < tabLingot.length; i++) {
      let objLingot = tabLingot[i];
      if(objLingot.binRamasserJoueur == false && objLodRunner.mort==false){
        if(objLingot.binRamasserGardien == false){
          if(objLingot.posTabX == posDeplX && objLingot.posTabY == posDeplY){
            objSons.lodRamasseLingot.play()
            objLingot.binRamasserJoueur = true;
            objLodRunner.binLingot = true;
          }
        }
      }
      else
      {
        nbLingotRamasser++;
      }
    }


    if(nbLingotRamasser == 6 && objLodRunner.mort==false)
    {
          tabGrillejeux[24][0] = 2
          tabGrillejeux[24][1]= 2
          tabGrillejeux[24][2]= 2
          tabGrillejeux[24][3]= 2
      objLodRunner.lingotFini=true
       
    } 
  }



function mettreAJourInfo() {

  function ajoutZero(texte, valeur) {
      if (valeur < 10) {     
        texte = "000000" + valeur;
      } else if (valeur <= 99 && valeur >= 10) {
        texte = "00000" + valeur;
      } else if (valeur <= 999 && valeur >= 100) {
        texte = "0000" + valeur;
      } else if (valeur <= 9999 && valeur >= 1000) {
        texte = "000" + valeur;
      } else if (valeur <= 99999 && valeur >= 10000) {
        texte = "00" + valeur;
      } else if (valeur <= 999999 && valeur >= 100000) {
        texte = "0" + valeur;
      } else {
        texte = valeur;
      }   
     return texte;  
  }


    
  if(objLodRunner.binEnMouvement){
    
        objDate2 = new Date();
        soustraireDate = objDate2 - objDate;
        miliSecondeCumuler += soustraireDate;    
        objDate = objDate2;
    
        minutes = Math.floor((miliSecondeCumuler / (1000 * 60)) % 60)
        secondes = Math.floor((miliSecondeCumuler / 1000) % 60)
        objInfo.tempsPartie = (minutes < 10 ? '0' +  minutes : minutes ) + ':' + (secondes < 10 ? '0' + secondes : secondes);   

        if(objLodRunner.binLingot == true){
          
          tabScore[objInfo.niveau] += 250;  
          objLodRunner.binLingot = false;
        }   
  } 
          
            
          objInfo.scoreValeur = parseInt(tabScore[1])+parseInt(tabScore[2])+parseInt(tabScore[3])+parseInt(tabScore[4])+parseInt(tabScore[5])+parseInt(tabScore[6])+parseInt(tabScore[7])+parseInt(tabScore[8])+parseInt(tabScore[9])+parseInt(tabScore[10])
           
          

  
       let strText = "";   
       strText = ajoutZero(strText, objInfo.scoreValeur);
        
       objInfo.scoreText = "Score :" + strText;
}



function mettreAJourDisparitionBrick() {

   let posDeplX = Math.abs(Math.floor((objLodRunner.fltDeplX) / objLodRunner.tailleL));    
   let posDeplY = Math.abs(Math.floor((objLodRunner.fltDeplY - 20) / objLodRunner.tailleH));

    for(let i = 0; i < objGrilleJeu.arrTrou.length; i++){

        let valeurTemps = null;
        let objDate = new Date();
        valeurTemps = objDate - objGrilleJeu.arrTrou[i][3];
        objGrilleJeu.arrTrou[i][3] = objDate;
        objGrilleJeu.arrTrou[i][2] += valeurTemps;
  
        if(Math.floor((objGrilleJeu.arrTrou[i][2] / 1000) % 60) === 8){
          tabGrillejeux[objGrilleJeu.arrTrou[i][0]][objGrilleJeu.arrTrou[i][1]] = 1;
         
        
          
          // sons pour remplir le trou
          objSons.trouRemplit.play();
          
          
          if(posDeplX == objGrilleJeu.arrTrou[i][0] && posDeplY == objGrilleJeu.arrTrou[i][1] || (
            posDeplX == objGrilleJeu.arrTrou[i][0] - 1 && posDeplY == objGrilleJeu.arrTrou[i][1])){
            objLodRunner.binEcraseParTrou = true;
            objLodRunner.mort = true
            // mort dans le trou
            objSons.gardeMeurt.play();
          }

          //Quand un trou se ferme sur un garde
          for (let j = 0; j < NbreGarde; j++) {
            
            let objGarde = tabGardes[j];
            posXGarde = objGarde.fltDeplX;
            posYGarde = objGarde.fltDeplY;

            let posDepli = Math.abs(Math.floor((posXGarde) / objGarde.tailleL));
            let posDeplj = Math.abs(Math.floor(posYGarde - 20) / objGarde.tailleH);
            
            if((posDepli == objGrilleJeu.arrTrou[i][0] && posDeplj == objGrilleJeu.arrTrou[i][1]) || 
               (posDepli == objGrilleJeu.arrTrou[i][0] - 1 &&  posDeplj == objGrilleJeu.arrTrou[i][1]) ||
               (posDepli == objGrilleJeu.arrTrou[i][0] + 1 && posDeplj == objGrilleJeu.arrTrou[i][1])){
                 
              objGardes.binDansTrou = true;
                  // position du garde et faire un random sur cette position
                
                      
                  while(tabGrillejeux[mathRandx][mathRandy]!=0 || tabGrillejeux[mathRandx][mathRandy+1]!=1||(mathRandy+1)*20==500){
                    mathRandx=Math.floor(Math.random()*29)
                    mathRandy=Math.floor(Math.random()*28)  
                  }
                  
                  if(mathRandx==0){
                    newPosGardX = 30
                  }  
                    else{
                    
                      newPosGardX= mathRandx*30
                    }
                  
                  newPosGardY = (mathRandy+1)*20

                  objSons.gardeMeurt.play();

                tabScore[objInfo.niveau] += 75;
                objGarde.fltDeplX = newPosGardX;
                objGarde.fltDeplY = newPosGardY;
                
            }           
          }
          

          objBrick.binRemplie = true;
          objGrilleJeu.arrTrou.shift();
        }
  }
        let binLingot = false;
  
        if(objLodRunner.binTrouDroite == true){
      
          if(tabGrillejeux[posDeplX + 1][posDeplY - 1] != 2){
           
             if(tabGrillejeux[posDeplX + 1][posDeplY] == 0){
              
                for(let i = 0; i< tabLingot.length; i++){
                  let objLingo = tabLingot[i];

            if (objLingo.posTabX == posDeplX + 1 && objLingo.posTabY == posDeplY && objLingo.binRamasserGardien == false && objLingo.binRamasserJoueur == false) {
                binLingot = true
              }  
            }
            if(binLingot == false){
              if(tabGrillejeux[posDeplX + 1][posDeplY] != 4){
                if(tabGrillejeux[posDeplX + 1][posDeplY + 1] == 1){
                  // remplir le array de trou à de deux dimensions
                  objGrilleJeu.arrTrou.push([posDeplX + 1, posDeplY + 1, 0, new Date()])
                  tabGrillejeux[posDeplX + 1][posDeplY + 1] = 10;

                  // faire jouer le sons
                  objSons.lodCreuseTrou.play();
                  objLodRunner.binTrouDroite = false;
                  xSprites = 120
                  ySprites=22
                  
                }
              }
              else
              {
                
                 objLodRunner.binTrouDroite = false;
              }
            }
               else{

                  objLodRunner.binTrouDroite = false;
               }
          }
            else
             {
                objLodRunner.binTrouDroite = false;
             }
        }
          else
          {
           objLodRunner.binTrouDroite = false;
            
          }
      }
      // pour trou à gauche

    else if(objLodRunner.binTrouGauche == true){
      xSprites = 140
        ySprites=22
       
          if(tabGrillejeux[posDeplX - 1][posDeplY - 1] != 2){
             if(tabGrillejeux[posDeplX - 1][posDeplY] == 0){
                for(let i = 0; i< tabLingot.length; i++){
                  let objLingo = tabLingot[i];

            if (objLingo.posTabX == posDeplX - 1 && objLingo.posTabY == posDeplY && objLingo.binRamasserGardien == false && objLingo.binRamasserJoueur == false) {
                binLingot = true
              }  
            }
            if(binLingot == false){
              if(tabGrillejeux[posDeplX - 1][posDeplY] != 4){
                if(tabGrillejeux[posDeplX - 1][posDeplY + 1] == 1){
                  // remplir le array de trou à de deux dimensions
                  objGrilleJeu.arrTrou.push([posDeplX - 1, posDeplY + 1, 0, new Date()])
                  tabGrillejeux[posDeplX - 1][posDeplY + 1] = 10;
                  // faire jouer le sons
               
                  objSons.lodCreuseTrou.play();
                  objLodRunner.binTrouGauche = false;
                }
              }
              else
              {
                
                 objLodRunner.binTrouGauche = false;
              }
            }
               else{

                  objLodRunner.binTrouGauche = false;
               }
          }
            else
             {
                objLodRunner.binTrouGauche = false;
             }
        }
          else
          {
           objLodRunner.binTrouGauche = false;
            
          }
      }  
}

function mettreAJourGameOver() {


if(objInfo.nbVieRestant == 1 &&  objLodRunner.mort == true){

    objGameOver.binAfficher = true;
    objSons.gameOver.play()
}

  
if(objInfo.nbVieRestant == 0 ){
  objGameOver.binFinRotation = true;
}
   objGameOver.fltAngleRotation += Math.PI / 80; 

}

function mettreAJourGardesRamasseLingot() {   

  let numRandom = Math.floor(Math.random()*1000)

  
  for (let i = 0; i < tabLingot.length; i++) {
      let objLingot = tabLingot[i];
      if(objLingot.binRamasserJoueur == false){
        if(objLingot.binRamasserGardien == false){
          for(let a = 0; a<NbreGarde;a++){

             
            
            let posDeplX = Math.abs(Math.floor((tabGardes[a].fltDeplX) / tabGardes[a].tailleL));    
            let posDeplY = Math.abs(Math.floor((tabGardes[a].fltDeplY - 20) / tabGardes[a].tailleH));

            
            if(objLingot.posTabX==posDeplX&&objLingot.posTabY==posDeplY&&tabGardes[a].aLingot==false&&tabGardes[a].lingotCoolDown==false){
            objLingot.binRamasserGardien= true;
             tabGardes[a].aLingot = true
              tabGardes[a].quelLingot = objLingot
             
            }

            if(miliSecondeCumuler>=miliSec+350&&tabGardes[a].aLingot==false&&tabGardes[a].lingotCoolDown==true){
                  tabGardes[a].lingotCoolDown=false
              }
          }
        }
      }
      
    }
      let random = Math.floor(Math.random()*NbreGarde)
      let posDeplX = Math.abs(Math.floor((tabGardes[random].fltDeplX) / tabGardes[random].tailleL));    
      let posDeplY = Math.abs(Math.floor((tabGardes[random].fltDeplY - 20) / tabGardes[random].tailleH));
      
      if(tabGardes[random].aLingot == true&&numRandom == 5&& tabGrillejeux[posDeplX][posDeplY]==0&&tabGardes[random].lingotCoolDown==false){
        
        tabGardes[random].aLingot=false
        tabGardes[random].quelLingot.posTabX=posDeplX
        tabGardes[random].quelLingot.posTabY=posDeplY
        tabGardes[random].quelLingot.binRamasserGardien=false
        miliSec=miliSecondeCumuler
        tabGardes[random].lingotCoolDown=true
 
        
      }

  for(let b = 0; b<NbreGarde;b++){

    if(tabGardes[b].aLingot == true&&tabGrillejeux[Math.ceil(tabGardes[b].fltDeplX/30)-1][Math.floor((tabGardes[b].fltDeplY-20-20)/20)+1]==1&&tabGrillejeux[Math.ceil(tabGardes[b].fltDeplX/30)+1][Math.floor((tabGardes[b].fltDeplY-20-20)/20)+1]==1&&tabGrillejeux[Math.ceil(tabGardes[b].fltDeplX/30)][Math.floor((tabGardes[b].fltDeplY-20-20)/20)]==0&&tabGrillejeux[Math.ceil(tabGardes[b].fltDeplX/30)][Math.floor((tabGardes[b].fltDeplY-20-20)/20)+2]!=2){
     

      tabGardes[b].quelLingot.posTabX=Math.abs(Math.floor((tabGardes[b].fltDeplX) / tabGardes[b].tailleL));
        tabGardes[b].quelLingot.posTabY=Math.abs(Math.floor((tabGardes[b].fltDeplY - 20) / tabGardes[b].tailleH))-1;
        tabGardes[b].quelLingot.binRamasserGardien=false
      tabGardes[b].lingotCoolDown=true
      tabGardes[b].aLingot = false
      
    }
  }

  
     
  
  
}
 
function gardeSortTrous(){
let tempsCourant = new Date()
  for(let i=0;i<NbreGarde;i++){
    let objDate = new Date();
   let randNum = Math.floor(Math.random()*1)

    let ecartTemps = objDate - tabGardes[i].tempsTrou;
        
    
    if(tabGardes[i].binDansTrou==true&&Math.floor((ecartTemps / 1000) % 60) >= 4){
      if(tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.ceil((tabGardes[i].fltDeplY-20-20)/20)+1]==50){
        
        tabGardes[i].spritey=0
          if(tabGardes[i].e120!=140){
           
       tabGardes[i].e120=tabGardes[i].e120+20
        tabGardes[i].spritex=tabGardes[i].e120
       }
         else{
        tabGardes[i].e120=120
            tabGardes[i].spritex=tabGardes[i].e120
        }

        tabGardes[i].fltDeplY=tabGardes[i].fltDeplY-20
        
     
        
        tabGardes[i].binDansTrou=false
      tabGrillejeux[Math.ceil(tabGardes[i].fltDeplX/30)][Math.ceil((tabGardes[i].fltDeplY-20-20)/20)+2]=10

        if(randNum==0){
          tabGardes[i].fltDeplX=tabGardes[i].fltDeplX+30
        }
        else{
          tabGardes[i].fltDeplX=tabGardes[i].fltDeplX-30
        }
      
      
    }
    
  }
    


  
}
}
  
