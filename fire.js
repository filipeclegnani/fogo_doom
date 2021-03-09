const firePixelArray = []
const altura = 50
const largura = 30
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
const debug = false

function start(){

    criaStructureDoFogo()
    //console.log(firePixelArray)
    criaPontosDeFogo()
    renderizaFogo()
    setInterval(calculaPropagacao, 10)
    
}

function criaStructureDoFogo(){
    const taamanhoTotal = altura * largura;

    for(let i = 0; i < taamanhoTotal; i++){
        firePixelArray[i] = 0;
    }
}

function renderizaFogo(){
    let html = "<table cellpedding=0 cellspacing=0>"
    for(let linha = 0; linha < altura-1; linha++){
        html += "<tr>"
        for(let coluna = 0; coluna < largura; coluna++){
            const pixelIndex = linha + (altura * coluna)
            if(debug){
                html += "<td>"
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += firePixelArray[pixelIndex]
            }else{
                const cor = fireColorsPalette[firePixelArray[pixelIndex]]
                html += `<td class="pixel" style="background-color: rgb(${cor.r},${cor.g},${cor.b})">`
            }
            html += "</td>"
        }
        html += "</tr>"
    }
    html+= "</table>"
    document.querySelector("#campoFogo").innerHTML = html
}

function criaPontosDeFogo(){
    const ultimo = (altura*largura) -1
    for(let last = 0; last < largura; last++){
        const ponto = ultimo - (altura * last)
        firePixelArray[ponto] = 36
    }
}

function calculaPropagacao(){
    for(let linha = 0; linha < altura-1; linha++){
        for(let coluna = 0; coluna < largura; coluna++){
            const decay = -1 * Math.floor(Math.random() *3)
            const lateraldacay = Math.floor(Math.random() * 3.3) - 1
            const reallateraldacay = lateraldacay * (altura)
            //const reallateraldacay = 0
            const ponto = linha + (altura * (coluna))
            firePixelArray[(ponto + reallateraldacay)] = firePixelArray[ponto+1] + decay >= 0 ? firePixelArray[ponto+1] + decay : 0
        }
    }
    renderizaFogo()
}

start()
