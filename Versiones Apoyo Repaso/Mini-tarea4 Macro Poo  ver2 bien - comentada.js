// Objeto/Clase modelada a funciones:

function find_msg(msg, methods){
    debugger
    if(methods.length === 0){
        console.log('Message not understood')
        return
    } else{
        const [head, ...rest] = methods
        const [current_msg, ...current_func] = head
        if(msg === current_msg){
            const foundFunc = current_func[0]
            return foundFunc
        } else{
            return find_msg(msg, rest)
        }
    }
}

function counter4() {
    let count = 0
    let step = 1
    let methods = [
        ['inc', () => {count = count + step; return count}],
        ['dec', () => {count = count - step; return count}],
        ['reset', () => {count = 0; return count}],
        ['step', (arg) => {
            debugger
            step = arg; 
            return count
        }],
    ]
    
    return function app (msg, ...args){
        debugger
        let func = find_msg(msg, methods)//methods.find((tuple) => {console.log(tuple); tuple.name === msg}) // Lookup
        const result = func(...args) // IMPORTANTE: El spread ... se sencarga de colocar cada argumento en su lugar en cada closure
        console.log('pre:', result)
        return result
    }
}

const counter = counter4()
counter('inc')
counter('step', 3, 2) // OJO: [3, 2] mal,  3, 2 bien  para que el spread interprete bien los args
counter('inc')
counter('dec')
counter('reset')