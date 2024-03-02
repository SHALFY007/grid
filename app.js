const getData = async () => {
    let response = await fetch('https://www.floatrates.com/daily/rub.json');

    if (response.ok) {

        let json = await response.json();
        console.log(json)

        const arr = createArr(json)

        createList(arr)
        countBtn.addEventListener('click', () => {
            sendResult(json,  document.querySelector('.to_current').innerHTML.toLowerCase(), parseInt(document.querySelector('.count_input').value))
        })

        current_lists.addEventListener('click', e => {
            let value = e.target.textContent
            console.log(value)
            document.querySelector('.to_current').innerHTML = value

        })
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

getData()

const createArr = (json) => {
    arr = []
    for (let key in json) {
        arr.push(key)
    }
    return arr
}

const current_lists = document.querySelector('.current_lists')

const createList = (arr) => {
    for (let i of arr) {
        let list = document.createElement('li')
        list.textContent = i.toUpperCase()
        list.classList.add('p_txt')
        list.style.cursor = 'pointer'
        current_lists.appendChild(list)

        console.log(list)
    }
}

const toCurrent = document.querySelector('.to_current').textContent.toLowerCase()
const countBtn = document.querySelector('.count_btn')

const sendResult = (json, toCur, count) => {
    console.log(json[toCur].rate, count)
    let price = json[toCur].rate * count
    alert((parseInt(price * 100)) / 100)
}