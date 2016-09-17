const catIn = function (target, parent) {
    let path = []
    let parentNode = target
    while (parentNode && parentNode !== document.body) {
        path.push(parentNode)
        parentNode = parentNode.parentNode
    }
    return path.indexOf(parent) !== -1
}

Array.prototype.$remove = function (item) {
    if (!this.length) return
    const index = this.indexOf(item)
    if (index > -1) {
      return this.splice(index, 1)
    }
}

export {
    catIn
}