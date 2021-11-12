#lang play
(print-only-errors #t)
; mutable data structure
(define my-box (box 3))
(set-box! my-box  4) ; void?
(test (unbox my-box) 4)

(define (demo n)
  (let [(b (box 2))]
    (begin
      (set-box! b n)
      (unbox b))))
(test (demo 3) 3)

; variables en scheme

(define (demo2 n)
  (let [(b 2)]
    (begin
      (set! b n)
      b)))
(test (demo 5) 5)


; closure = funcion mas su environment statico (se recuerda que valores habian cuando se creo)

(define (create-ABCSum n)
  (let [(a n)
        (b 3)]
    (λ (c) (+ a b c))))

;((create-ABCSum 4) 2)

; contador con cambio de estado
(define counter2
  (let [(count 0)]
    (λ () (begin
            (set! count (+ count 1))
            count))))

(counter2)
(counter2)
(counter2)

; counter v2
(define counter
  (let [(count 0)]
    (λ (msg)
      (match msg
        ['inc (begin (set! count (+ count 1)) count)]
        ['dec (begin (set! count (- count 1)) count)]))))
  
(counter 'inc)
(counter 'inc)
(counter 'inc)
(counter 'dec)

; counter v3
(display "------------\n")
(define counter3
  (let [(count 0)
        (step 1)]
    (λ (msg . args)
      (match msg
        ['inc (begin (set! count (+ count step)) count)]
        ['dec (begin (set! count (- count step)) count)]
        ['reset (begin (set! count 0) count)]
        ['step! (begin (set! step (car args)) count)]))))

(counter3 'inc)
(counter3 'step! 3)
(counter3 'inc)

; counter v4

(define (find-msg msg methods)
  (if (empty? methods)
      (error "message doest not understood")
      (if (equal? (car (car methods)) msg)
          (cdr (car methods))
          (find-msg msg (cdr methods)))))

(display "------------\n")
(define counter4
  (let* [(count 0)
        (step 1)
        (methods
           (list
            (cons 'inc (λ ()  (begin (set! count (+ count step)) count)))
            (cons 'dec (λ ()  (begin (set! count (- count step)) count)))
            (cons 'reset (λ ()  (begin (set! count 0) count)))
            (cons 'step! (λ (arg)  (begin (set! step arg) count)))
           ))]
    (λ (msg . args)
      (let
          [(func (find-msg msg methods))]
        (apply func args))
      )))


(counter4 'inc)
(counter4 'step! 3)
(counter4 'inc)
(counter4 'dec)

; MACROS
(defmac (cuando test statement ...)
    (list 'if test (list 'begin statement ...) 0))

(cuando (> 2 1) (display "hola") (display "mundo"))

; counter v5 con MACROs

(defmac (OBJECT ([field fname fval] ...)
                ([method mname mparams mbody ...] ...))
  #:keywords field method
  (let ([fname fval] ...)
    (let ([methods (list (cons 'mname (λ mparams mbody ...)) ...)])
      (λ (msg . args)
        (let [(func (find-msg msg methods))]
          (apply func args))))))

(display "------------\n")
(define counter5
  (OBJECT
   ([field count 0]
    [field step 1])
   ([method inc () (set! count (+ count step)) count]
    [method dec () (set! count (- count step)) count]
    [method reset () (set! count 0)]
    [method step! (v) (set! step v)])))

(defmac (→ o m arg ...)
  (o 'm arg ...))

(→ counter5 inc)
(→ counter5 step! 3)
(→ counter5 inc)
(→ counter5 dec)








