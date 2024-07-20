import { createAnimations } from "./animations.js"

/* global Phaser */
const config = {
    type: Phaser.AUTO, //webgl, canvas 
    width: 256,
    height: 244,
    backgroundColor: "#049cd8",
    parent: "game",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 }, 
            debug: false
        }
    },
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

    //AÑADIMOS EL SUELO
    this.floor = this.physics.add.staticGroup()

    this.floor
        .create(0, config.height -16, "floorbricks")
        .setOrigin(0, 0.5)
        .refreshBody()
    
        this.floor
        .create(150, config.height -16, "floorbricks")
        .setOrigin(0, 0.5)
        .refreshBody()

    //AÑADIMOS EL SPRITESHEET DE MARIO

        /*Así lo cargamos al empeZar, pero para añadirlo las fisicas 
         tenemos que cambiarlo*/

    //this.mario = this.add.sprite(50, 210, "mario")
    //.setOrigin(0, 1) 

    this.mario = this.physics.add.sprite(50, 100, "mario")
    .setOrigin(0, 1)
    //.setGravityY(300) Si quisieramos darle una fisica a mario diferente al resto
    .setCollideWorldBounds(true) //para que se choque con los limites de la pantalla
    .setGravityY(300)//para ajustar el salto con la gravedad. si se modifica, salta más o menos

    //LÍMITES DEL MUNDO DEL JUEGO

    this.physics.world.setBounds(0, 0, 2000, config.height)//ajustamos la camara desde donde empieza "el mundo" hasta sus limites

    //AÑADIMOS LAS COLISIONES DE MARIO CON EL SUELO

    this.physics.add.collider(this.mario, this.floor)

    //LÍMITES DE LA CÁMARA

    this.cameras.main.setBounds(0, 0, 2000, config.height)//mismos limites que el mundo para que llegue hasta el final de este
    this.cameras.main.startFollow(this.mario) //para que la camara siga a mario pr el mundo

    //PARA CREAR ANIMACIONES DEL OTRO ARCHIVO

    createAnimations(this)

    //MOVIMIENTOS
    this.keys = this.input.keyboard.createCursorKeys()/*Método para visualizar las teclas
    en la función update*/


}
function update() {
    if (this.mario.isDead) return
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

    if (this.keys.up.isDown && this.mario.body.touching.down) 
        //si presionamos la tecla de arriba (que salte) && si toca suelo
    {
        this.mario.setVelocityY(-300)
        this.mario.anims.play("mario-jump", true)
    }

    if (this.mario.y >= config.height) //si mario toca el suelo. para que muera y pase a ese frame
    {
        this.mario.isDead = true
        this.mario.anims.play("mario-dead")
        this.mario.setCollideWorldBounds(false)

        setTimeout( () => { //para que al morir de un saltito como hace en el original
            this.mario.setVelocityY(-350)
        }, 100)

        setTimeout( () => {
            this.scene.restart()
        }, 2000) //para que resetee el juego cuando pasen 2 segundos al morir
    }
}