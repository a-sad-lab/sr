'use strict'

const {createElement: e, useState, useEffect} = React

function App() {
  console.log(`App start`)
  const [s, setS] = useState(function() {
    console.log('lazy initiate state')
    return 's'
  })
  useEffect(function() {
    console.log(`effect start s - ${s}`)
    Promise.resolve().then(function() {
      console.log('before setS s -', s)
      // setS('sos')
      setS(function(prev) {
        console.log('in setS prev s -', prev)
        return 'sos'
      })
      console.log('after setS')
    })
    console.log('effect return cleaner')
    return function() {
      console.log('effect cleaned')
    }
  })
  console.log(`App return renderer s - ${s}`)
  return e('div', {onClick() {
    setS(function(prev) {
      console.log('click prev - ', prev)
      return prev + '!!!'
    })
  }}, `my react app s - ${s}`)
}

ReactDOM.render(
  e(App),
  document.getElementById('root')
)

/*
setS(fn)
- - -
a - App 
lazy 
b - returned = s 
c - effect = s 
before setS - s = s then setS 
in setS prev = s 
a - App 
b - returned = sos 
d - after setS 
clean effect 
c - effect = sos 
before setS - s = sos then setS 
a - App 
in setS prev = sos 
b - returned = sos 
d - after setS



setS(value)
- - -
a - App 
lazy 
b - returned = s 
c - effect = s 
before setS - s = s then setS 
a - App 
b - returned = sos! 
d - after setS 
clean effect 
c - effect = sos! 
before setS - s = sos! then setS 
a - App 
b - returned = sos! 
d - after setS
*/
