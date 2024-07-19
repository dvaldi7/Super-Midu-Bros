/* global Phaser */
const config = {
    type: Phaser.AUTO, //webgl, canvas 
    width: 256,
    height: 244,
    backgroundColor: "#049cd8",
    parent: "game",
    scene: {
        preload, //se ejecuta para precargar los recursos (el 1º)
        create, //se ejecuta cuando el juego comienza (el 2º)
        update // se ejecuta en cada frame (3º y todo el rato)
    }
} 

new Phaser.Game(config)

function preload() {
    this.load.image(
        "cloud1",
        "assets/scenery/overworld/cloud1.png"
    )

    this.load.spritesheet(
        "mario",  //Esto es la id
        "assets/entities/mario.png",//esto la ruta donde está
        { frameWidth: 18, frameHeight: 16 } /*FrameWidth = Cuanto ocupa cada uno de los Mario 
        en el spritesheet. Se saca sabiendo el ancho total de la Imagen en este 
        caso 108, que entre 6 imagenes = 18. frameHeight = su altura*/
    )

    this.load.image(
        "floorbricks",
        "assets/scenery/overworld/floorbricks.png"

    )

}

function create() {
    //AÑADIMOS LA NUBE 1

    /* la posición de la imagen será ejes(x, y , id del asset) */ 
    this.add.image(100, 50, "cloud1")

     .setOrigin(0, 0)/*Para decirle a la página donde indicarle cual es la posicion
     para dibujar arriba a la izquierda de la pantalla
     lo hacemos con el siguiente código:*/

    .setScale(0.15) //Como la imagen es muy grande se escala con esto

    //AÑADIMOS EL SPRITESHEET DE MARIO
    this.mario = this.add.sprite(50, 210, "mario")
    .setOrigin(0, 1)

    //AÑADIMOS EL SUELO
    this.add.tileSprite(0, config.height -32, config.width, 32, 
        "floorbricks")
    .setOrigin(0, 0)

    //ANIMACIONES DE MARIO AL ANDAR
    this.anims.create({
        key: "mario-walk",
        frames: this.anims.generateFrameNumbers(
            "mario",
            { start: 3, end: 2 }
        ),
        frameRate: 12,
        repeat: -1 //-1 significa infinito. Para que la repita todo el rato
    })

    //ANIMACIONES DE MARIO EN ESTÁTICO
    
    this.anims.create({
        key: "mario-idle",
        frames: [{ key: "mario", frame: 0 }]
    })

    //ANIMACIONES DE MARIO AL SALTAR
    
    this.anims.create({
        key: "mario-jump",
        frames: [{ key: "mario", frame: 5 }]
    })

    //MOVIMIENTOS
    this.keys = this.input.keyboard.createCursorKeys()/*Método para visualizar las teclas
    en la función update*/


}
function update() {
    if(this.keys.left.isDown) //para que ande a la izquierda
    {
        this.mario.anims.play("mario-walk", true)
        this.mario.x -= 2 
        this.mario.flipX = true //para girar al personaje cuando va hacia atrás
    }
    else if (this.keys.right.isDown) //para que anda a la derecha
    {
        this.mario.anims.play("mario-walk", true)
        this.mario.x += 2 
        this.mario.flipX = false //que deje de girar el personaje al andar
    }
    else //si no se mueve mario
    {
        this.mario.anims.play("mario-idle", true)
    }
    if (this.keys.up.isDown) //si presionamos la tecla de arriba (que salte)
    {
        this.mario.y -= 5
        this.mario.anims.play("mario-jump", true)
    }
}