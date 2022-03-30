var popup = {
    wrapper: undefined,
    showText: (text, action, placeholder="") => {
        popup.wrapper = document.createElement("div")
        popup.wrapper.classList.add("popup")
        popup.wrapper.innerHTML = `
            <div class="background" onclick="popup.close()"></div>
            <div class="body">
                <span>${text}</span>
                <input type="text" placeholder="${placeholder}"">
                <div class="buttons">
                    <button onclick="popup.close()">Cancel</button>
                    <button id="okay">Okay</button>
                </div>
            </div>
        `
        document.documentElement.appendChild(popup.wrapper)
        setTimeout(() => {
            // Text input handeler
            setTimeout(() => {
                document.querySelectorAll(".popup .body input[type=text]")[0].focus()
            }, 200)
            document.querySelectorAll(".popup .body input[type=text]")[0].addEventListener("keydown", e => {
                if (e.keyCode == 13) {
                    action(document.querySelectorAll(".popup .body input[type=text]")[0].value)
                    popup.close()
                }
            })
            document.querySelectorAll(".popup .body #okay")[0].addEventListener("click", () =>{
                action(document.querySelectorAll(".popup .body input[type=text]")[0].value)
                popup.close()
            })

            // Type none
            // if (type == "none") {
            //     document.querySelectorAll(".popup .body #okay")[0].addEventListener("click", () =>{
            //         action()
            //         popup.close()
            //     })
            // }
            document.querySelectorAll(".popup .body")[0].style.opacity = "100%"
            document.querySelectorAll(".popup .body")[0].style.top = "50%"
            document.querySelectorAll(".popup .background")[0].style.opacity = "80%"
        })
    },
    showFile: (text, action) => {
        popup.wrapper = document.createElement("div")
        popup.wrapper.classList.add("popup")
        popup.wrapper.innerHTML = `
            <div class="background" onclick="popup.close()"></div>
            <div class="body">
                <span>${text}</span>
                <input type="file" style="display:none" accept=".csv">
                <button class="fileinput"><span>Select file</span></button> 
                <div class="buttons">
                    <button onclick="popup.close()">Cancel</button>
                    <button id="okay">Okay</button>
                </div>
            </div>
        `
        document.documentElement.appendChild(popup.wrapper)
        setTimeout(() => {
            document.querySelectorAll(".popup .body .fileinput")[0].addEventListener("click", () => {
                document.querySelectorAll(".popup .body input[type=file]")[0].click()
            })
            document.querySelectorAll(".popup .body input[type=file]")[0].addEventListener("change", e => {
                document.querySelectorAll(".popup .body .fileinput span")[0].innerHTML = e.target.files[0].name
            })
            document.querySelectorAll(".popup .body #okay")[0].addEventListener("click", () =>{
                action(document.querySelectorAll(".popup .body input[type=file]")[0].files)
                popup.close()
            })
            document.querySelectorAll(".popup .body")[0].style.opacity = "100%"
            document.querySelectorAll(".popup .body")[0].style.top = "50%"
            document.querySelectorAll(".popup .background")[0].style.opacity = "80%"

        })
    },
    show: (text, action) => {
        popup.wrapper = document.createElement("div")
        popup.wrapper.classList.add("popup")
        popup.wrapper.innerHTML = `
            <div class="background" onclick="popup.close()"></div>
            <div class="body">
                <span>${text}</span>
                <div class="buttons">
                    <button onclick="popup.close()">Cancel</button>
                    <button id="okay">Okay</button>
                </div>
            </div>
        `
        document.documentElement.appendChild(popup.wrapper)
        setTimeout(() => {
            document.querySelectorAll(".popup .body #okay")[0].addEventListener("click", () =>{
                action()
                popup.close()
            })
            document.querySelectorAll(".popup .body")[0].style.opacity = "100%"
            document.querySelectorAll(".popup .body")[0].style.top = "50%"
            document.querySelectorAll(".popup .background")[0].style.opacity = "80%"
        })
    },
    close: () => {
        document.querySelectorAll(".popup .body")[0].style.opacity = "0%"
        document.querySelectorAll(".popup .body")[0].style.top = "30%"
        document.querySelectorAll(".popup .background")[0].style.opacity = "0%"
        setTimeout(() => {
            popup.wrapper.remove()
        }, 200)
    }
}
