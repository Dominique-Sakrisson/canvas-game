# canvas-game


# staging:

https://dominique-sakrisson.github.io/canvas-game/

# Latest:

https://alterarpg.netlify.app/

# changelog

https://github.com/Dominique-Sakrisson/canvas-game/commits/staging

1. setup performance monitoring metrics fps/memory usage in the game loop, setup bottleneck detection in rendering


2. Added: FPS counter, apply slow when player hit with mark, (added frame and millisecond counter, added currentSpeed property to player), refactor and and some cleanup.)



1. setup performance monitoring metrics fps/memory usage in the game loop, setup bottleneck detection in rendering


//parent function would be updateParticles, updateParticles reads through the particles array to populate them on the canvas. Particles are added by createParticles, which is called from the below functions.
Each function call can have its own implementation of particles in the future
createParticles()
--handleProjectileCollisions
--handlePlayerCollisions (x2)
--updateBalls
--isColliding passes, calls to particle on ball

Current implementation of attacks has melee strikes managing their own collision detection in updateMeleeStrikes(). projectiles are handled in a function called
handleProjectileCollisions which could be the better way to go about

for melee attacks, need to work on the wall blocking the animation as well as the attack damage to balls

need to scale map builder and wall placement with difficulty and level modifier.
