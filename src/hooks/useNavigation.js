import { useState, useEffect } from 'preact/hooks'

export const useNavigation = () => {
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    setNavigation(0)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const [current, setCurrent] = useState({ type: null, index: null })

  const getAllElements = () => document.querySelectorAll('[nav-selectable]')

  const getTheIndexOfTheSelectedElement = () => {
    const element = document.querySelector('[nav-selected=true]')
    return element ? parseInt(element.getAttribute('nav-index')) : 0
  }

  const setNavigation = index => selectElement(getAllElements()[index] || document.body)

  const onKeyDown = evt => {
    if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp') return

    const allElements = getAllElements()
    const currentIndex = getTheIndexOfTheSelectedElement()

    let setIndex
    switch (evt.key) {
      case 'ArrowDown':
        setIndex = (currentIndex + 1 > allElements.length - 1) ? 0 : currentIndex + 1
        return selectElement(allElements[setIndex] || allElements[0], setIndex)
      case 'ArrowUp':
        setIndex = (currentIndex === 0) ? allElements.length - 1 : currentIndex - 1
        return selectElement(allElements[setIndex] || allElements[0], setIndex)
      default:
        break
    }
  }

  const selectElement = (selectElement, setIndex = 0) => {
    if (selectElement) {
      [].forEach.call(getAllElements(), (element, index) => {
        const selectThisElement = element === selectElement
        element.setAttribute('nav-selected', selectThisElement)
        element.setAttribute('nav-index', index)
        if (element.nodeName === 'INPUT') {
          selectThisElement ? element.focus() : element.blur()
        }
      })
      setCurrent({ type: selectElement.tagName, index: setIndex })
    } else {
      setNavigation(0)
    }
  }

  return [current, setNavigation]
}
