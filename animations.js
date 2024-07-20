export const createAnimations = (game) => {

        //ANIMACIONES DE MARIO AL ANDAR
        game.anims.create({
            key: "mario-walk",
            frames: game.anims.generateFrameNumbers(
                "mario",
                { start: 3, end: 2 }
            ),
            frameRate: 12,
            repeat: -1 //-1 significa infinito. Para que la repita todo el rato
        })
    
        //ANIMACIONES DE MARIO EN ESTÁTICO
        
        game.anims.create({
            key: "mario-idle",
            frames: [{ key: "mario", frame: 0 }]
        })
    
        //ANIMACIONES DE MARIO AL SALTAR
        
        game.anims.create({
            key: "mario-jump",
            frames: [{ key: "mario", frame: 5 }]
        })

        //ANIMACIONES DE MARIO AL MORIR
        
        game.anims.create({
            key: "mario-dead",
            frames: [{ key: "mario", frame: 4 }]
        })


        
}