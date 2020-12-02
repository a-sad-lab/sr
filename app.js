'use strict'

const {createElement: e, useState, useEffect} = React

function App() {

  console.log(`a - App`)
 
  const [s, setS] = useState(function() {
    console.log('lazy')
    return 's'
  })

  useEffect(function() {
    console.log(`c - effect = ${s}`)
    Promise.resolve().then(function() {
      console.log('before setS - s =', s, 'then setS')
      setS('sos!')
      // setS(function(prev) {
      //   console.log('in setS prev =', prev)
      //   return 'sos'
      // })
      console.log('d - after setS')
    })

    return function() {
      console.log('clean effect')
    }
  })

  console.log(`b - returned = ${s}`)
  return e('div', {}, `my react app - ${s}`)
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
