

function dessiner() {

  dessinerFond();
  dessinerInformation();
  dessinerGrilleJeux();
  dessinerEchelle();
  dessinerLingot();
  dessinerPasserelle();
  dessinerBordures();
  dessinerLode();
  DessinerGardes();
  dessinerGameOver()
  
}

function DessinerGardes(){
  objC2D.save();
  for(let i = 0; i<NbreGarde;i++){
  tabGardes[i].src = tabImageGardes[i]
  
    
      if(tabGardes[i].aLingot != true){

        objC2D.drawImage(tabGardes[i], tabGardes[i].spritex, tabGardes[i].spritey, 20, 22, tabGardes[i].fltDeplX , tabGardes[i].fltDeplY,30,20) 
      }
    else{
      tabGardes[i].src=objGardeLingot.src
      objC2D.drawImage(tabGardes[i], tabGardes[i].spritex, tabGardes[i].spritey, 20, 22, tabGardes[i].fltDeplX , tabGardes[i].fltDeplY,30,20) 
    }
  }
  objC2D.restore();
  
}

function dessinerBordures() {
  objC2D.save();

  for (let intNoMur = 0; intNoMur < tabBordures.length; intNoMur++) {

    let objBordure = tabBordures[intNoMur];

    objC2D.fillStyle = objBordure.couleur;

    objC2D.beginPath();
    objC2D.moveTo(objBordure.intXDebut, objBordure.intYDebut);
    objC2D.lineTo(objBordure.intXFin, objBordure.intYDebut);
    objC2D.lineTo(objBordure.intXFin, objBordure.intYFin);
    objC2D.lineTo(objBordure.intXDebut, objBordure.intYFin);
    objC2D.closePath();
    objC2D.fill();

    if(intNoMur != 2){
      objC2D.save();
      objC2D.font = 'bold 25px Roboto, sans-serif';
      objC2D.textAlign = 'center';
      objC2D.textBaseline = 'middle';
      objC2D.beginPath();
      objC2D.lineWidth = 1.5;
      objC2D.strokeStyle = 'red';
      
      if(intNoMur == 1){
         objC2D.strokeText(objBordure.texteBordure,objCanvas.width / 2, 20);
      }
      else if(intNoMur == 3){
        objC2D.strokeText(objBordure.texteBordure,objCanvas.width / 2, objCanvas.height - 13);
      }
       objC2D.closePath();
       objC2D.restore();
    }
  }
  objC2D.restore();
}

function dessinerGrilleJeux() {

  objC2D.save();

  for (let i = 0; i < tabGrillejeux.length; i++) {

    for (let j = 0; j < tabGrillejeux[i].length; j++) {

      objC2D.beginPath();
      if (tabGrillejeux[i][j] == objGrilleJeu.briqueRouge) {
      
        objC2D.drawImage(objBrick.imgBriqueRouge, (i * objBrick.largeur), 20 + (j * objBrick.hauteur), objBrick.largeur, objBrick.hauteur);
     
      }
      else if(tabGrillejeux[i][j] == objGrilleJeu.briqueBeton){

        objC2D.drawImage(objBrick.imgBriqueBeton, (i * objBrick.largeur), 20 + (j * objBrick.hauteur),  objBrick.largeur, objBrick.hauteur);
      }
      objC2D.closePath();
    }
  }
  objC2D.restore();

}

function dessinerEchelle(){
    objC2D.save();

    for (let i = 0; i < tabGrillejeux.length; i++) {
  
      for (let j = 0; j < tabGrillejeux[i].length; j++) {
  
          if(tabGrillejeux[i][j] == 2)
          {
          objC2D.beginPath();
          objC2D.drawImage(objEchelle.imgEchelle, (i * objEchelle.largeur), 20 + (j * objEchelle.hauteur),     objEchelle.largeur, objEchelle.hauteur);
          objC2D.closePath();
          }
      }
    }
  objC2D.restore();
}


function dessinerPasserelle(){
      objC2D.save();
   for (let i = 0; i < tabGrillejeux.length; i++) {
  
      for (let j = 0; j < tabGrillejeux[i].length; j++) {
  
          if(tabGrillejeux[i][j] == 4)
          {
            objC2D.beginPath();
            
              objC2D.drawImage(objBarreDeDeplacement.img, (i * objBarreDeDeplacement.largeur), 20 + (j * objBarreDeDeplacement.hauteur),   
              objBarreDeDeplacement.largeur,objBarreDeDeplacement.hauteur);
            objC2D.closePath();
    }
        }
      objC2D.restore();
  }
}

function dessinerLingot(){
    objC2D.save();
    for (let i = 0; i < tabLingot.length; i++) {
        let objLingot = tabLingot[i];  
      
          if(!objLingot.binRamasserJoueur && !objLingot.binRamasserGardien)
          {
          objC2D.beginPath();     
          objC2D.drawImage(objLingot.imgLingo, (objLingot.posTabX * objLingot.largeur), 20 + (objLingot.posTabY * objLingot.hauteur), objLingot.largeur, objLingot.hauteur);
          objC2D.closePath();
          }
      }
    objC2D.restore();  
}

function dessinerLode(){
objC2D.save();
objC2D.drawImage(objLodRunner, xSprites, ySprites, 20, 22, objLodRunner.fltDeplX , objLodRunner.fltDeplY,30,20);
objC2D.restore()
}

function dessinerInformation(){
 objC2D.save();
  
 objC2D.beginPath();
 objC2D.fillStyle = '#eeeeee';
 objC2D.rect(0,540, objCanvas.width - 30, objCanvas.height);
 objC2D.globalAlpha = 0.4;
 objC2D.fill();
 objC2D.closePath();
 objC2D.restore();


 objC2D.font = '32px Fantasy';
 objC2D.strokeStyle = 'black'
 
 objC2D.save();
 objC2D.beginPath();
 objC2D.fillStyle = 'red';
 objC2D.strokeText(objInfo.scoreText, 60, 600 );
 objC2D.fillText(objInfo.scoreText, 60, 600); 
 objC2D.closePath();
 objC2D.restore();

 objC2D.save();
 objC2D.beginPath();
 objC2D.fillStyle = 'red';
 objC2D.strokeText('Temps: ' + objInfo.tempsPartie, 310, 600 );
 objC2D.fillText('Temps: ' + objInfo.tempsPartie, 310, 600); 
 objC2D.closePath();
 objC2D.restore();

 objC2D.save();
 objC2D.beginPath();
 objC2D.fillStyle = 'red';
 objC2D.strokeText('Niveau: ' + objInfo.niveau, 550, 600 );
 objC2D.fillText('Niveau: ' + objInfo.niveau, 550, 600); 
 objC2D.closePath();
 objC2D.restore();

 objC2D.save();
 objC2D.beginPath();
 objC2D.fillStyle = 'red';
 objC2D.strokeText('Vies: ' + objInfo.nbVieRestant, 745, 600 );
 objC2D.fillText('Vies: ' + objInfo.nbVieRestant, 745, 600); 
 objC2D.closePath();
 objC2D.restore();
  
 objC2D.restore();
}

function dessinerFond() {
  objC2D.save();
  objC2D.drawImage(objImageFond, 0, 0, objCanvas.width, objCanvas.height);
  objC2D.restore();
}

function dessinerGameOver(){

  
  if(objGameOver.binAfficher == true){
    
    objC2D.save();
    objC2D.beginPath();
    objC2D.textAlign = 'center';
    objC2D.textBaseLine = 'middle'
    // Déplacer le contexte au centre du canevas
    objC2D.translate(objGameOver.posX, objGameOver.posY);
    
    if(objGameOver.binFinRotation == false){
      // Rotation du canvas
      objC2D.rotate(objGameOver.fltAngleRotation);
    }
    objC2D.fillStyle = '#eb344f';
    objC2D.strokeStyle = 'white';
    objC2D.font = objGameOver.font;
    objC2D.fillText(objGameOver.strMessage, 0, 0);
    objC2D.strokeText(objGameOver.strMessage, 0, 0);
    objC2D.closePath(); 
    objC2D.restore();
  }
 
  
}

