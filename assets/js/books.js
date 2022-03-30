var example = [
    {
        id: "37d2f2c2-a861-4062-8fd8-3585f64437af",
        name: "Pontes 1"
    },
    {
        id: "37d2f2c2-a861-4062-8fd8-3585f64437af",
        name: "Pontes 2"
    },
    {
        id: "37d2f2c2-a861-4062-8fd8-3585f64437af",
        name: "Pontes 3"
    },
    {
        id: "37d2f2c2-a861-4062-8fd8-3585f64437af",
        name: "Pontes 4"
    }
]

var books = {
    list: [],
    uuid: () => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    },
    fetch: () => {
        caches.open("data").then(cache => {
            cache.match("list.json").then(async res => {
                if (!res) {
                    document.querySelectorAll(".loading")[0].style.opacity = "0%"
                    setTimeout(() => {
                        document.querySelectorAll(".loading")[0].style.display = "none"
                    }, 200)
                    return
                }
                books.list = await JSON.parse(await res.text())
                for (var i=0; i<books.list.length; i++) {
                    var li = document.createElement("li")
                    var img = await cache.match(books.list[i].id + "-image")
                    var img = await img.text()
                    li.id = books.list[i].id
                    li.innerHTML = `
                    <div class="wrapper">
                    <img class="bg" src="${img}" alt="">
                    <img class="fg" src="${img}" alt="">
                    </div>
                    <span>${books.list[i].name}</span>
                    `
                    document.querySelectorAll(".cards")[0].appendChild(li)
                }
                document.querySelectorAll(".loading")[0].style.opacity = "0%"
                setTimeout(() => {
                    document.querySelectorAll(".loading")[0].style.display = "none"
                }, 200)
            })
        })
    },
    new: (name) => {
        var tmp = {
            id: books.uuid(),
            name: name
        }
        var tmpmeta = {
            id: tmp.id,
            name: name,
            units: []
        }
        books.list.push(tmp)
        caches.open("data").then(cache => {
            cache.put("list.json", new Response(JSON.stringify(books.list)))
            cache.put(tmp.id + "-metadata", new Response(JSON.stringify(tmpmeta)))
            cache.put(tmp.id + "-image", new Response("/assets/images/placeholder.png"))
            location.reload()
        })
    }
}