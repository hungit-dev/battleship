export function playHitSound(){
    let audio=new Audio("../audio/hit-sound.mp3")
    audio.play()
}
export function playMissSound(){
    let audio=new Audio("../audio/miss-sound.mp3")
    audio.play()
}
export function playWinnerSound(){
    let audio=new Audio("../audio/winner-sound.mp3")
    audio.play()
}

export function playBackgroundMusic(){
    const backgroundMusic=new Audio("../audio/background-music.mp3")
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.2;
    backgroundMusic.play()
}
export function playButtonClickSound(){
    let audio=new Audio("../audio/button-click.mp3")
    audio.play()
}
export function playCellHoverSound(){
    let audio=new Audio("../audio/cell-hover.mp3")
    audio.play()
}
export function playPlaceShipSound(){
    let audio=new Audio("../audio/place-ship.mp3")
    audio.play()
}
