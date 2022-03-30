var popout = {
    wrapper: undefined,
    show: (data) => {
        popout.wrapper = document.createElement("div")
        popout.wrapper.classList.add("popout")
        popout.wrapper.innerHTML = `
            <div class="background" onclick="popout.close()"></div>
            <div class="body">
                <div class="img-wrapper">
                    <img class="bg" src="${data.img}" alt="">
                    <img class="fg" src="${data.img}" alt="">
                </div>
                <span>${data.name}</span>
                <div class="buttons">
                    <button>Delete</button>
                    <button>Edit</button>
                    <button>Download</button>
                    <button class="accent">Start</button>
                </div>
            </div>
        `
        document.documentElement.appendChild(popout.wrapper)
        setTimeout(() => {
            document.querySelectorAll(".popout .body")[0].style.bottom = "0"
            document.querySelectorAll(".popout .body")[0].style.opacity = "100%"
            document.querySelectorAll(".popout .background")[0].style.opacity = "80%"
        })
        document.documentElement.style.overflow = "hidden"
    },
    close: () => {
        document.querySelectorAll(".popout .body")[0].style.bottom = "-80vh"
        document.querySelectorAll(".popout .body")[0].style.opacity = "0%"
        document.querySelectorAll(".popout .background")[0].style.opacity = "0%"
        setTimeout(() => {
            popout.wrapper.remove()
        },200)
        document.documentElement.style.overflow = "auto"
    }
}