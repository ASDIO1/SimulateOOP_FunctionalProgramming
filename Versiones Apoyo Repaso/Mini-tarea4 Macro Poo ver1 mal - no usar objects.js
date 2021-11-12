// Objeto/Clase modelada a funciones:

function find_msg(msg, methods){
    if(methods.length === 0){
        console.log('Message not understood')
        const [head, ...rest] = methods
        const [head2, ...rest2] = head
        if(msg === head.first){
            return rest2
        } else{
            find_msg(msg, rest)
        }
        //const foundMethod = methods.inc dec etc
    }
}

function counter4(msg, args) {
    let count = 0
    let step = 1
    let methods = [
        {
            name: 'inc',
            fun: () => {
                //debugger
                count = count + step; 
                //console.log(count);
                return count}
        },
        {
            name: 'dec',
            fun: () => {count = count - step; return count}
        },
        {
            name: 'reset',
            fun: () => {count = 0; return count}
        },
        {
            name: 'step',
            fun: function(arg, arg2) {
                debugger
                step = arg; 
                return count
            }
        },
    ]
    return function app (msg, ...args){
        debugger
        let func = methods.find((obj) => obj.name === msg).fun // Lookup
        const result = func(...args) // IMPORTANTE: func.apply(args) no funciona.  El spread ... se sencarga de colocar cada argumento en su lugar en cada closure
        console.log('pre:', result)
        return result
    }
}

//let value = counter4('inc', 3)
//value = counter4('inc', 3)
//console.log("Final Res:", value)
const counter = counter4()
counter('inc')
counter('step', 3, 2)  // IMPORTANTE: mandar argumentos separados, para que el spread ... los reconozca bien
counter('inc')
counter('dec')
counter('reset')






//FALTA QUE EL LAMBDA DE METHODS ACEPTE ARGUMENTOS
// REVISAR: https://ishwar-rimal.medium.com/trickiest-javascript-interview-question-with-solution-73958f99a376
//REVISAR: https://www.w3schools.com/js/js_function_apply.asp


/*let methods2 = [
        {
            name: 'inc',
            fun: () => {return 1}
        },
        {
            name: 'dec',
            fun: () => {return 2}
        },
]

const x = methods2.find((obj) => obj.name === 'inc')

console.log(x)*/
