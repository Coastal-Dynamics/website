let waves = document.querySelectorAll("wave")
let buttonFields = document.querySelectorAll(".buttons")

let buttonHeights = []

function setWaves(field = -1, button = -1) {
  if (field == -1 || button == -1)
    waves.forEach(wave => wave.style.transform = "translateY(0.6px)")
  else waves.forEach((wave, i) => {
    mask.style.transform = i == `translateY(${field ? 0.6 - buttonHeights[field][button] : "0.6"}px)`
  })
}

document.querySelectorAll(".buttons").forEach((buttonField, i) => {
  let mask = buttonField.cloneNode(true)
  mask.id = ""
  mask.classList.add("mask")
  buttonField.appendChild(mask)

  buttonField.addEventListener("mouseleave", event => {
    setWaves();
  })

  buttonHeights.push([])

  Array.from(buttonField.children).forEach((button, j) => {
    button.addEventListener("mouseenter", event => {
      setWaves(i, j)
    })

    buttonHeights[i].push(button.clientHeight)
  })

  buttonHeights[i] = buttonHeights[i].reduceRight((acc, height) => {
    acc.push(acc[0] + height / buttonField.clientHeight)
    return acc
  }, [0])
  buttonHeights[i].shift()
})
