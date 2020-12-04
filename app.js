'use strict'

const {createElement: e, useState, useEffect} = React

function App() {
  console.log(`App start`)
  const [s, setS] = useState(function() {
    console.log('App lazy initiate state')
    return 's'
  })
  useEffect(function() {
    console.log(`effect start`)
    Promise.resolve().then(function() {
      console.log('effect setS start')
      // setS('sos')
      setS(function(prev) {
        console.log('effect setS prev s -', prev)
        return 'sos'
      })
      console.log('effect setS end')
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

App start
App lazy initiate state
App return renderer s - s
  effect start s - s
  effect return cleaner
  effect setS start s - s
  effect setS prev s - s
    App start
    App return renderer s - sos
  effect setS end
    effect cleaned
    effect start s - sos
    effect return cleaner
    effect setS start s - sos
      App start
      effect setS prev s - sos
      App return renderer s - sos
    effect setS end

*/
