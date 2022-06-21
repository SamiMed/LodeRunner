# Jeu du Lode Runner

<h1>But du jeu</h1>
Le but du jeu est de ramasser les six lingots d’or situés sur des passerelles tout en évitant les gardes qui 
essaient d’attraper le joueur (Lode Runner). Lorsque les six lingots ont été ramassés, une échelle apparait. 
Cette échelle donne la possibilité au joueur de « quitter le décor » et ainsi passer au prochain niveau. 
Une fois niveau terminé, le nombre de gardes augmente de 1 et leurs niveaux intelligences augmente. 
Lode Runner a la possibilité de se déplacer horizontalement sur des passerelles et sur des barres de franchissement. 
Il peut également se déplacer verticalement sur des échelles. Finalement, il a la possibilité de creuser des trous temporaires dans la passerelle. 
Lode Runner utilise ces trous pour descendre plus rapidement et/ou pour piéger les gardes pendant un certain laps de temps.


#
![image](https://user-images.githubusercontent.com/48655888/174716430-0f069215-c285-436f-8482-d36793d9067b.png)
#

<h1>Les déplacements du Lode Runner</h1> 

Lode Runner se déplace horizontalement sur les passerelles ainsi que sur les barres de franchissement. Lode Runner
ne peut pas se déplacer horizontalement lorsqu’il frappe une passerelle ou un mur ou lorsqu’il atteint les limites 
horizontales. Lorsque Lode Runner atteint le vide, il chute mais ne meurt pas.
Pour déplacer Lode Runner horizontalement, l’utilisateur doit appuyer sur la flèche à gauche ou à droite. Dès que 
l’utilisateur relâche cette flèche, Lode Runner ne se déplace plus.

Lode Runner se déplace verticalement sur les échelles. Lode Runner ne peut pas se déplacer verticalement lorsqu’il 
n’y a pas d’échelle ou lorsqu’il atteint les limites verticales. 
Pour déplacer Lode Runner verticalement, l’utilisateur doit appuyer sur la flèche en haut ou en bas. Dès que 
l’utilisateur relâche cette flèche, Lode Runner ne se déplace plus. 


<h1>Creuser des trous</h1>

Lode Runner a la possibilité de creuser des trous sur les passerelles en brique. Lode Runner ne peut pas creuser de 
trous si directement au-dessus de cette portion de passerelle, il y a un autre objet fixe (un lingot d’or, une échelle, 
une barre de franchissement ou un mur). La passerelle doit être complètement libre de toute entrave. De plus, il 
n’est pas possible de creuser un trou si cette passerelle est en béton.
Le trou n’est pas permanent. La portion creusée se remplit automatiquement au bout de 8 secondes.
Dans la version originale, les trous sont noirs mais dans ma version, les trous sont grisés (vous avez le choix).
Pour creuser un trou à la droite de Lode Runner, l’utilisateur doit appuyer sur X et pour creuser un trou à la gauche 
de Lode Runner, l’utilisateur doit appuyer sur Z.


<h1>Chuter</h1>

Lorsque Lode Runner se déplace horizontalement à la fin d’une passerelle ou à partir d’une échelle, s’il n’y a aucun 
objet pour le soutenir, il tombe dans le vide (il chute) jusqu’à ce qu’il atteigne une passerelle ou une barre de franchissement à laquelle il s’accroche. S’il y a un trou dans la passerelle, Load Runner passe à travers ce trou. 
Il est également possible de faire chuter Lode Runner à partir d’une barre de franchissement. Dans ce cas, 
l’utilisateur doit appuyer sur la flèche en bas.
Prenez note que la chute est automatique. L’utilisateur perd le contrôle sur Lode Runner tout au long de sa chute 
(Lode Runner ne réagit plus aux touches du clavier). Il reprend le contrôle à la fin de la chute.


<h1>Ramasser des lingots d’or</h1>
Dès que Lode Runner passe sur un lingot d’or, il le ramasse (le lingot disparaît de l’écran). Dès que le sixième lingot a été ramassé, une échelle s’ajoute 
automatiquement sur l’écran. C’est 
grâce à cette échelle que Lode Runner
va avoir la possibilité de quitter le tableau et ainsi passer au niveau suivant.

<h1>Mort du lode Runner</h1>
Lode Runner meurt lorsqu’il tombe dans un trou et que le trou se remplit sur lui. Au 1er niveau, cela se produit seulement dans un trou sur la passerelle du bas qui est en brique. Il ne peut plus en ressortir car la passerelle grise est 
en béton et Lode Runner ne peut pas faire de trou.

<h1>Déplacement des gardes</h1>
Les gardes se déplacent exactement de la même manière que Lode Runner et sont soumis aux mêmes règles. 
La différence c’est que leurs déplacements sont automatiques.
L'algorithme de déplacement est : déplacer les gardes de manière à ce qu’ils s’approchent de plus en plus de Lode Runner.


<h1>Tomber dans un trou</h1>
  
Lorsqu’un des gardes tombe à l’intérieur d’un trou, celui-ci reste coincé à l’intérieur de ce trou. Cela a comme effet 
de boucher le trou. Par la suite, si Lode Runner ou un autre garde se déplace sur le trou, celui-ci ne tombe pas dans 
le trou (comme s’il n’y avait pas de trou).Le garde qui est tombé dans un trou demeure dans le trou pendant 4 secondes. Au bout de 4 secondes, le garde 
sort du trou et poursuit sa route. Si, pendant ces 4 secondes, le trou s’est rebouché alors le garde meurt puis ressus cite sur une des cellules de la 2ième ligne du tableau (au hasard).


<h1La chute des gardes</h1>

Tout comme Lode Runner, lorsqu’un garde se déplace horizontalement, il est possible qu’il chute car il n’y a aucun 
objet pour le soutenir. Dans ce cas, il tombe dans le vide jusqu’à ce qu’il atteigne une passerelle ou une barre de 
franchissement à laquelle il s’accroche. Par contre, s’il y a un trou, le garde ne passe pas à travers ce trou. 
Il est également possible qu’un garde chute à partir d’une barre de franchissement.


<h1>Prise de lingot d'or par un garde</h1>

Dès qu’un garde passe sur un lingot d’or, il le ramasse de manière automatique (le lingot disparaît de l’écran). 
Étant donné que le garde a ce lingot d’or en sa possession, Lode Runner ne peut plus le ramasser. Le garde qui a 
ramassé un lingot d’or peut le relâcher sur une passerelle à tout moment (au hasard mais pas trop souvent). Dans 
ce cas, Lode Runner (ou un autre garde) peut ramasser le lingot qui a été relâché.
Une autre manière pour Lode Runner de ramasser un lingot d’or qu’un garde a en sa possession, c’est de le faire 
tomber dans un trou. Lorsqu’il tombe dans un trou, le garde relâche automatiquement le lingot d’or juste au dessus de lui.

<h1>Le score</h1>

|        Types d'actions        |  points       |
|-------------------------------|---------------|
|Lode Runner ramasse un lingot  |  +250 pts     |
|Un garde tombe dans le trou    |  +75 pts      |
|Un garde meurt (et ressuscite) |  +75 pts      |
|Lode Runner a réussi le niveau |  +1500 pts    |


<h1>Les vies de Lode Runner</h1>

Lorsque Lode Runner meurt, il perd une vie, perd tous les points qu’il a accumulés dans ce niveau et recommence le 
niveau à zéro. Par contre, il ne perd pas les points qu’il a accumulés dans les niveaux précédents. Lode Runner a 5 vies. 
Lorsqu’il a dépensé ses 5 vies, le jeu s’arrête (game over).

<h1>Les sons </h1>

Dans ce jeu, il y a 9 sons différents.
- Lorsque Lode Runner ramasse un lingot d’or
- Lorsque Lode Runner fait une chute
- Lorsque Lode Runner creuse un trou dans la passerelle
- Lorsqu’un trou se remplit automatiquement (après 8 secondes)
- Lorsque Lode Runner perd une vie
- Lorsque Lode Runner perd toutes ses vies (Game over)
- Lorsque Lode Runner a terminé un niveau pour passer au niveau suivant
- Lorsqu’un garde tombe dans un trou
- Lorsqu’un garde meurt
