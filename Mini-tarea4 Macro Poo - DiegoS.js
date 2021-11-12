// Objeto/Clase modelada a funciones:

function find_msg(msg, methods){
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
        ['step', (arg) => {step = arg; return count}],
    ]
    
    return function app (msg, ...args){
        debugger
        let func = find_msg(msg, methods)
        const result = func(...args) 
        console.log('pre:', result)
        return result
    }
}

const counter = counter4()
counter('inc')
counter('step', 3, 2)
counter('inc')
counter('dec')
counter('reset')